/* ==========================================================================
   SkyAtlas Travel — CENTRAL FRONTEND CONFIGURATION & DEMO DATA
   --------------------------------------------------------------------------
   Everything the agency will later manage from the Laravel admin panel lives
   in this one file: contact details, airlines, flight fares, destinations
   and branches. ALL VALUES BELOW ARE DEMO / PLACEHOLDER CONTENT.

   Future Laravel integration: replace this file with JSON from a controller,
   e.g. in layouts/app.blade.php:
     <script>window.SITE_DATA = @json($siteData);</script>
   ========================================================================== */

window.SITE_CONFIG = {
  company: "SkyAtlas Travel",
  phone: "+39 000 000 0000",          // demo number
  whatsapp: "390000000000",           // international format, digits only (wa.me)
  email: "info@skyatlas-travel.example",
  hours: { en: "Mon–Sat · 09:00–19:00", it: "Lun–Sab · 09:00–19:00", bn: "সোম–শনি · ০৯:০০–১৯:০০", ar: "الاثنين–السبت · 09:00–19:00" },
  currency: "EUR",
};

/* City names in every language (used by flights, destinations & branches) */
window.CITIES = {
  ROM: { code: "FCO", en: "Rome", it: "Roma", bn: "রোম", ar: "روما", country: { en: "Italy", it: "Italia", bn: "ইতালি", ar: "إيطاليا" } },
  MIL: { code: "MXP", en: "Milan", it: "Milano", bn: "মিলান", ar: "ميلانو", country: { en: "Italy", it: "Italia", bn: "ইতালি", ar: "إيطاليا" } },
  VCE: { code: "VCE", en: "Venice", it: "Venezia", bn: "ভেনিস", ar: "البندقية", country: { en: "Italy", it: "Italia", bn: "ইতালি", ar: "إيطاليا" } },
  DAC: { code: "DAC", en: "Dhaka", it: "Dacca", bn: "ঢাকা", ar: "دكا", country: { en: "Bangladesh", it: "Bangladesh", bn: "বাংলাদেশ", ar: "بنغلاديش" } },
  DXB: { code: "DXB", en: "Dubai", it: "Dubai", bn: "দুবাই", ar: "دبي", country: { en: "United Arab Emirates", it: "Emirati Arabi Uniti", bn: "সংযুক্ত আরব আমিরাত", ar: "الإمارات" } },
  IST: { code: "IST", en: "Istanbul", it: "Istanbul", bn: "ইস্তাম্বুল", ar: "إسطنبول", country: { en: "Türkiye", it: "Turchia", bn: "তুরস্ক", ar: "تركيا" } },
  LON: { code: "LHR", en: "London", it: "Londra", bn: "লন্ডন", ar: "لندن", country: { en: "United Kingdom", it: "Regno Unito", bn: "যুক্তরাজ্য", ar: "المملكة المتحدة" } },
  PAR: { code: "CDG", en: "Paris", it: "Parigi", bn: "প্যারিস", ar: "باريس", country: { en: "France", it: "Francia", bn: "ফ্রান্স", ar: "فرنسا" } },
  BKK: { code: "BKK", en: "Bangkok", it: "Bangkok", bn: "ব্যাংকক", ar: "بانكوك", country: { en: "Thailand", it: "Thailandia", bn: "থাইল্যান্ড", ar: "تايلاند" } },
};

window.AIRLINES = {
  EK: { name: "Emirates", tone: "tone-coral" },
  QR: { name: "Qatar Airways", tone: "tone-navy" },
  TK: { name: "Turkish Airlines", tone: "tone-royal" },
  AZ: { name: "ITA Airways", tone: "tone-sky" },
  BG: { name: "Biman Bangladesh", tone: "tone-coral" },
  EY: { name: "Etihad Airways", tone: "tone-navy" },
};

/* Demo fares — set manually by the agency (future: admin panel).
   type: "oneway" | "round"   label/note: translation keys (or null) */
window.FLIGHTS = [
  { id: "f1", airline: "EK", from: "ROM", to: "DAC", type: "round", price: 689, label: "label.bestValue", note: "note.oct" },
  { id: "f2", airline: "TK", from: "MIL", to: "IST", type: "oneway", price: 119, label: "label.new", note: "note.nov" },
  { id: "f3", airline: "QR", from: "ROM", to: "DXB", type: "round", price: 429, label: null, note: "note.flex" },
  { id: "f4", airline: "BG", from: "ROM", to: "DAC", type: "oneway", price: 399, label: "label.limited", note: "note.oct" },
  { id: "f5", airline: "AZ", from: "ROM", to: "LON", type: "round", price: 189, label: null, note: "note.weekend" },
  { id: "f6", airline: "EY", from: "MIL", to: "BKK", type: "round", price: 719, label: "label.bestValue", note: "note.dec" },
  { id: "f7", airline: "AZ", from: "VCE", to: "PAR", type: "oneway", price: 89, label: "label.new", note: "note.flex" },
  { id: "f8", airline: "TK", from: "ROM", to: "IST", type: "round", price: 229, label: null, note: "note.nov" },
  { id: "f9", airline: "EK", from: "MIL", to: "DXB", type: "oneway", price: 319, label: "label.limited", note: "note.dec" },
];

window.DESTINATIONS = [
  { city: "ROM", image: "destinations/rome.jpg", desc: { en: "Timeless piazzas, ancient ruins and slow golden evenings.", it: "Piazze senza tempo, rovine antiche e serate dorate.", bn: "চিরন্তন চত্বর, প্রাচীন নিদর্শন আর সোনালি সন্ধ্যা।", ar: "ساحات خالدة وآثار عريقة وأمسيات ذهبية هادئة." } },
  { city: "DXB", image: "destinations/dubai.jpg", desc: { en: "A skyline of ambition beside the desert and the sea.", it: "Uno skyline ambizioso tra deserto e mare.", bn: "মরুভূমি আর সমুদ্রের পাশে উচ্চাকাঙ্ক্ষার আকাশরেখা।", ar: "أفق طموح بين الصحراء والبحر." } },
  { city: "IST", image: "destinations/istanbul.jpg", desc: { en: "Where two continents meet over the Bosphorus.", it: "Dove due continenti si incontrano sul Bosforo.", bn: "যেখানে বসফরাসের ওপর দুই মহাদেশ মেলে।", ar: "حيث تلتقي قارتان على ضفاف البوسفور." } },
  { city: "LON", image: "destinations/london.jpg", desc: { en: "Royal landmarks, riverside walks and world-class culture.", it: "Monumenti reali, passeggiate sul fiume e grande cultura.", bn: "রাজকীয় স্থাপনা, নদীর ধারে হাঁটা আর বিশ্বমানের সংস্কৃতি।", ar: "معالم ملكية ونزهات على النهر وثقافة عالمية." } },
  { city: "DAC", image: "destinations/dhaka.jpg", desc: { en: "Vibrant streets, rich heritage and warm homecomings.", it: "Strade vivaci, ricco patrimonio e ritorni a casa.", bn: "প্রাণবন্ত রাস্তা, সমৃদ্ধ ঐতিহ্য আর আপন ঘরে ফেরা।", ar: "شوارع نابضة وتراث غني وعودة دافئة إلى الوطن." } },
  { city: "PAR", image: "destinations/paris.jpg", desc: { en: "Boulevards, cafés and the city of light.", it: "Boulevard, caffè e la città delle luci.", bn: "বুলেভার্ড, ক্যাফে আর আলোর শহর।", ar: "جادات ومقاهٍ ومدينة الأنوار." } },
  { city: "MIL", image: "destinations/milan.jpg", desc: { en: "Design, fashion and a cathedral of marble lace.", it: "Design, moda e una cattedrale di pizzo marmoreo.", bn: "ডিজাইন, ফ্যাশন আর মার্বেলের এক অপূর্ব ক্যাথেড্রাল।", ar: "تصميم وأزياء وكاتدرائية من دانتيل الرخام." } },
  { city: "BKK", image: "destinations/bangkok.jpg", desc: { en: "Golden temples, river life and legendary street food.", it: "Templi dorati, vita sul fiume e cibo di strada leggendario.", bn: "সোনালি মন্দির, নদীর জীবন আর বিখ্যাত স্ট্রিট ফুড।", ar: "معابد ذهبية وحياة نهرية وطعام شوارع أسطوري." } },
];

/* Demo branches — each one opens its own contact modal */
window.BRANCHES = [
  { id: "b1", name: "SkyAtlas Roma Centro", city: "ROM", tone: "tone-royal", address: "Via Esempio 12, 00185 Roma", phone: "+39 000 000 0001", whatsapp: "390000000001", email: "roma@skyatlas-travel.example", hours: window.SITE_CONFIG.hours },
  { id: "b2", name: "SkyAtlas Milano", city: "MIL", tone: "tone-coral", address: "Corso Dimostrativo 45, 20124 Milano", phone: "+39 000 000 0002", whatsapp: "390000000002", email: "milano@skyatlas-travel.example", hours: window.SITE_CONFIG.hours },
  { id: "b3", name: "SkyAtlas Venezia", city: "VCE", tone: "tone-sky", address: "Calle Campione 8, 30121 Venezia", phone: "+39 000 000 0003", whatsapp: "390000000003", email: "venezia@skyatlas-travel.example", hours: window.SITE_CONFIG.hours },
  { id: "b4", name: "SkyAtlas Dhaka", city: "DAC", tone: "tone-navy", address: "House 00, Road 00, Gulshan, Dhaka", phone: "+880 0000 000000", whatsapp: "8800000000000", email: "dhaka@skyatlas-travel.example", hours: { en: "Sat–Thu · 10:00–20:00", it: "Sab–Gio · 10:00–20:00", bn: "শনি–বৃহস্পতি · ১০:০০–২০:০০", ar: "السبت–الخميس · 10:00–20:00" } },
];
