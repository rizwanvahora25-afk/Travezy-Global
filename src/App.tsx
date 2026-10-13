import { useState, useEffect } from 'react';
import { Package, CONTACT } from '@/data';
import { Home as HomeIcon, Compass, Plane, Sparkles, User } from 'lucide-react';
import Home from '@/screens/Home';
import Explore from '@/screens/Explore';
import PackageDetail from '@/screens/PackageDetail';
import Booking from '@/screens/Booking';
import Planner from '@/screens/Planner';
import AIPlanner from '@/screens/AIPlanner';
import Trips from '@/screens/Trips';
import Profile from '@/screens/Profile';

type Tab = 'home' | 'explore' | 'trips' | 'ai' | 'profile';
type Screen = 'tab' | 'packageDetail' | 'booking' | 'planner';

interface NavState {
  screen: Screen;
  tab: Tab;
  selectedPkg: Package | null;
  exploreSearch: string;
  exploreCategory: string;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [nav, setNav] = useState<NavState>({
    screen: 'tab',
    tab: 'home',
    selectedPkg: null,
    exploreSearch: '',
    exploreCategory: '',
  });

  const [bookings, setBookings] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('tg_bookings') || '[]'); } catch { return []; }
  });
  const [plannerTrips, setPlannerTrips] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('tg_planner_trips') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('tg_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tg_planner_trips', JSON.stringify(plannerTrips));
  }, [plannerTrips]);

  const setTab = (tab: Tab) => setNav(prev => ({ ...prev, screen: 'tab', tab }));

  const openPackage = (pkg: Package) => setNav(prev => ({ ...prev, screen: 'packageDetail', selectedPkg: pkg }));
  const openBooking = () => setNav(prev => ({ ...prev, screen: 'booking' }));
  const openPlanner = () => setNav(prev => ({ ...prev, screen: 'planner' }));
  const openAI = () => setNav(prev => ({ ...prev, screen: 'tab', tab: 'ai' }));
  const backToTab = () => setNav(prev => ({ ...prev, screen: 'tab' }));
  const backToDetail = () => setNav(prev => ({ ...prev, screen: 'packageDetail' }));

  const goToExplore = (search = '', category = '') =>
    setNav(prev => ({ ...prev, screen: 'tab', tab: 'explore', exploreSearch: search, exploreCategory: category }));

  const handleSearch = (q: string) => goToExplore(q, '');
  const handleCategory = (cat: string) => {
    if (cat === 'India' || cat === 'International') {
      goToExplore('', cat === 'India' ? 'India' : 'International');
    } else {
      goToExplore('', cat);
    }
  };

  const handleBookingConfirm = (booking: any) => {
    setBookings(prev => [booking, ...prev]);
    setNav(prev => ({ ...prev, screen: 'tab', tab: 'trips' }));
  };

  const handleSaveTrip = (trip: any) => {
    setPlannerTrips(prev => [trip, ...prev]);
  };

  const tabs: { id: Tab; icon: any; label: string }[] = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'trips', icon: Plane, label: 'Trips' },
    { id: 'ai', icon: Sparkles, label: 'AI Planner' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  if (showSplash) {
    return (
      <div className="min-h-screen bg-brand-700 flex flex-col items-center justify-center">
        <div className="animate-splash">
          <img src={CONTACT.logo} alt="Travezy Global" className="w-28 h-28 bg-white rounded-2xl p-2 object-contain mb-4" />
        </div>
        <h1 className="text-white text-2xl font-bold animate-fadeIn">Travezy Global</h1>
        <p className="text-white/60 text-sm mt-1 animate-fadeIn">Your journey is our passion</p>
        <div className="absolute bottom-12 flex gap-1.5">
          {[0,1,2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-sand-50 flex justify-center overflow-hidden">
      <div className="h-full w-full max-w-[480px] bg-sand-50 relative flex flex-col overflow-hidden shadow-2xl">
        {/* Status bar spacer */}
        <div className="h-[env(safe-area-inset-top)] bg-white flex-shrink-0" />

        {/* Header */}
        {nav.screen === 'tab' && (
          <div className="z-30 bg-white border-b border-gray-50 px-4 py-1.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <img src={CONTACT.logo} alt="Travezy Global" className="w-[88px] h-11 object-contain" />
              <p className="text-[10px] text-gray-400 leading-tight">Your journey is our passion</p>
            </div>
            <a href={`tel:${CONTACT.phoneDial}`} className="w-9 h-9 bg-brand-50 rounded-full flex items-center justify-center active:scale-90 transition-transform">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-700">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        )}

        {/* Content */}
        <div className="animate-fadeIn flex-1 min-h-0 overflow-y-auto overscroll-contain" key={nav.screen + nav.tab}>
          {nav.screen === 'tab' && nav.tab === 'home' && (
            <Home
              onSearch={handleSearch}
              onCategory={handleCategory}
              onPackage={openPackage}
              onPlanner={openPlanner}
              onAI={openAI}
              onExplore={() => goToExplore()}
            />
          )}
          {nav.screen === 'tab' && nav.tab === 'explore' && (
            <Explore
              onPackage={openPackage}
              initialSearch={nav.exploreSearch}
              initialCategory={nav.exploreCategory}
            />
          )}
          {nav.screen === 'tab' && nav.tab === 'trips' && (
            <Trips
              bookings={bookings}
              plannerTrips={plannerTrips}
              onDeleteBooking={id => setBookings(prev => prev.filter(b => b.id !== id))}
              onDeleteTrip={id => setPlannerTrips(prev => prev.filter(t => t.id !== id))}
              onExplore={() => goToExplore()}
              onPlanner={openPlanner}
            />
          )}
          {nav.screen === 'tab' && nav.tab === 'ai' && (
            <AIPlanner onPackage={openPackage} />
          )}
          {nav.screen === 'tab' && nav.tab === 'profile' && (
            <Profile
              bookings={bookings}
              plannerTrips={plannerTrips}
              onDeleteBooking={id => setBookings(prev => prev.filter(b => b.id !== id))}
              onDeleteTrip={id => setPlannerTrips(prev => prev.filter(t => t.id !== id))}
              onExplore={() => goToExplore()}
            />
          )}
          {nav.screen === 'packageDetail' && nav.selectedPkg && (
            <PackageDetail pkg={nav.selectedPkg} onBack={backToTab} onBook={openBooking} />
          )}
          {nav.screen === 'booking' && nav.selectedPkg && (
            <Booking pkg={nav.selectedPkg} onBack={backToDetail} onConfirm={handleBookingConfirm} />
          )}
          {nav.screen === 'planner' && (
            <Planner onBack={backToTab} onSave={handleSaveTrip} onPackage={openPackage} />
          )}
        </div>

        {/* Bottom Tab Bar */}
        {nav.screen === 'tab' && (
          <div className="z-30 bg-white border-t border-gray-100 px-2 py-1.5 safe-bottom flex-shrink-0">
            <div className="flex items-center justify-around">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const active = nav.tab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className="flex flex-col items-center gap-0.5 py-1.5 px-3 active:scale-90 transition-transform"
                  >
                    <Icon
                      size={22}
                      className={active ? 'text-brand-700' : 'text-gray-300'}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    <span className={`text-[10px] font-medium ${active ? 'text-brand-700' : 'text-gray-400'}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
