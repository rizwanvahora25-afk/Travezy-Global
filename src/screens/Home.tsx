import { useState, useRef, useEffect } from 'react';
import { packages, testimonials, quickCategories, services, CONTACT, formatPrice, Package } from '@/data';
import {
  Search, MapPin, Globe, Briefcase, Plane, FileText, Coins,
  Star, Phone, MessageCircle, ChevronRight, Sparkles, Menu,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  MapPin, Globe, Briefcase, Plane, FileText, Coins,
  ShieldCheck: (props: any) => <FileText {...props} />,
  Compass: (props: any) => <MapPin {...props} />,
};

interface Props {
  onSearch: (q: string) => void;
  onCategory: (cat: string) => void;
  onPackage: (pkg: Package) => void;
  onPlanner: () => void;
  onAI: () => void;
  onExplore: () => void;
}

export default function Home({ onSearch, onCategory, onPackage, onPlanner, onAI, onExplore }: Props) {
  const [searchQ, setSearchQ] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const featured = packages.slice(0, 5);
  const recommended = packages.slice(3, 7);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx(prev => {
        const next = (prev + 1) % featured.length;
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ left: next * (carouselRef.current.clientWidth * 0.85), behavior: 'smooth' });
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <div className="pb-4">
      {/* Hero Banner */}
      <div className="relative h-[280px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(https://images.pexels.com/photos/1287455/pexels-photo-1287455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 via-brand-800/50 to-brand-900/80" />
        <div className="relative h-full flex flex-col justify-center px-5">
          <p className="text-white/80 text-sm font-medium mb-1">Your journey is our passion</p>
          <h1 className="text-white text-3xl font-bold leading-tight mb-3">
            Explore the world<br/>with Travezy Global
          </h1>
          <button
            onClick={onExplore}
            className="bg-accent-500 text-brand-900 font-semibold px-5 py-2.5 rounded-full text-sm w-fit active:scale-95 transition-transform"
          >
            Discover Packages
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="-mt-6 mx-4 relative z-10">
        <div className="bg-white rounded-2xl card-shadow-lg flex items-center px-4 py-3">
          <Search size={20} className="text-brand-600 flex-shrink-0" />
          <input
            type="text"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearch(searchQ)}
            placeholder="Search destinations, packages..."
            className="flex-1 ml-3 outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
          <button
            onClick={() => onSearch(searchQ)}
            className="bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-lg active:scale-95 transition-transform"
          >
            Search
          </button>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="mt-6 px-4">
        <div className="grid grid-cols-4 gap-3">
          {quickCategories.map(cat => {
            const Icon = iconMap[cat.icon] || MapPin;
            return (
              <button
                key={cat.label}
                onClick={() => onCategory(cat.filter)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center">
                  <Icon size={22} className="text-brand-700" />
                </div>
                <span className="text-xs font-medium text-gray-700">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Planner Banner */}
      <div className="mt-6 mx-4">
        <button
          onClick={onAI}
          className="w-full bg-gradient-to-r from-brand-700 to-brand-600 rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="text-left flex-1">
            <p className="text-white font-semibold text-sm">AI Travel Planner</p>
            <p className="text-white/70 text-xs">Get personalized recommendations</p>
          </div>
          <ChevronRight size={20} className="text-white/60" />
        </button>
      </div>

      {/* Featured Packages */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-lg font-bold text-gray-800">Featured Packages</h2>
          <button onClick={onExplore} className="text-brand-600 text-sm font-medium">See all</button>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-4 snap-x snap-mandatory"
        >
          {featured.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} onClick={() => onPackage(pkg)} compact />
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mt-6 px-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Our Services</h2>
        <div className="grid grid-cols-3 gap-3">
          {services.map(svc => {
            const Icon = iconMap[svc.icon] || MapPin;
            return (
              <div key={svc.name} className="bg-white rounded-2xl card-shadow p-3 flex flex-col items-center gap-2">
                <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-brand-700" />
                </div>
                <span className="text-xs font-medium text-gray-600 text-center leading-tight">{svc.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended for You */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 px-4 mb-3">Recommended for You</h2>
        <div className="px-4 space-y-3">
          {recommended.map(pkg => (
            <PackageRow key={pkg.id} pkg={pkg} onClick={() => onPackage(pkg)} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 px-4 mb-3">Testimonials</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 snap-x snap-mandatory pb-2">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl card-shadow p-4 w-[280px] flex-shrink-0 snap-start">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 bg-brand-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.destination} · {t.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-accent-500 fill-accent-500" />)}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-6 mx-4">
        <div className="bg-brand-700 rounded-2xl p-4">
          <h3 className="text-white font-semibold text-sm mb-1">24/7 Assistance</h3>
          <p className="text-white/70 text-xs mb-3">Our team is always just a call away</p>
          <div className="flex gap-2">
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="flex-1 bg-white/15 backdrop-blur rounded-xl py-2.5 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Phone size={16} className="text-white" />
              <span className="text-white text-xs font-medium">Call Us</span>
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              className="flex-1 bg-white/15 backdrop-blur rounded-xl py-2.5 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <MessageCircle size={16} className="text-white" />
              <span className="text-white text-xs font-medium">WhatsApp</span>
            </a>
          </div>
          <p className="text-white/60 text-xs mt-2 text-center">{CONTACT.phone}</p>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ pkg, onClick, compact }: { pkg: Package; onClick: () => void; compact?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-2xl card-shadow overflow-hidden flex-shrink-0 snap-start ${compact ? 'w-[230px]' : 'w-full'} active:scale-95 transition-transform`}
    >
      <div className="relative h-[140px] overflow-hidden">
        <img src={pkg.image} alt={pkg.destination} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full px-2 py-0.5 flex items-center gap-1">
          <Star size={11} className="text-accent-500 fill-accent-500" />
          <span className="text-xs font-semibold text-gray-700">{pkg.rating}</span>
        </div>
        <div className="absolute bottom-2 left-2 bg-brand-700/90 rounded-full px-2.5 py-0.5">
          <span className="text-white text-xs font-medium">{pkg.duration}</span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 leading-tight mb-1">{pkg.name}</p>
        <p className="text-xs text-gray-400 mb-2">{pkg.destination}</p>
        <div className="flex items-center justify-between">
          <span className="text-brand-700 font-bold text-base">{formatPrice(pkg.price)}</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
      </div>
    </button>
  );
}

function PackageRow({ pkg, onClick }: { pkg: Package; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl card-shadow overflow-hidden flex active:scale-95 transition-transform"
    >
      <img src={pkg.image} alt={pkg.destination} className="w-[110px] h-[90px] object-cover flex-shrink-0" />
      <div className="flex-1 p-3 text-left">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs text-white bg-brand-700 rounded-full px-2 py-0.5 font-medium">{pkg.duration}</span>
          <div className="flex items-center gap-0.5">
            <Star size={11} className="text-accent-500 fill-accent-500" />
            <span className="text-xs font-semibold text-gray-600">{pkg.rating}</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800 leading-tight mb-1">{pkg.name}</p>
        <p className="text-xs text-gray-400 mb-1 line-clamp-1">{pkg.inclusions.join(', ')}</p>
        <span className="text-brand-700 font-bold">{formatPrice(pkg.price)}</span>
      </div>
    </button>
  );
}
