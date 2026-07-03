"""Backend regression tests for Abhushan Nirmata jewellery site.

Covers:
- Health endpoint GET /api/
- Enquiries POST /api/enquiries (valid + validation)
- Rates GET /api/rates (numeric fields present)
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback: read frontend/.env directly if env not exported
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "message" in data
        assert isinstance(data["message"], str) and len(data["message"]) > 0


# ---------- Rates ----------
class TestRates:
    def test_rates_ok(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/rates", timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "gold_24k_per_gram_inr" in data
        assert "silver_per_gram_inr" in data
        assert isinstance(data["gold_24k_per_gram_inr"], (int, float))
        assert isinstance(data["silver_per_gram_inr"], (int, float))
        assert data["gold_24k_per_gram_inr"] > 0
        assert data["silver_per_gram_inr"] > 0


# ---------- Enquiries ----------
class TestEnquiries:
    def test_create_valid(self, api_client):
        payload = {
            "name": "TEST_User",
            "phone": "9999999999",
            "interest": "Gold Jewellery",
            "message": "TEST_ automated enquiry",
        }
        r = api_client.post(
            f"{BASE_URL}/api/enquiries", json=payload, timeout=15
        )
        assert r.status_code == 200, r.text
        data = r.json()
        # Common fields
        assert data.get("name") == "TEST_User"
        assert data.get("phone") == "9999999999"

    def test_create_missing_required(self, api_client):
        # No name/phone -> should be 422 validation error
        r = api_client.post(
            f"{BASE_URL}/api/enquiries", json={"message": "only msg"}, timeout=15
        )
        assert r.status_code in (400, 422), r.text
