import { Package, formatPrice, CONTACT } from '@/data';
import { Star, Check, ChevronLeft, Phone, MessageCircle, Calendar, Users, ChevronRight } from 'lucide-react';

interface Props {
  pkg: Package;
  onBack: () => void;
  onBook: () => void;
}

export default function PackageDetail({ pkg, onBack, onBook }: Props) {
  return (
    <div className="pb-24">
      {/* Hero Image */}
      <div className="relative h-[260px] overflow-hidden">
        <img src={pkg.image} alt={pkg.destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} className="text-gray-800" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-white bg-brand-700 rounded-full px-2.5 py-0.5 font-medium">{pkg.duration}</span>
            <div className="flex items-center gap-0.5 bg-white/90 rounded-full px-2 py-0.5">
              <Star size={12} className="text-accent-500 fill-accent-500" />
              <span className="text-xs font-semibold text-gray-700">{pkg.rating}</span>
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold">{pkg.name}</h1>
          <p className="text-white/80 text-sm">{pkg.destination}</p>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Price */}
        <div className="bg-brand-50 rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-2xl font-bold text-brand-700">{formatPrice(pkg.price)}</p>
            <p className="text-xs text-gray-400">per person</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <a href={`tel:${CONTACT.phoneDial}`} className="bg-white rounded-lg w-10 h-10 flex items-center justify-center active:scale-90 transition-transform">
              <Phone size={16} className="text-brand-700" />
            </a>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" className="bg-white rounded-lg w-10 h-10 flex items-center justify-center active:scale-90 transition-transform">
              <MessageCircle size={16} className="text-brand-700" />
            </a>
          </div>
        </div>

        {/* Inclusions */}
        <h2 className="text-lg font-bold text-gray-800 mb-3">What's Included</h2>
        <div className="flex flex-wrap gap-2 mb-5">
          {pkg.inclusions.map((inc, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white rounded-lg card-shadow px-3 py-2">
              <Check size={14} className="text-green-600" />
              <span className="text-xs font-medium text-gray-700">{inc}</span>
            </div>
          ))}
        </div>

        {/* Itinerary */}
        <h2 className="text-lg font-bold text-gray-800 mb-3">Day-wise Itinerary</h2>
        <div className="space-y-3 mb-5">
          {pkg.itinerary.map(item => (
            <div key={item.day} className="bg-white rounded-2xl card-shadow p-4 flex gap-3">
              <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{item.day}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 mb-1">Day {item.day}: {item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {pkg.tags.map(tag => (
            <span key={tag} className="text-xs bg-sand-100 text-brand-700 px-3 py-1 rounded-full font-medium">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Sticky Book Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 p-3 safe-bottom z-30">
        <button
          onClick={onBook}
          className="w-full bg-brand-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Book Now — {formatPrice(pkg.price)}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
