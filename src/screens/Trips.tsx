import { formatPrice } from '@/data';
import { Calendar, Users, MapPin, Trash2, Plane, Plus, ChevronRight } from 'lucide-react';

interface Props {
  bookings: any[];
  plannerTrips: any[];
  onDeleteBooking: (id: string) => void;
  onDeleteTrip: (id: string) => void;
  onExplore: () => void;
  onPlanner: () => void;
}

export default function Trips({ bookings, plannerTrips, onDeleteBooking, onDeleteTrip, onExplore, onPlanner }: Props) {
  const totalTrips = bookings.length + plannerTrips.length;

  return (
    <div className="pb-4">
      <div className="px-4 pt-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">My Trips</h1>
        <p className="text-sm text-gray-400 mb-4">{totalTrips} {totalTrips === 1 ? 'trip' : 'trips'} saved</p>
      </div>

      {totalTrips === 0 && (
        <div className="px-4">
          <div className="bg-white rounded-2xl card-shadow p-8 text-center">
            <Plane size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600 mb-1">No trips yet</p>
            <p className="text-xs text-gray-400 mb-4">Book a package or plan a custom trip</p>
            <div className="flex flex-col gap-2">
              <button onClick={onExplore} className="bg-brand-700 text-white font-medium py-3 rounded-xl text-sm active:scale-95 transition-transform">
                Browse Packages
              </button>
              <button onClick={onPlanner} className="bg-white text-brand-700 font-medium py-3 rounded-xl text-sm card-shadow active:scale-95 transition-transform">
                Plan Custom Trip
              </button>
            </div>
          </div>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="px-4 mb-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Bookings</h2>
          <div className="space-y-3">
            {bookings.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl card-shadow overflow-hidden">
                <div className="flex">
                  <img src={b.image} alt={b.pkgName} className="w-[100px] h-[100px] object-cover flex-shrink-0" />
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{b.pkgName}</p>
                        <p className="text-xs text-gray-400">{b.destination} · {b.duration}</p>
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
              </div>
            ))}
          </div>
        </div>
      )}

      {plannerTrips.length > 0 && (
        <div className="px-4">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Planned Trips</h2>
          <div className="space-y-3">
            {plannerTrips.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl card-shadow overflow-hidden">
                <div className="flex">
                  <img src={t.image} alt={t.destination} className="w-[100px] h-[100px] object-cover flex-shrink-0" />
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{t.destination}</p>
                        <p className="text-xs text-gray-400">{t.days} days · {t.itinerary?.length || 0} activities</p>
                      </div>
                      <button onClick={() => onDeleteTrip(t.id)} className="text-gray-300 active:scale-90 transition-transform">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs font-medium text-brand-700 mt-2">{t.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalTrips > 0 && (
        <div className="px-4 mt-5">
          <button onClick={onPlanner} className="w-full bg-white rounded-2xl card-shadow p-4 flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <Plus size={18} className="text-brand-700" />
            </div>
            <p className="text-sm font-medium text-gray-700 flex-1 text-left">Plan a new trip</p>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </div>
      )}
    </div>
  );
}
