// Shop-wide constants: content, contact info, product data.

export const SHOP = {
  name: "Abhushan Nirmata",
  tagline: "Crafting Legacy, One Jewel at a Time",
  owner: "Anjan Kumar",
  phone: "9113777874",
  phoneDisplay: "+91 91137 77874",
  whatsapp: "919113777874",
  address:
    "Rajabazar Pal Market, opposite Pillar No. 65, Bailey Road, Patna",
  hours: "12:00 PM – 8:30 PM (All days)",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  email: "abhushannirmata@gmail.com",
  established: "Since 1975",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Showroom", href: "#showroom" },
  { label: "Heritage", href: "#heritage" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
  { label: "Contact", href: "#contact" },
];

export const COLLECTIONS = [
  {
    key: "gold",
    title: "Gold",
    subtitle: "22K & 24K",
    tagline: "Warm heirlooms in pure gold",
    description:
      "Handcrafted necklaces, bangles and temple sets. Each piece rooted in Bihari tradition, refined for the modern woman.",
    image:
      "https://images.pexels.com/photos/28976815/pexels-photo-28976815.jpeg",
    span: "md:col-span-8 md:row-span-2",
    ratio: "aspect-[16/12]",
  },
  {
    key: "bridal",
    title: "Bridal",
    subtitle: "The Wedding Collection",
    tagline: "For the day you become forever",
    description:
      "Complete bridal ensembles — Rani Haar, Maang Tikka, Nath, Kaleere and more, crafted for the heirloom moment.",
    image:
      "https://images.unsplash.com/photo-1617633150878-7df1d12a9a57?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBicmlkYWwlMjBqZXdlbHJ5fGVufDB8fHx8MTc4Mjg5NzAyOHww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-4 md:row-span-2",
    ratio: "aspect-[3/4]",
  },
  {
    key: "diamond",
    title: "Diamond",
    subtitle: "Certified Solitaires",
    tagline: "Light, cut and set to perfection",
    description:
      "IGI-inspired diamond selections in modern silhouettes — rings, pendants and studs that catch every glance.",
    image:
      "https://images.pexels.com/photos/32988751/pexels-photo-32988751.jpeg",
    span: "md:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    key: "silver",
    title: "Silver",
    subtitle: "925 Sterling",
    tagline: "Everyday elegance in silver",
    description:
      "Anklets, oxidised statement pieces and delicate silverware — a nod to timeless Indian craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1696533700445-9cc60ac4a651?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxzaWx2ZXIlMjBqZXdlbHJ5JTIwdHJhZGl0aW9uYWx8ZW58MHx8fHwxNzgyODk3MDUxfDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    key: "one-gram-gold",
    title: "1 Gram Gold",
    subtitle: "Gold-Plated Luxury",
    tagline: "Everyday shine, accessible elegance",
    description:
      "Micron gold-plated jewellery with the look and feel of pure gold — perfect for daily wear, gifting and travel-safe styling.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-4",
    ratio: "aspect-[4/3]",
  },
];

export const HERO_IMAGE =
  "https://images.pexels.com/photos/12708653/pexels-photo-12708653.jpeg";

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1775021723698-b9afeaa084d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwc3RvcmUlMjBpbnRlcmlvciUyMGdvbGR8ZW58MHx8fHwxNzgyODk3MDUxfDA&ixlib=rb-4.1.0&q=85";

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya S.",
    city: "Patna",
    text:
      "My entire bridal set was designed at Abhushan Nirmata. Anjan ji personally guided each detail — the craftsmanship was beyond expectation.",
    piece: "Bridal Set",
  },
  {
    id: 2,
    name: "Rashmi Kumari",
    city: "Danapur",
    text:
      "Trusted our family with them for over a decade. Honest weights, transparent pricing, and jewellery that feels heirloom-worthy.",
    piece: "Gold Necklace",
  },
  {
    id: 3,
    name: "Aakash Verma",
    city: "Patna",
    text:
      "Purchased a solitaire pendant for my wife’s anniversary. The certification, finish and after-service — all exceptional.",
    piece: "Diamond Pendant",
  },
  {
    id: 4,
    name: "Meena Devi",
    city: "Bailey Road",
    text:
      "The silver anklets are stunning. Traditional design meets modern polish. A hidden gem on Bailey Road.",
    piece: "Silver Anklets",
  },
];

export const HIGHLIGHTS = [
  { number: "50+", label: "Years of Craft" },
  { number: "10,000+", label: "Happy Families" },
  { number: "BIS", label: "Hallmarked Gold" },
  { number: "100%", label: "Certified Diamonds" },
];

export const SHOWROOM_GALLERIES = [
  {
    id: "grand-hall",
    name: "Grand Hall",
    subtitle: "The main showroom floor",
    description:
      "Warm sandstone walls, hand-polished wood cabinets and a cascade of ambient gold — the first impression that has welcomed families for generations.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1775021723698-b9afeaa084d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwc3RvcmUlMjBpbnRlcmlvciUyMGdvbGR8ZW58MHx8fHwxNzgyODk3MDUxfDA&ixlib=rb-4.1.0&q=85",
        alt: "Grand Hall — main display",
      },
      {
        src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=80",
        alt: "Grand Hall — chandelier and cabinets",
      },
      {
        src: "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?auto=format&fit=crop&w=1600&q=80",
        alt: "Grand Hall — seating and viewing",
      },
    ],
  },
  {
    id: "necklace-counter",
    name: "Necklace Counter",
    subtitle: "Haars, chokers and layered chains",
    description:
      "From single-line temple chains to statement Rani Haars — a curated wall of necklaces displayed under warm spot lighting for a true try-on moment.",
    images: [
      {
        src: "https://images.pexels.com/photos/28976815/pexels-photo-28976815.jpeg",
        alt: "Gold necklace on velvet display",
      },
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80",
        alt: "Chain necklace close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80",
        alt: "Necklace being modelled",
      },
    ],
  },
  {
    id: "bangles",
    name: "Bangles",
    subtitle: "The wall of gold and glass",
    description:
      "Rows upon rows of bangles — plain, kadas, meenakari and diamond-set — displayed on rotating racks that let you slip a set on in seconds.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1600&q=80",
        alt: "Bangle wall display",
      },
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80",
        alt: "Stack of gold bangles",
      },
      {
        src: "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
        alt: "Bangles worn on wrist",
      },
    ],
  },
  {
    id: "bridal-lounge",
    name: "Bridal Lounge",
    subtitle: "A private space for the big day",
    description:
      "An intimate wood-panelled lounge with soft chairs, floor-length mirrors and dedicated karigars — reserved for full bridal viewings and consultations.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1617633150878-7df1d12a9a57?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBicmlkYWwlMjBqZXdlbHJ5fGVufDB8fHx8MTc4Mjg5NzAyOHww&ixlib=rb-4.1.0&q=85",
        alt: "Bridal set styled",
      },
      {
        src: "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?auto=format&fit=crop&w=1600&q=80",
        alt: "Bridal viewing lounge",
      },
      {
        src: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&w=1600&q=80",
        alt: "Bridal accessories close-up",
      },
    ],
  },
  {
    id: "earrings",
    name: "Earrings",
    subtitle: "Jhumkas, studs, chandbalis",
    description:
      "A wall of curated earrings — from delicate everyday studs to statement chandbalis and traditional jhumkas, each backed with certification.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1600&q=80",
        alt: "Gold earrings on display",
      },
      {
        src: "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?auto=format&fit=crop&w=1600&q=80",
        alt: "Diamond studs close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1600&q=80",
        alt: "Traditional jhumka earrings",
      },
    ],
  },
];

export const INTERESTS = [
  "Gold Jewellery",
  "Diamond Jewellery",
  "Silver Jewellery",
  "Bridal Collection",
  "Custom Design",
  "Repair / Polish",
];
