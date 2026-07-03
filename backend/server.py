from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'change-me')

app = FastAPI(title="Abhushan Nirmata API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=6, max_length=20)
    email: Optional[str] = None
    interest: Optional[str] = None
    message: str = Field(min_length=3, max_length=1000)


class AdminLogin(BaseModel):
    password: str


class Rates(BaseModel):
    gold_24k_per_gram_inr: float
    gold_22k_per_gram_inr: float
    silver_per_gram_inr: float
    currency: str = "INR"
    unit: str = "per gram"
    source: str
    updated_at: datetime


# ---------- Enquiry Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Abhushan Nirmata API is running"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(payload: EnquiryCreate):
    enquiry = Enquiry(**payload.model_dump())
    doc = enquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.enquiries.insert_one(doc)
    except Exception as e:
        logging.exception("Failed to save enquiry")
        raise HTTPException(status_code=500, detail="Could not save enquiry") from e
    return enquiry


# ---------- Admin Auth ----------
def verify_admin(x_admin_password: Optional[str] = Header(default=None)) -> bool:
    if not x_admin_password or x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    return True


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"ok": True}


@api_router.get("/admin/enquiries", response_model=List[Enquiry])
async def list_enquiries(_: bool = Depends(verify_admin)):
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


# ---------- Live Rates ----------
_rates_cache: dict = {"ts": 0, "data": None}
CACHE_TTL_SECONDS = 15 * 60  # refresh at most every 15 minutes
GRAMS_PER_TROY_OZ = 31.1034768
FALLBACK_USD_INR = 83.5  # sensible fallback if FX unavailable


async def _fetch_spot_usd(symbol: str) -> Optional[float]:
    """Fetch spot price in USD per troy ounce from public gold-api.com."""
    try:
        async with httpx.AsyncClient(timeout=6.0) as c:
            r = await c.get(f"https://api.gold-api.com/price/{symbol}")
            if r.status_code == 200:
                data = r.json()
                price = data.get("price")
                if price:
                    return float(price)
    except Exception:
        logging.exception(f"gold-api fetch failed for {symbol}")
    return None


async def _fetch_usd_to_inr() -> float:
    try:
        async with httpx.AsyncClient(timeout=6.0) as c:
            r = await c.get("https://open.er-api.com/v6/latest/USD")
            if r.status_code == 200:
                data = r.json()
                inr = data.get("rates", {}).get("INR")
                if inr:
                    return float(inr)
    except Exception:
        logging.exception("USD->INR fetch failed")
    return FALLBACK_USD_INR


@api_router.get("/rates", response_model=Rates)
async def get_rates():
    now = time.time()
    if _rates_cache["data"] and now - _rates_cache["ts"] < CACHE_TTL_SECONDS:
        return _rates_cache["data"]

    xau_usd_oz = await _fetch_spot_usd("XAU")
    xag_usd_oz = await _fetch_spot_usd("XAG")
    usd_inr = await _fetch_usd_to_inr()

    source = "gold-api.com + open.er-api.com"
    if xau_usd_oz is None or xag_usd_oz is None:
        # Fallback approximate rates for Patna (Dec 2025 ballpark)
        gold_24k = 7850.0
        silver = 98.0
        source = "fallback estimate"
    else:
        gold_24k = (xau_usd_oz / GRAMS_PER_TROY_OZ) * usd_inr
        silver = (xag_usd_oz / GRAMS_PER_TROY_OZ) * usd_inr

    rates = Rates(
        gold_24k_per_gram_inr=round(gold_24k, 2),
        gold_22k_per_gram_inr=round(gold_24k * 22 / 24, 2),
        silver_per_gram_inr=round(silver, 2),
        source=source,
        updated_at=datetime.now(timezone.utc),
    )
    _rates_cache["ts"] = now
    _rates_cache["data"] = rates
    return rates


# ---------- Wiring ----------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
