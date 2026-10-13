import { CONTACT, formatPrice } from '@/data';
import { Phone, MessageCircle, Mail, MapPin, Calendar, Users, Plane, Briefcase, ChevronRight, Trash2 } from 'lucide-react';

interface Props {
  bookings: any[];
  plannerTrips: any[];
  onDeleteBooking: (id: string) => void;
  onDeleteTrip: (id: string) => void;
  onExplore: () => void;
}

export default function Profile({ bookings, plannerTrips, onDeleteBooking, onDeleteTrip, onExplore }: Props) {
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-700 to-brand-600 px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <img src={CONTACT.logo} alt="Travezy Global" className="w-12 h-12 bg-white rounded-xl p-1 object-contain" />
          <div>
            <h1 className="text-white text-xl font-bold">Travezy Global</h1>
            <p className="text-white/70 text-xs">Your journey is our passion</p>
          </div>
        </div>
      </div>

      {/* My Bookings */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">My Bookings</h2>
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl card-shadow p-6 text-center">
            <Plane size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400 mb-3">No bookings yet</p>
            <button onClick={onExplore} className="text-brand-600 text-sm font-medium">Explore packages →</button>
          </div>
        ) : (
          <div className="space-y-3 mb-5">
            {bookings.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl card-shadow p-3 flex gap-3">
                <img src={b.image} alt={b.pkgName} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{b.pkgName}</p>
                      <p className="text-xs text-gray-400">{b.destination}</p>
                    </div>
                    <button onClick={() => onDeleteBooking(b.id)} className="text-gray-300 active:scale-90 transition-transform">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={11} /> {b.date}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={11} /> {b.travelers}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-medium text-brand-700">{b.id}</span>
                    <span className="text-sm font-bold text-brand-700">{formatPrice(b.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Planner Trips */}
        <h2 className="text-lg font-bold text-gray-800 mb-3">My Planned Trips</h2>
        {plannerTrips.length === 0 ? (
          <div className="bg-white rounded-2xl card-shadow p-6 text-center mb-5">
            <MapPin size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No planned trips yet</p>
          </div>
        ) : (
          <div className="space-y-3 mb-5">
            {plannerTrips.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl card-shadow p-3 flex gap-3">
                <img src={t.image} alt={t.destination} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{t.destination}</p>
                      <p className="text-xs text-gray-400">{t.days} days · Custom plan</p>
                    </div>
                    <button onClick={() => onDeleteTrip(t.id)} className="text-gray-300 active:scale-90 transition-transform">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs font-medium text-brand-700 mt-1">{t.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Support */}
        <h2 className="text-lg font-bold text-gray-800 mb-3">Support</h2>
        <div className="bg-white rounded-2xl card-shadow divide-y divide-gray-50 mb-5">
          <a href={`tel:${CONTACT.phoneDial}`} className="flex items-center gap-3 p-4 active:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <Phone size={18} className="text-brand-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Call Us</p>
              <p className="text-xs text-gray-400">{CONTACT.phone}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </a>
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" className="flex items-center gap-3 p-4 active:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <MessageCircle size={18} className="text-brand-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">WhatsApp</p>
              <p className="text-xs text-gray-400">Chat with our team</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 p-4 active:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <Mail size={18} className="text-brand-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Email</p>
              <p className="text-xs text-gray-400">{CONTACT.email}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </a>
          <div className="flex items-start gap-3 p-4">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-brand-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Office</p>
              <p className="text-xs text-gray-400 leading-relaxed">{CONTACT.address}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-brand-50 rounded-2xl p-4 mb-2">
          <p className="text-xs text-gray-600 leading-relaxed">
            Travezy Global is a women-led travel startup based in Mumbai, with 6+ years of experience serving 2000+ travelers.
            We specialize in curated holiday experiences, corporate travel, flights, visa, forex, and insurance.
          </p>
        </div>
        <p className="text-xs text-gray-300 text-center">v1.0 · Made with ❤ in Mumbai</p>
      </div>
    </div>
  );
}
