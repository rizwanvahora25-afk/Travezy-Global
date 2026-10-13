import { useState } from 'react';
import { packages, formatPrice, Package } from '@/data';
import { ChevronLeft, MapPin, Plus, Minus, Check, Edit3, Save, ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSave: (trip: any) => void;
  onPackage: (pkg: Package) => void;
}

export default function Planner({ onBack, onSave, onPackage }: Props) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(5);
  const [generated, setGenerated] = useState(false);
  const [itinerary, setItinerary] = useState<{ day: number; title: string; desc: string }[]>([]);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const templates: Record<string, (day: number) => { title: string; desc: string }> = {
    default: (d) => ({
      title: `Day ${d} — Explore ${destination || 'Your Destination'}`,
      desc: `Discover the highlights of ${destination || 'your destination'}. Visit key attractions, enjoy local cuisine, and immerse in the culture.`,
    }),
  };

  const handleGenerate = () => {
    if (!destination) return;
    const items = [];
    for (let i = 1; i <= days; i++) {
      const t = templates.default(i);
      if (i === 1) items.push({ day: i, title: `Day ${i} — Arrival in ${destination}`, desc: `Arrive at ${destination}, check-in to your hotel, and relax. Evening at leisure to explore the local area.` });
      else if (i === days) items.push({ day: i, title: `Day ${i} — Departure from ${destination}`, desc: `Breakfast, check-out, and transfer to the airport for your return journey.` });
      else items.push({ day: i, title: t.title, desc: t.desc });
    }
    setItinerary(items);
    setGenerated(true);
  };

  const handleEdit = (day: number, current: string) => {
    setEditingDay(day);
    setEditText(current);
  };

  const handleSaveEdit = () => {
    if (editingDay !== null) {
      setItinerary(itinerary.map(item =>
        item.day === editingDay ? { ...item, desc: editText } : item
      ));
      setEditingDay(null);
    }
  };

  const handleSaveTrip = () => {
    onSave({
      id: 'PLAN-' + Date.now().toString(36).toUpperCase(),
      type: 'planner',
      destination,
      days,
      itinerary,
      image: packages.find(p => p.destination.toLowerCase().includes(destination.toLowerCase()))?.image || packages[0].image,
    });
    onBack();
  };

  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 px-4 py-2">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center card-shadow active:scale-90 transition-transform">
          <ChevronLeft size={20} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Itinerary Planner</h1>
      </div>

      <div className="px-4 mt-2">
        {!generated && (
          <>
            <div className="bg-gradient-to-br from-brand-700 to-brand-600 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-white" />
                <p className="text-white font-semibold text-sm">Plan Your Custom Trip</p>
              </div>
              <p className="text-white/70 text-xs mb-4">Pick a destination and number of days to generate a day-by-day plan you can edit.</p>
            </div>

            <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-brand-600" /> Destination
            </h2>
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="e.g. Bali, Dubai, Japan..."
              className="w-full bg-white rounded-xl card-shadow px-4 py-3 text-sm text-gray-700 outline-none mb-4"
            />

            <h2 className="text-sm font-semibold text-gray-700 mb-2">Number of Days</h2>
            <div className="bg-white rounded-xl card-shadow px-4 py-3 flex items-center justify-between mb-4">
              <span className="text-sm text-gray-700">Days</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setDays(Math.max(2, days - 1))} className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center active:scale-90 transition-transform">
                  <Minus size={16} className="text-gray-600" />
                </button>
                <span className="text-sm font-bold text-gray-800 w-6 text-center">{days}</span>
                <button onClick={() => setDays(Math.min(15, days + 1))} className="w-9 h-9 bg-brand-700 rounded-lg flex items-center justify-center active:scale-90 transition-transform">
                  <Plus size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Suggested destinations */}
            <p className="text-xs text-gray-400 mb-2">Popular destinations:</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {packages.slice(0, 6).map(p => (
                <button
                  key={p.id}
                  onClick={() => setDestination(p.destination)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    destination === p.destination ? 'bg-brand-700 text-white' : 'bg-white text-gray-600 card-shadow'
                  }`}
                >
                  {p.destination}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!destination}
              className="w-full bg-brand-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform disabled:opacity-40"
            >
              Generate Itinerary
            </button>
          </>
        )}

        {generated && (
          <>
            <div className="bg-brand-50 rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-brand-700">{destination}</p>
                <p className="text-xs text-gray-500">{days} days · Custom plan</p>
              </div>
              <button onClick={() => setGenerated(false)} className="text-xs text-brand-600 font-medium">Edit</button>
            </div>

            <div className="space-y-3 mb-5">
              {itinerary.map(item => (
                <div key={item.day} className="bg-white rounded-2xl card-shadow p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{item.day}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 mb-1">{item.title}</p>
                      {editingDay === item.day ? (
                        <div>
                          <textarea
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            className="w-full text-xs text-gray-600 bg-gray-50 rounded-lg p-2 outline-none border border-brand-200 resize-none"
                            rows={3}
                          />
                          <button onClick={handleSaveEdit} className="text-xs text-brand-600 font-medium mt-1 flex items-center gap-1">
                            <Save size={12} /> Save
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                          <button onClick={() => handleEdit(item.day, item.desc)} className="text-xs text-brand-600 font-medium mt-1 flex items-center gap-1">
                            <Edit3 size={12} /> Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveTrip}
              className="w-full bg-brand-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <Check size={18} /> Save to My Trips
            </button>
          </>
        )}
      </div>
    </div>
  );
}
