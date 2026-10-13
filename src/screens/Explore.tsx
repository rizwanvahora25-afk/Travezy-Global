import { useState, useMemo } from 'react';
import { packages, formatPrice, Package } from '@/data';
import { Search, SlidersHorizontal, Star, ChevronRight, X } from 'lucide-react';

interface Props {
  onPackage: (pkg: Package) => void;
  initialSearch?: string;
  initialCategory?: string;
}

export default function Explore({ onPackage, initialSearch = '', initialCategory = '' }: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [budget, setBudget] = useState<string>('all');
  const [duration, setDuration] = useState<string>('all');

  const filtered = useMemo(() => {
    return packages.filter(pkg => {
      if (search) {
        const q = search.toLowerCase();
        if (!pkg.name.toLowerCase().includes(q) && !pkg.destination.toLowerCase().includes(q)) return false;
      }
      if (budget === 'low' && pkg.price > 40000) return false;
      if (budget === 'mid' && (pkg.price <= 40000 || pkg.price > 70000)) return false;
      if (budget === 'high' && pkg.price <= 70000) return false;
      if (duration === 'short' && pkg.nights > 4) return false;
      if (duration === 'medium' && (pkg.nights <= 4 || pkg.nights > 6)) return false;
      if (duration === 'long' && pkg.nights <= 6) return false;
      return true;
    });
  }, [search, budget, duration]);

  return (
    <div className="pb-4">
      <div className="px-4 pt-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Explore Packages</h1>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-white rounded-xl card-shadow flex items-center px-3 py-2.5">
            <Search size={18} className="text-brand-600 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="flex-1 ml-2 outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="bg-white rounded-xl card-shadow w-11 h-11 flex items-center justify-center active:scale-95 transition-transform"
          >
            <SlidersHorizontal size={18} className="text-brand-700" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          <Chip label="All" active={budget === 'all' && duration === 'all'} onClick={() => { setBudget('all'); setDuration('all'); }} />
          <Chip label="Budget" active={budget === 'low'} onClick={() => setBudget(budget === 'low' ? 'all' : 'low')} />
          <Chip label="Mid-range" active={budget === 'mid'} onClick={() => setBudget(budget === 'mid' ? 'all' : 'mid')} />
          <Chip label="Luxury" active={budget === 'high'} onClick={() => setBudget(budget === 'high' ? 'all' : 'high')} />
          <Chip label="Short (≤4N)" active={duration === 'short'} onClick={() => setDuration(duration === 'short' ? 'all' : 'short')} />
          <Chip label="Long (6N+)" active={duration === 'long'} onClick={() => setDuration(duration === 'long' ? 'all' : 'long')} />
        </div>

        <p className="text-xs text-gray-400 mb-3">{filtered.length} packages found</p>
      </div>

      <div className="px-4 space-y-3">
        {filtered.map(pkg => (
          <button
            key={pkg.id}
            onClick={() => onPackage(pkg)}
            className="w-full bg-white rounded-2xl card-shadow overflow-hidden flex active:scale-95 transition-transform text-left"
          >
            <img src={pkg.image} alt={pkg.destination} className="w-[120px] h-[100px] object-cover flex-shrink-0" />
            <div className="flex-1 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-white bg-brand-700 rounded-full px-2 py-0.5 font-medium">{pkg.duration}</span>
                <div className="flex items-center gap-0.5">
                  <Star size={11} className="text-accent-500 fill-accent-500" />
                  <span className="text-xs font-semibold text-gray-600">{pkg.rating}</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-800 leading-tight mb-0.5">{pkg.name}</p>
              <p className="text-xs text-gray-400 mb-1">{pkg.destination}</p>
              <p className="text-xs text-gray-500 line-clamp-1 mb-1">{pkg.inclusions.join(', ')}</p>
              <div className="flex items-center justify-between">
                <span className="text-brand-700 font-bold">{formatPrice(pkg.price)}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No packages match your filters</p>
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setShowFilters(false)}>
          <div className="absolute inset-0 bg-black/40 animate-fadeIn" />
          <div
            className="relative bg-white rounded-t-3xl w-full max-w-[480px] mx-auto p-5 animate-slideUp safe-bottom"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Budget</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { v: 'all', l: 'Any' },
                { v: 'low', l: 'Under ₹40,000' },
                { v: 'mid', l: '₹40K - ₹70K' },
                { v: 'high', l: 'Above ₹70K' },
              ].map(b => (
                <button
                  key={b.v}
                  onClick={() => setBudget(b.v)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    budget === b.v ? 'bg-brand-700 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {b.l}
                </button>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Duration</p>
            <div className="flex gap-2 mb-5 flex-wrap">
              {[
                { v: 'all', l: 'Any' },
                { v: 'short', l: 'Short (≤4N)' },
                { v: 'medium', l: 'Medium (5-6N)' },
                { v: 'long', l: 'Long (7D+)' },
              ].map(d => (
                <button
                  key={d.v}
                  onClick={() => setDuration(d.v)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    duration === d.v ? 'bg-brand-700 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {d.l}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-brand-700 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
        active ? 'bg-brand-700 text-white' : 'bg-white text-gray-600 card-shadow'
      }`}
    >
      {label}
    </button>
  );
}
