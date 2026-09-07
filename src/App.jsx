import React, { useState, useEffect, useMemo } from 'react';
import { 
  Car, Calendar, Clock, MapPin, Phone, ShieldCheck, 
  CheckCircle2, ArrowRight, MessageSquare, ChevronRight, 
  X, Menu, AlertTriangle, Sparkles, Instagram, ExternalLink,
  Fuel, Gauge, Users, Settings, Award, DollarSign, Info
} from 'lucide-react';

// ==========================================
// 1. CENTRALIZED CONFIG & BUSINESS DATA
// ==========================================
const BUSINESS_CONFIG = {
  name: "SELFDRIVE WHEELS",
  tagline: "YOUR RIDE. YOUR RULES.",
  subTagline: "Drive More. Explore More.",
  primaryPhone: "7560059661",
  secondaryPhone: "9805434561",
  whatsappNumber: "917560059661", // Primary WhatsApp format (country code + number)
  address: "Mustang City, Nirwana Street, Kharar, Punjab, India",
  serviceAreas: ["Kharar", "Landran", "Mohali", "Chandigarh"],
  freePickupRadiusKm: 5,
  instagramHandle: "@SelfdriveWheels",
  instagramUrl: "https://instagram.com"
};

// ==========================================
// 2. CENTRALIZED FLEET DATA (12 EXACT VEHICLES)
// ==========================================
const FLEET_DATA = [
  {
    id: "scorpio-classic-s11-black",
    name: "MAHINDRA SCORPIO CLASSIC S11 BLACK",
    category: "SUV",
    color: "Black",
    year: "2024",
    transmission: "Manual",
    driveType: "RWD",
    seats: 7,
    pricePerDay: null, // Contact us for current pricing
    pricingText: "Contact us for current pricing",
    heroImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", // Premium Black SUV visual representation
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description: "The iconic Mahindra Scorpio Classic S11 in deep black. Powerful performance, bold road presence, and ample space for group road trips.",
    featured: true,
    isHero: true
  },
  {
    id: "baleno",
    name: "SUZUKI BALENO",
    category: "Hatchback",
    color: "Blue/Silver",
    year: "2023",
    transmission: "Manual/AMT",
    driveType: "FWD",
    seats: 5,
    pricePerDay: null,
    pricingText: "Contact us for current pricing",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    description: "Spacious, fuel-efficient hatchback perfect for city commutes and comfortable highway cruises.",
    featured: false
  },
  {
    id: "swift-2025",
    name: "SUZUKI SWIFT 2025",
    category: "Hatchback",
    color: "Red/White",
    year: "2025",
    transmission: "Manual",
    driveType: "FWD",
    seats: 5,
    pricePerDay: 2000,
    pricingText: "₹2,000 / day",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    description: "The all-new 2025 Suzuki Swift. Sporty design, outstanding mileage, and nimble handling for effortless navigation.",
    featured: true
  },
  {
    id: "venue-white-2022",
    name: "HYUNDAI VENUE WHITE 2022",
    category: "SUV",
    color: "White",
    year: "2022",
    transmission: "Manual",
    driveType: "FWD",
    seats: 5,
    pricePerDay: 2500,
    pricingText: "₹2,500 / day",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    description: "Elegant white compact SUV loaded with feature-rich comfort, modern styling, and high ground clearance.",
    featured: false
  },
  {
    id: "venue-black-2024",
    name: "HYUNDAI VENUE BLACK 2024",
    category: "SUV",
    color: "Black",
    year: "2024",
    transmission: "Manual",
    driveType: "FWD",
    seats: 5,
    pricePerDay: 2500,
    pricingText: "₹2,500 / day",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    description: "Bold 2024 Black edition Hyundai Venue. Premium cabin, solid road stance, and smooth drive quality.",
    featured: true
  },
  {
    id: "creta-black-2026",
    name: "HYUNDAI CRETA BLACK 2026",
    category: "SUV",
    color: "Black",
    year: "2026",
    transmission: "Manual/Automatic",
    driveType: "FWD",
    seats: 5,
    pricePerDay: null,
    pricingText: "Contact us for current pricing",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate mid-size SUV experience. Futuristic design, executive seating comfort, and supreme road commanding view.",
    featured: true
  },
  {
    id: "brezza-red-auto",
    name: "SUZUKI BREEZA RED AUTOMATIC",
    category: "Automatic",
    color: "Red",
    year: "2024",
    transmission: "Automatic",
    driveType: "FWD",
    seats: 5,
    pricePerDay: 2500,
    pricingText: "₹2,500 / day",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    description: "Vibrant red automatic crossover. Stress-free driving with reliable efficiency and plush ride setup.",
    featured: true
  },
  {
    id: "brezza-black-2025",
    name: "SUZUKI BREEZA BLACK 2025",
    category: "SUV",
    color: "Black",
    year: "2025",
    transmission: "Manual",
    driveType: "FWD",
    seats: 5,
    pricePerDay: 2500,
    pricingText: "₹2,500 / day",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    description: "Sleek 2025 stealth black Brezza. Sturdy build, sun-proof utility, and excellent ergonomics for long highway trips.",
    featured: false
  },
  {
    id: "i20-white-2026",
    name: "HYUNDAI I20 WHITE 2026",
    category: "Hatchback",
    color: "White",
    year: "2026",
    transmission: "Manual",
    driveType: "FWD",
    seats: 5,
    pricePerDay: null,
    pricingText: "Contact us for current pricing",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    description: "Premium white hatchback featuring sharp styling, refined engine, and top-tier interior electronics.",
    featured: false
  },
  {
    id: "thar-4x4",
    name: "MAHINDRA THAR 4X4",
    category: "SUV",
    color: "Black",
    year: "2024",
    transmission: "Manual",
    driveType: "4X4",
    seats: 4,
    pricePerDay: null,
    pricingText: "Contact us for current pricing",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    description: "True off-road legend. Equipped with 4x4 low-range transfer case, convertible soft/hard top styling, and undeniable presence.",
    featured: true
  },
  {
    id: "thar-4x2",
    name: "MAHINDRA THAR 4X2",
    category: "SUV",
    color: "Black / Grey",
    year: "2024",
    transmission: "Manual",
    driveType: "RWD (4x2)",
    seats: 4,
    pricePerDay: null,
    pricingText: "Contact us for current pricing",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description: "Iconic Thar styling optimized for urban cruising and highway road trips with superior fuel efficiency.",
    featured: false
  },
  {
    id: "fronx-dark-grey-auto",
    name: "SUZUKI FRONX DARK GREY AUTOMATIC",
    category: "Automatic",
    color: "Dark Grey",
    year: "2024",
    transmission: "Automatic",
    driveType: "FWD",
    seats: 5,
    pricePerDay: 2500,
    pricingText: "₹2,500 / day",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    description: "Coupe-styled dark grey automatic crossover. Smooth automatic transmission with distinctive futuristic aesthetics.",
    featured: true
  }
];

// ==========================================
// 3. WHATSAPP ENCODING HELPER (STRICT DISCIPLINE)
// ==========================================
const buildWhatsAppBookingUrl = (bookingData) => {
  const {
    vehicleName,
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    customerName,
    phone
  } = bookingData;

  // Build the clean string with real UTF-8 emojis and formatting
  const message = `🚗 Car Booking Request — ${BUSINESS_CONFIG.name}

🚘 Vehicle: ${vehicleName || "Not Selected"}

📅 Pickup: ${pickupDate || "N/A"}
⏰ Pickup Time: ${pickupTime || "N/A"}

📅 Return: ${returnDate || "N/A"}
⏰ Return Time: ${returnTime || "N/A"}

👤 Name: ${customerName || "N/A"}
📞 Phone: ${phone || "N/A"}

Please confirm the availability and booking details.`;

  // APPLIED EXACTLY ONCE: encodeURIComponent
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedMessage}`;
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCarForDetail, setSelectedCarForDetail] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    vehicleName: FLEET_DATA[0].name,
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: "10:00",
    returnDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    returnTime: "10:00",
    customerName: "",
    phone: ""
  });

  const [formError, setFormError] = useState("");

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedCarForDetail]);

  // Handler to initiate booking from any car card
  const handleBookCarClick = (carName) => {
    setBookingForm((prev) => ({ ...prev, vehicleName: carName }));
    setCurrentPage('book');
  };

  // Form Submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!bookingForm.customerName.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!bookingForm.phone.trim() || bookingForm.phone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (new Date(bookingForm.returnDate) < new Date(bookingForm.pickupDate)) {
      setFormError("Return date cannot be earlier than pickup date.");
      return;
    }

    const waUrl = buildWhatsAppBookingUrl(bookingForm);
    window.open(waUrl, "_blank");
  };

  // Filtered Fleet logic
  const filteredFleet = useMemo(() => {
    if (selectedCategory === 'All') return FLEET_DATA;
    if (selectedCategory === 'SUV') return FLEET_DATA.filter(c => c.category === 'SUV');
    if (selectedCategory === 'Hatchback') return FLEET_DATA.filter(c => c.category === 'Hatchback');
    if (selectedCategory === 'Automatic') return FLEET_DATA.filter(c => c.transmission === 'Automatic' || c.category === 'Automatic');
    return FLEET_DATA;
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-orange-500 selection:text-white flex flex-col">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-orange-600 to-red-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-orange-600/20 group-hover:scale-105 transition-transform">
              W
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent block">
                {BUSINESS_CONFIG.name}
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-orange-500 uppercase block -mt-1">
                {BUSINESS_CONFIG.tagline}
              </span>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-neutral-300">
            {[
              { id: 'home', label: 'Home' },
              { id: 'fleet', label: 'Fleet' },
              { id: 'offers', label: 'Offers' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'requirements', label: 'Requirements' },
              { id: 'about', label: 'About' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`transition-colors hover:text-orange-500 ${
                  currentPage === item.id ? 'text-orange-500 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${BUSINESS_CONFIG.primaryPhone}`}
              className="flex items-center space-x-2 text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>{BUSINESS_CONFIG.primaryPhone}</span>
            </a>

            <button
              onClick={() => setCurrentPage('book')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-sm tracking-wide shadow-md shadow-orange-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              BOOK NOW
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage('book')}
              className="px-3.5 py-1.5 rounded-md bg-orange-600 text-white font-bold text-xs"
            >
              BOOK
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
            {[
              { id: 'home', label: 'Home' },
              { id: 'fleet', label: 'Fleet' },
              { id: 'offers', label: 'Offers' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'requirements', label: 'Requirements' },
              { id: 'about', label: 'About Us' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' },
              { id: 'book', label: 'Book Your Ride' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-base font-medium border-b border-neutral-800/50 ${
                  currentPage === item.id ? 'text-orange-500 font-bold' : 'text-neutral-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex items-center justify-between text-sm text-neutral-400">
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-500" /> {BUSINESS_CONFIG.primaryPhone}</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-500" /> {BUSINESS_CONFIG.secondaryPhone}</span>
            </div>
          </div>
        )}
      </header>

      {/* DYNAMIC CONTENT ROUTER */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage 
            onBookCar={handleBookCarClick} 
            onViewFleet={() => setCurrentPage('fleet')}
            onViewDetail={(car) => { setSelectedCarForDetail(car); setCurrentPage('vehicle-detail'); }}
            bookingForm={bookingForm}
            setBookingForm={setBookingForm}
            handleBookingSubmit={handleBookingSubmit}
            formError={formError}
          />
        )}

        {currentPage === 'fleet' && (
          <FleetPage 
            fleet={filteredFleet} 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onBookCar={handleBookCarClick}
            onViewDetail={(car) => { setSelectedCarForDetail(car); setCurrentPage('vehicle-detail'); }}
          />
        )}

        {currentPage === 'vehicle-detail' && selectedCarForDetail && (
          <VehicleDetailPage 
            car={selectedCarForDetail}
            onBookCar={handleBookCarClick}
            onBack={() => setCurrentPage('fleet')}
          />
        )}

        {currentPage === 'offers' && (
          <OffersPage onBookCar={handleBookCarClick} />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage onStart={() => setCurrentPage('fleet')} />
        )}

        {currentPage === 'requirements' && (
          <RequirementsPage onBook={() => setCurrentPage('book')} />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'faq' && (
          <FAQPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage onBook={() => setCurrentPage('book')} />
        )}

        {currentPage === 'book' && (
          <BookingPage 
            bookingForm={bookingForm} 
            setBookingForm={setBookingForm} 
            handleBookingSubmit={handleBookingSubmit}
            formError={formError}
          />
        )}

        {currentPage === 'privacy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsPage />}
      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* BRAND COL */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center font-black text-white">W</div>
              <span className="text-lg font-bold text-white tracking-wider">{BUSINESS_CONFIG.name}</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {BUSINESS_CONFIG.tagline} — Premium self-drive car rentals across Kharar, Mohali & Chandigarh. Freedom on your terms with zero deposit.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href={BUSINESS_CONFIG.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-orange-500" />
              </a>
              <a 
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5 text-green-500" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'fleet', label: 'Explore Fleet' },
                { id: 'offers', label: 'Active Offers' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'requirements', label: 'Rental Requirements' },
                { id: 'about', label: 'About Us' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact Us' },
              ].map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => setCurrentPage(item.id)}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICE AREAS */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Service Areas</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {BUSINESS_CONFIG.serviceAreas.map(area => (
                <li key={area} className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" /> {area}
                </li>
              ))}
              <li className="pt-2 text-orange-400 font-medium">
                Free pickup & drop within 5 km radius!
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Contact & Location</h4>
            <div className="space-y-3 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{BUSINESS_CONFIG.primaryPhone} / {BUSINESS_CONFIG.secondaryPhone}</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('book')}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-orange-400 hover:text-orange-300 font-semibold rounded border border-neutral-700 transition-colors text-center block"
                >
                  Book Your Ride Now
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL */}
        <div className="border-t border-neutral-800 bg-neutral-950 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <div>
              © 2026 {BUSINESS_CONFIG.name}. All Rights Reserved.
            </div>
            <div className="flex space-x-6">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-neutral-400">Privacy Policy</button>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-neutral-400">Terms & Conditions</button>
              <button onClick={() => setCurrentPage('requirements')} className="hover:text-neutral-400">Rental Policies</button>
            </div>
          </div>
        </div>
      </footer>

      {/* PERSISTENT MOBILE BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${BUSINESS_CONFIG.primaryPhone}`}
          className="flex-1 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <Phone className="w-4 h-4 text-orange-500" />
          <span>CALL</span>
        </a>

        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi Selfdrive Wheels, I want to enquire about car rentals.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WHATSAPP</span>
        </a>

        <button
          onClick={() => setCurrentPage('book')}
          className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-900/50"
        >
          <Calendar className="w-4 h-4" />
          <span>BOOK NOW</span>
        </button>
      </div>

    </div>
  );
}

// ==========================================
// PAGE COMPONENTS
// ==========================================

// HOMEPAGE
function HomePage({ onBookCar, onViewFleet, onViewDetail, bookingForm, setBookingForm, handleBookingSubmit, formError }) {
  const heroCar = FLEET_DATA.find(c => c.isHero) || FLEET_DATA[0];

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 pt-8 pb-16 overflow-hidden border-b border-neutral-800">
        
        {/* Background Subtle Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left pt-6 lg:pt-0">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-800/50 text-orange-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PREMIUM SELF-DRIVE CAR RENTALS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
              YOUR RIDE. <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                YOUR RULES.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Reliable self-drive cars for your everyday journeys, weekend getaways, and unforgettable road trips across <span className="text-white font-medium">Kharar, Mohali & Chandigarh</span>.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onBookCar(heroCar.name)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-extrabold text-base tracking-wider shadow-lg shadow-orange-950/50 transition-all hover:scale-[1.02]"
              >
                BOOK YOUR CAR
              </button>

              <button
                onClick={onViewFleet}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white font-bold text-base transition-colors"
              >
                VIEW FLEET
              </button>
            </div>

            {/* QUICK TRUST HIGHLIGHTS */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-orange-500" /> No Security Deposit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Free 5km Pickup</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-orange-500" /> Instant WhatsApp Booking</span>
            </div>
          </div>

          {/* RIGHT HERO VEHICLE DISPLAY (MAHINDRA SCORPIO CLASSIC S11 BLACK) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              {/* Card Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-neutral-800/80 to-neutral-900 border border-neutral-700/80 p-3 shadow-2xl overflow-hidden">
                
                {/* Hero Badge */}
                <div className="absolute top-6 left-6 z-20 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-orange-500/30 text-orange-400 font-bold text-xs uppercase tracking-wider">
                  FLAGSHIP HERO
                </div>

                {/* Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-950">
                  <img 
                    src={heroCar.heroImage} 
                    alt="Black Mahindra Scorpio Classic S11" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Hero Car Details Overlay Banner */}
                <div className="p-4 flex items-center justify-between text-left">
                  <div>
                    <h3 className="text-xl font-black text-white">{heroCar.name}</h3>
                    <p className="text-xs text-neutral-400">{heroCar.seats} Seater SUV • Classic S11 Trim • Black Exterior</p>
                  </div>
                  <button
                    onClick={() => onBookCar(heroCar.name)}
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-wider"
                  >
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST / VALUE STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { title: "Flexible Rentals", sub: "Daily & Multi-day" },
            { title: "No Security Deposit", sub: "Hassle-free booking" },
            { title: "12+ Car Models", sub: "Hatchbacks & SUVs" },
            { title: "Free Pickup & Drop", sub: "Within 5 km radius" },
            { title: "Easy Booking", sub: "Direct WhatsApp support" },
          ].map((item, idx) => (
            <div key={idx} className="p-2 border-r last:border-r-0 border-neutral-800/80">
              <p className="text-sm font-bold text-white">{item.title}</p>
              <p className="text-xs text-orange-500 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK BOOKING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-2xl font-black text-white">QUICK BOOKING ENQUIRY</h2>
            <p className="text-xs text-neutral-400">Select dates and car to instantly prepare your WhatsApp availability request.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* VEHICLE SELECT */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Select Vehicle</label>
                <select
                  value={bookingForm.vehicleName}
                  onChange={(e) => setBookingForm({ ...bookingForm, vehicleName: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  {FLEET_DATA.map((car) => (
                    <option key={car.id} value={car.name}>
                      {car.name} ({car.pricingText})
                    </option>
                  ))}
                </select>
              </div>

              {/* PICKUP DATE */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Pickup Date</label>
                <input
                  type="date"
                  value={bookingForm.pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingForm({ ...bookingForm, pickupDate: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* PICKUP TIME */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Pickup Time</label>
                <input
                  type="time"
                  value={bookingForm.pickupTime}
                  onChange={(e) => setBookingForm({ ...bookingForm, pickupTime: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* RETURN DATE */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Return Date</label>
                <input
                  type="date"
                  value={bookingForm.returnDate}
                  min={bookingForm.pickupDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, returnDate: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* RETURN TIME */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Return Time</label>
                <input
                  type="time"
                  value={bookingForm.returnTime}
                  onChange={(e) => setBookingForm({ ...bookingForm, returnTime: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* CUSTOMER NAME */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={bookingForm.customerName}
                  onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* PHONE NUMBER */}
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm tracking-wider shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHECK AVAILABILITY</span>
                </button>
              </div>

            </div>
          </form>
        </div>
      </section>

      {/* FEATURED FLEET SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-white">OUR FEATURED FLEET</h2>
            <p className="text-sm text-neutral-400 mt-1">Explore popular cars for daily city drives and mountain getaways.</p>
          </div>
          <button
            onClick={onViewFleet}
            className="text-xs font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All 12 Vehicles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_DATA.filter(c => c.featured).slice(0, 6).map((car) => (
            <CarCard key={car.id} car={car} onBook={onBookCar} onViewDetail={onViewDetail} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE SELFDRIVE WHEELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white">WHY CHOOSE SELFDRIVE WHEELS</h2>
          <p className="text-sm text-neutral-400 mt-2">Transparent, simple, and student-friendly rentals tailored for ultimate freedom.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Wide Range of Cars",
              desc: "Choose from hatchbacks, compact SUVs, and rugged 4x4 options."
            },
            {
              title: "Affordable Pricing",
              desc: "Cars starting from ₹2,000 / day with clear transparent terms."
            },
            {
              title: "No Security Deposit",
              desc: "Enjoy a stress-free booking experience without heavy security lockups."
            },
            {
              title: "Local Pickup & Drop",
              desc: "Free pickup and drop available within a 5 km radius."
            },
            {
              title: "Flexible Rentals",
              desc: "Tailored packages for short city errands, long weekends, or road trips."
            },
            {
              title: "Drive Your Way",
              desc: "No driver, no fixed itinerary. Complete freedom on your own terms."
            }
          ].map((benefit, i) => (
            <div key={i} className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-950/80 border border-orange-800/50 flex items-center justify-center text-orange-500 font-black text-sm">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM SOCIAL GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 text-center">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">FOLLOW THE JOURNEY</span>
            <h2 className="text-2xl font-black text-white mt-1">{BUSINESS_CONFIG.instagramHandle}</h2>
            <p className="text-xs text-neutral-400 mt-1">Tag us on your road trips across Chandigarh, Himachal & beyond!</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="aspect-square rounded-xl bg-neutral-800 overflow-hidden relative group">
                <img 
                  src={`https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80`} 
                  alt="Roadtrip Feed" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>

          <a
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs"
          >
            <span>FOLLOW US ON INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* FINAL HOMEPAGE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-orange-950/60 via-neutral-900 to-red-950/60 border border-orange-900/40 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">YOUR NEXT JOURNEY STARTS HERE.</h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto">
            Pick your car. Pick your dates. Hit the road with complete confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onBookCar(heroCar.name)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-extrabold text-sm tracking-wider"
            >
              BOOK YOUR RIDE NOW
            </button>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </a>
          </div>

          <p className="text-xs text-neutral-500 pt-2 font-medium">
            {BUSINESS_CONFIG.name} — {BUSINESS_CONFIG.tagline}
          </p>
        </div>
      </section>

    </div>
  );
}

// CAR CARD REUSABLE COMPONENT
function CarCard({ car, onBook, onViewDetail }) {
  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col hover:border-neutral-700 transition-all group">
      {/* IMAGE */}
      <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur text-xs font-bold text-orange-400 border border-neutral-800">
          {car.category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-black text-white group-hover:text-orange-400 transition-colors">
            {car.name}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{car.description}</p>
        </div>

        {/* SPECS STRIP */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-800 text-[11px] text-neutral-300">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>{car.driveType}</span>
          </div>
        </div>

        {/* PRICE & BUTTONS */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400">Rate:</span>
            <span className="text-sm font-extrabold text-orange-400">{car.pricingText}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetail(car)}
              className="py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs transition-colors"
            >
              View Details
            </button>

            <button
              onClick={() => onBook(car.name)}
              className="py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs transition-colors"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// FLEET PAGE
function FleetPage({ fleet, selectedCategory, setSelectedCategory, onBookCar, onViewDetail }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">OUR COMPLETE FLEET</h1>
        <p className="text-sm text-neutral-400 mt-1">Select from our lineup of 12 well-maintained self-drive vehicles.</p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Hatchback', 'SUV', 'Automatic'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              selectedCategory === cat 
                ? 'bg-orange-600 text-white' 
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FLEET GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((car) => (
          <CarCard key={car.id} car={car} onBook={onBookCar} onViewDetail={onViewDetail} />
        ))}
      </div>
    </div>
  );
}

// VEHICLE DETAIL PAGE
function VehicleDetailPage({ car, onBookCar, onBack }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white"
      >
        ← Back to Fleet
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* VEHICLE IMAGE DISPLAY */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden aspect-[16/10]">
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* DETAILS & SPECS */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="px-2.5 py-1 rounded bg-orange-950 text-orange-400 border border-orange-800 text-xs font-bold uppercase">
              {car.category}
            </span>
            <h1 className="text-3xl font-black text-white mt-3">{car.name}</h1>
            <p className="text-xl font-bold text-orange-500 mt-2">{car.pricingText}</p>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">{car.description}</p>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 grid grid-cols-2 gap-4 text-xs">
            <div><span className="text-neutral-500 block">Year:</span> <span className="font-bold text-white">{car.year}</span></div>
            <div><span className="text-neutral-500 block">Color:</span> <span className="font-bold text-white">{car.color}</span></div>
            <div><span className="text-neutral-500 block">Transmission:</span> <span className="font-bold text-white">{car.transmission}</span></div>
            <div><span className="text-neutral-500 block">Drivetrain:</span> <span className="font-bold text-white">{car.driveType}</span></div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs text-neutral-400">
            <p className="font-bold text-white">Rental Highlights:</p>
            <p>• Zero Security Deposit required</p>
            <p>• Free pickup/drop within 5 km radius of Kharar</p>
            <p>• Extra distance: ₹10 / km beyond allotted limit</p>
            <p>• Speed limit cap: 110 km/h max</p>
          </div>

          <button
            onClick={() => onBookCar(car.name)}
            className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm tracking-wider shadow-lg shadow-orange-950/50"
          >
            BOOK THIS VEHICLE NOW
          </button>
        </div>

      </div>
    </div>
  );
}

// OFFERS PAGE
function OffersPage({ onBookCar }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">ACTIVE OFFERS & DISCOUNTS</h1>
        <p className="text-sm text-neutral-400 mt-1">Maximize your savings on long road trips and weekend getaways.</p>
      </div>

      {/* PRIMARY FEATURED OFFER */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-950 via-neutral-900 to-red-950 border border-orange-800/60 space-y-4">
        <div className="inline-block px-3 py-1 rounded bg-orange-600 text-white font-extrabold text-xs">
          🎉 FEATURED OFFER
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">3-DAY BOOKING OFFER — GET HALF DAY FREE!</h2>
        <p className="text-sm text-neutral-300 max-w-2xl">
          Book any vehicle for 3 consecutive days and get an additional half-day rental time completely FREE. Perfect for road trips to Himachal and long weekend getaways.
        </p>
        <button
          onClick={() => onBookCar(FLEET_DATA[0].name)}
          className="px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider"
        >
          CLAIM THIS OFFER NOW
        </button>
      </div>

      {/* SPECIAL & SEASONAL CATEGORIES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Student Weekend Deals", desc: "Special rental deals for college students in Kharar & Mohali. Valid student ID required." },
          { title: "Vacation & Long Trips", desc: "Discounted per-day rates when booking for 5 days or more." },
          { title: "Free Local Delivery", desc: "Enjoy complimentary doorstep vehicle drop within 5 km radius." },
        ].map((offer, idx) => (
          <div key={idx} className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="text-lg font-bold text-white">{offer.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{offer.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// HOW IT WORKS PAGE
function HowItWorksPage({ onStart }) {
  const steps = [
    { step: "01", title: "Choose Your Car", desc: "Browse our 12-vehicle fleet and select the vehicle that suits your journey." },
    { step: "02", title: "Select Your Dates", desc: "Choose your pickup and return dates and times." },
    { step: "03", title: "Send Booking Request", desc: "Submit your enquiry via our instant WhatsApp booking system." },
    { step: "04", title: "Verify Documents", desc: "Provide your Driving Licence, Aadhaar Card, and College/Work ID." },
    { step: "05", title: "Pick Up & Drive", desc: "Collect your vehicle or get it delivered free within 5 km and hit the road!" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-black text-white">HOW IT WORKS</h1>
        <p className="text-sm text-neutral-400 mt-1">Renting a self-drive car with us is quick, simple, and transparent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((s) => (
          <div key={s.step} className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3 relative">
            <div className="text-3xl font-black text-orange-500">{s.step}</div>
            <h3 className="text-base font-bold text-white">{s.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onStart}
          className="px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm"
        >
          EXPLORE FLEET & START BOOKING
        </button>
      </div>
    </div>
  );
}

// REQUIREMENTS & POLICIES PAGE
function RequirementsPage({ onBook }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-black text-white">WHAT YOU NEED TO RENT</h1>
        <p className="text-sm text-neutral-400 mt-1">Mandatory verification documents & rental policies.</p>
      </div>

      {/* REQUIRED DOCUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-orange-950 flex items-center justify-center text-orange-500 font-bold mb-2">01</div>
          <h3 className="text-lg font-bold text-white">Driving Licence</h3>
          <p className="text-xs text-neutral-400">Original valid Indian driving licence is strictly required.</p>
        </div>

        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-orange-950 flex items-center justify-center text-orange-500 font-bold mb-2">02</div>
          <h3 className="text-lg font-bold text-white">Aadhaar Card</h3>
          <p className="text-xs text-neutral-400">Valid Aadhaar identification is required for identity verification.</p>
        </div>

        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-orange-950 flex items-center justify-center text-orange-500 font-bold mb-2">03</div>
          <h3 className="text-lg font-bold text-white">College / Work ID</h3>
          <p className="text-xs text-neutral-400">Provide a valid college ID or official work ID card.</p>
        </div>
      </div>

      {/* NO SECURITY DEPOSIT BANNER */}
      <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-4">
        <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
        <div>
          <h3 className="text-base font-bold text-emerald-300">🔐 NO SECURITY DEPOSIT REQUIRED</h3>
          <p className="text-xs text-neutral-300 mt-1">
            We do not hold heavy cash security deposits. Note: Any accident-related losses or damages are the responsibility of the customer according to standard rental terms.
          </p>
        </div>
      </div>

      {/* RENTAL POLICIES GRID */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">TERMS & POLICIES OVERVIEW</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-300">
          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
            <span className="font-bold text-white block mb-1">Speed Limit</span>
            Maximum permitted speed is 110 km/h. Overspeeding penalties are communicated prior to booking.
          </div>
          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
            <span className="font-bold text-white block mb-1">Extra Kilometres</span>
            Distance exceeding allotted rental limit is charged at ₹10/km.
          </div>
          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
            <span className="font-bold text-white block mb-1">Booking Extension</span>
            Inform team at least 6 hours before scheduled return time. Subject to availability.
          </div>
          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
            <span className="font-bold text-white block mb-1">Cancellation Policy</span>
            Booking advance amounts are non-refundable for Friday, Saturday, or Sunday bookings.
          </div>
        </div>
      </div>
    </div>
  );
}

// ABOUT US PAGE
function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">ABOUT SELFDRIVE WHEELS</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          MORE THAN JUST A RENTAL. IT'S YOUR JOURNEY.
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Selfdrive Wheels was created to make self-drive travel simple, flexible, and accessible. Whether customers are heading out for a weekend getaway, travelling with friends, visiting family, commuting around the city, or planning a long road trip, our goal is to provide the freedom to choose a vehicle and travel on their own terms.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Service Location & Hub</h3>
        <p className="text-xs text-neutral-400">
          Based out of Mustang City, Nirwana Street, Kharar, Punjab, we proudly serve:
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-bold text-orange-400">
          {BUSINESS_CONFIG.serviceAreas.map(area => (
            <span key={area} className="px-3 py-1 rounded-md bg-neutral-800 border border-neutral-700">
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* FUTURE EXPANSION SECTION */}
      <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <span className="text-xs font-bold text-orange-500 uppercase">FUTURE HORIZONS</span>
        <h3 className="text-xl font-black text-white">MORE WHEELS. MORE FREEDOM.</h3>
        <p className="text-xs text-neutral-400">Selfdrive Wheels is continuously expanding its rental portfolio. Coming soon:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-neutral-300">
          <div className="p-3 rounded bg-neutral-800">🏍️ Bikes (Coming Soon)</div>
          <div className="p-3 rounded bg-neutral-800">🛵 Scooties (Coming Soon)</div>
          <div className="p-3 rounded bg-neutral-800">🚗 Expanded Fleet</div>
          <div className="p-3 rounded bg-neutral-800">🎁 Referral Rewards</div>
        </div>
      </div>
    </div>
  );
}

// FAQ PAGE
function FAQPage() {
  const faqs = [
    { q: "What documents are required to rent a car?", a: "Driving licence, Aadhaar card, and valid college/work ID." },
    { q: "Is a security deposit required?", a: "No security deposit is required." },
    { q: "What areas do you serve?", a: "Kharar, Landran, Mohali, and Chandigarh." },
    { q: "Do you provide pickup and drop?", a: "Yes. Free pickup and drop is available within a 5 km radius." },
    { q: "Are hourly bookings available?", a: "Hourly bookings may be available on applicable weekdays. Hourly bookings are not available on weekends." },
    { q: "What happens if I exceed the allotted kilometres?", a: "Additional kilometres are charged at ₹10/km." },
    { q: "What is the maximum permitted speed?", a: "110 km/h." },
    { q: "Can I extend my booking?", a: "Yes, subject to vehicle availability. Inform the team at least 6 hours before return time." },
    { q: "Is the booking amount refundable?", a: "Booking amounts are non-refundable for Friday, Saturday, and Sunday bookings." },
    { q: "Who is responsible for accident-related losses?", a: "Accident-related losses/damages are the customer's responsibility according to applicable rental terms." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="text-sm text-neutral-400 mt-1">Get quick answers regarding rentals, documentation, and policies.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="text-base font-bold text-white">{faq.q}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// CONTACT PAGE
function ContactPage({ onBook }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-3xl font-black text-white uppercase">READY TO HIT THE ROAD?</h1>
        <p className="text-sm text-neutral-400">Choose your car, choose your dates, and let Selfdrive Wheels take care of the rest.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DIRECT CONTACT INFO */}
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
          <h2 className="text-xl font-bold text-white">Contact & Support</h2>
          
          <div className="space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>
                <strong className="block text-white">Address:</strong>
                {BUSINESS_CONFIG.address}
              </span>
            </p>

            <p className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>
                <strong className="block text-white">Call Us:</strong>
                {BUSINESS_CONFIG.primaryPhone} / {BUSINESS_CONFIG.secondaryPhone}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${BUSINESS_CONFIG.primaryPhone}`}
              className="py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs text-center"
            >
              CALL NOW
            </a>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center"
            >
              WHATSAPP US
            </a>
          </div>
        </div>

        {/* MAP PLACEHOLDER BLOCK */}
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Service Location</h2>
            <p className="text-xs text-neutral-400 mt-1">Mustang City, Nirwana Street, Kharar</p>
          </div>

          <div className="aspect-video rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-center p-6">
            <div>
              <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-white">{BUSINESS_CONFIG.address}</p>
              <p className="text-[11px] text-neutral-500 mt-1">Interactive Directions Available via Google Maps</p>
            </div>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-orange-400 font-bold text-xs text-center"
          >
            GET DIRECTIONS
          </a>
        </div>
      </div>
    </div>
  );
}

// BOOKING PAGE
function BookingPage({ bookingForm, setBookingForm, handleBookingSubmit, formError }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">BOOK YOUR RIDE</h1>
        <p className="text-sm text-neutral-400 mt-1">Fill in the details below to generate an instant WhatsApp booking enquiry.</p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
        <form onSubmit={handleBookingSubmit} className="space-y-5">
          {formError && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{formError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Selected Vehicle</label>
            <select
              value={bookingForm.vehicleName}
              onChange={(e) => setBookingForm({ ...bookingForm, vehicleName: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
            >
              {FLEET_DATA.map((car) => (
                <option key={car.id} value={car.name}>
                  {car.name} ({car.pricingText})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Pickup Date</label>
              <input
                type="date"
                value={bookingForm.pickupDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBookingForm({ ...bookingForm, pickupDate: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Pickup Time</label>
              <input
                type="time"
                value={bookingForm.pickupTime}
                onChange={(e) => setBookingForm({ ...bookingForm, pickupTime: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Return Date</label>
              <input
                type="date"
                value={bookingForm.returnDate}
                min={bookingForm.pickupDate}
                onChange={(e) => setBookingForm({ ...bookingForm, returnDate: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Return Time</label>
              <input
                type="time"
                value={bookingForm.returnTime}
                onChange={(e) => setBookingForm({ ...bookingForm, returnTime: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Full Name</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={bookingForm.customerName}
              onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone / WhatsApp Number</label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={bookingForm.phone}
              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm tracking-wider shadow-lg flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>CONFIRM & SEND WHATSAPP ENQUIRY</span>
          </button>
        </form>
      </div>
    </div>
  );
}

// PRIVACY POLICY & TERMS DUMMY PAGES
function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-4 text-xs text-neutral-300">
      <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
      <p>Selfdrive Wheels respects your privacy. Document details provided for rental verification (DL, Aadhaar) are handled securely for identity verification only.</p>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-4 text-xs text-neutral-300">
      <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>
      <p>Renter must possess a valid original driving licence. Speed limit is capped at 110 km/h. Excess mileage billed at ₹10/km.</p>
    </div>
  );
}
