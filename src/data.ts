export interface Package {
  id: string;
  name: string;
  destination: string;
  region: 'India' | 'International';
  duration: string;
  nights: number;
  days: number;
  price: number;
  image: string;
  inclusions: string[];
  itinerary: { day: number; title: string; desc: string }[];
  rating: number;
  tags: string[];
}

export const packages: Package[] = [
  {
    id: 'singapore',
    name: 'I ❤ Singapore',
    destination: 'Singapore',
    region: 'International',
    duration: '4N / 5D',
    nights: 4, days: 5,
    price: 49000,
    image: 'https://images.pexels.com/photos/18662417/pexels-photo-18662417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    tags: ['City', 'Family', 'Shopping'],
    inclusions: ['Flights', 'Stay 4★', 'Transfers', 'Sightseeing', 'Visa'],
    itinerary: [
      { day: 1, title: 'Arrival in Singapore', desc: 'Airport transfer, check-in at 4★ hotel. Evening at leisure to explore the neighbourhood.' },
      { day: 2, title: 'City Tour + Gardens by the Bay', desc: 'Half-day city tour covering Merlion, Marina Bay Sands, and the iconic Supertree Grove.' },
      { day: 3, title: 'Universal Studios', desc: 'Full day at Sentosa Island — Universal Studios, S.E.A. Aquarium, and beach time.' },
      { day: 4, title: 'Jurong Bird Park & Shopping', desc: 'Morning at Jurong Bird Park. Afternoon free for shopping at Orchard Road.' },
      { day: 5, title: 'Departure', desc: 'Breakfast, check-out, and transfer to the airport for your flight home.' },
    ],
  },
  {
    id: 'mauritius',
    name: 'Sugar Beaches of Mauritius',
    destination: 'Mauritius',
    region: 'International',
    duration: '6N / 7D',
    nights: 6, days: 7,
    price: 59000,
    image: 'https://images.pexels.com/photos/11605881/pexels-photo-11605881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    tags: ['Beach', 'Romantic', 'Luxury'],
    inclusions: ['Flights', 'Stay 4★', 'Meals', 'Transfers', 'Sightseeing', 'Visa'],
    itinerary: [
      { day: 1, title: 'Arrival Mauritius', desc: 'Welcome to paradise! Transfer to your beach resort, evening at leisure.' },
      { day: 2, title: 'North Island Tour', desc: 'Visit Port Louis, Caudan Waterfront, and the Citadel for panoramic views.' },
      { day: 3, title: 'Ile aux Cerfs', desc: 'Speed boat to Ile aux Cerfs — water sports, parasailing, and crystal-clear lagoons.' },
      { day: 4, title: 'South Island Tour', desc: 'Seven Coloured Earth, Chamarel Waterfall, and Black River Gorges National Park.' },
      { day: 5, title: 'Casela Nature Park', desc: 'Interaction with lions, zipline, and safari. Afternoon free at the beach.' },
      { day: 6, title: 'Free Day', desc: 'Enjoy the resort — spa, beach, snorkelling, or optional catamaran cruise.' },
      { day: 7, title: 'Departure', desc: 'Breakfast, check-out, and airport transfer.' },
    ],
  },
  {
    id: 'maldives',
    name: 'Maldives Luxury Sojourn',
    destination: 'Maldives',
    region: 'International',
    duration: '3N / 4D',
    nights: 3, days: 4,
    price: 60000,
    image: 'https://images.pexels.com/photos/9394311/pexels-photo-9394311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    tags: ['Beach', 'Romantic', 'Luxury'],
    inclusions: ['Flights', 'Stay 4★', 'Meals', 'Transfers', 'Sightseeing', 'Visa'],
    itinerary: [
      { day: 1, title: 'Arrival & Speedboat Transfer', desc: 'Speedboat transfer to your overwater villa. Welcome drinks and sunset view.' },
      { day: 2, title: 'Snorkelling & Dolphin Cruise', desc: 'Morning reef snorkelling. Evening dolphin-spotting sunset cruise.' },
      { day: 3, title: 'Island Hopping & Spa', desc: 'Visit a local island. Optional couples spa treatment. Candlelight dinner.' },
      { day: 4, title: 'Departure', desc: 'Breakfast, speedboat to airport, fly home.' },
    ],
  },
  {
    id: 'srilanka',
    name: 'InstaPlans @ Sri Lanka',
    destination: 'Sri Lanka',
    region: 'International',
    duration: '4N / 5D',
    nights: 4, days: 5,
    price: 35000,
    image: 'https://images.pexels.com/photos/5656452/pexels-photo-5656452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    tags: ['Culture', 'Nature', 'Budget'],
    inclusions: ['Flights', 'Stay 4★', 'Transfers', 'Sightseeing', 'Visa'],
    itinerary: [
      { day: 1, title: 'Arrival Colombo', desc: 'Transfer to hotel. Evening Galle Face Green promenade walk.' },
      { day: 2, title: 'Sigiriya Rock Fortress', desc: 'Climb the ancient Lion Rock — a UNESCO World Heritage site.' },
      { day: 3, title: 'Kandy & Temple of Tooth', desc: 'Visit the sacred Temple of the Tooth Relic, botanical gardens.' },
      { day: 4, title: 'Nuwara Eliya Tea Gardens', desc: 'Scenic drive through tea plantations. Waterfall stops and factory tour.' },
      { day: 5, title: 'Departure', desc: 'Return to Colombo, airport transfer.' },
    ],
  },
  {
    id: 'turkey',
    name: 'Flavours of Turkey',
    destination: 'Turkey',
    region: 'International',
    duration: '6N / 7D',
    nights: 6, days: 7,
    price: 85000,
    image: 'https://images.pexels.com/photos/27260270/pexels-photo-27260270.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    tags: ['Culture', 'Adventure', 'Photography'],
    inclusions: ['Flights', 'Stay', 'Transfers', 'Sightseeing'],
    itinerary: [
      { day: 1, title: 'Arrival Istanbul', desc: 'Check-in, evening Bosphorus cruise with dinner.' },
      { day: 2, title: 'Istanbul Old City', desc: 'Hagia Sophia, Blue Mosque, Hippodrome, and Grand Bazaar.' },
      { day: 3, title: 'Fly to Cappadocia', desc: 'Transfer to cave hotel. Sunset at Red Valley.' },
      { day: 4, title: 'Hot Air Balloon + Göreme', desc: 'Sunrise balloon ride. Göreme Open Air Museum and underground city.' },
      { day: 5, title: 'Fly to Pamukkale', desc: 'Travertine thermal pools and ancient Hierapolis ruins.' },
      { day: 6, title: 'Ephesus & Back to Istanbul', desc: 'Ancient city of Ephesus, Library of Celsus. Fly back to Istanbul.' },
      { day: 7, title: 'Departure', desc: 'Free morning, airport transfer.' },
    ],
  },
  {
    id: 'switzerland',
    name: 'All of Switzerland by Rail',
    destination: 'Switzerland',
    region: 'International',
    duration: '3N / 4D',
    nights: 3, days: 4,
    price: 49500,
    image: 'https://images.pexels.com/photos/7938364/pexels-photo-7938364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    tags: ['Mountains', 'Train', 'Scenic'],
    inclusions: ['Stay', 'Swiss Travel Pass', 'Attractions'],
    itinerary: [
      { day: 1, title: 'Arrival Zurich', desc: 'Train to Lucerne. Chapel Bridge, Lake Lucerne evening cruise.' },
      { day: 2, title: 'Mt. Titlis', desc: 'Rotair cable car to the summit. Glacier cave and cliff walk.' },
      { day: 3, title: 'Interlaken & Jungfrau', desc: 'Train to Interlaken. Top of Europe — Jungfraujoch glacier plateau.' },
      { day: 4, title: 'Departure', desc: 'Train to Zurich airport.' },
    ],
  },
  {
    id: 'leh',
    name: 'Rustic Leh-Ladakh',
    destination: 'Leh-Ladakh',
    region: 'India',
    duration: '6N / 7D',
    nights: 6, days: 7,
    price: 59000,
    image: 'https://images.pexels.com/photos/37839609/pexels-photo-37839609.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    tags: ['Mountains', 'Adventure', 'Road Trip'],
    inclusions: ['Stay', 'Transfers', 'Attractions'],
    itinerary: [
      { day: 1, title: 'Arrival Leh', desc: 'Acclimatization day. Light walk around Leh market.' },
      { day: 2, title: 'Shanti Stupa & Leh Palace', desc: 'Visit Shanti Stupa, Leh Palace, and monasteries.' },
      { day: 3, title: 'Nubra Valley via Khardung La', desc: 'Cross one of the highest motorable passes. Visit sand dunes at Hunder.' },
      { day: 4, title: 'Pangong Lake', desc: 'Drive to the stunning Pangong Tso — blue waters at 14,000 ft.' },
      { day: 5, title: 'Pangong to Leh', desc: 'Return to Leh via Chang La pass. Evening free.' },
      { day: 6, title: 'Sham Valley', desc: 'Visit Alchi Monastery, Magnetic Hill, and confluence of Indus & Zanskar.' },
      { day: 7, title: 'Departure', desc: 'Airport transfer.' },
    ],
  },
  {
    id: 'coorg',
    name: 'Coffee Lands of Coorg',
    destination: 'Coorg',
    region: 'India',
    duration: '3N / 4D',
    nights: 3, days: 4,
    price: 35000,
    image: 'https://images.pexels.com/photos/33046721/pexels-photo-33046721.png?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.4,
    tags: ['Nature', 'Relaxation', 'Budget'],
    inclusions: ['Stay', 'Transfers', 'Attractions'],
    itinerary: [
      { day: 1, title: 'Arrival Coorg', desc: 'Check-in at a coffee plantation resort. Nature walk and bonfire.' },
      { day: 2, title: 'Abbey Falls & Dubare', desc: 'Visit Abbey Falls. Elephant interaction at Dubare Elephant Camp.' },
      { day: 3, title: 'Raja Seat & Talacauvery', desc: 'Scenic viewpoints and the source of the River Cauvery.' },
      { day: 4, title: 'Departure', desc: 'Breakfast, check-out, and departure.' },
    ],
  },
  {
    id: 'greek',
    name: 'Greek Islands',
    destination: 'Greek Islands',
    region: 'International',
    duration: '6N / 7D',
    nights: 6, days: 7,
    price: 75000,
    image: 'https://images.pexels.com/photos/37844509/pexels-photo-37844509.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    tags: ['Beach', 'Romantic', 'Luxury'],
    inclusions: ['Stay', 'Transfers', 'Attractions'],
    itinerary: [
      { day: 1, title: 'Arrival Athens', desc: 'Check-in. Acropolis and Plaka old town evening walk.' },
      { day: 2, title: 'Ferry to Santorini', desc: 'Caldera views, Oia village sunset.' },
      { day: 3, title: 'Santorini', desc: 'Red Beach, Akrotiri ruins, wine tasting.' },
      { day: 4, title: 'Ferry to Mykonos', desc: 'Windmills, Little Venice, and beach clubs.' },
      { day: 5, title: 'Mykonos', desc: 'Delos island archaeological trip. Beach afternoon.' },
      { day: 6, title: 'Return to Athens', desc: 'Ferry back. Free evening for souvlaki and gyros.' },
      { day: 7, title: 'Departure', desc: 'Airport transfer.' },
    ],
  },
];

export interface Testimonial {
  name: string;
  destination: string;
  date: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  { name: 'Baquer Bengaliwala', destination: 'Sweden', date: 'March 2022', text: 'All transfers in Turkey were well in time. Very good overall experience. Travezy\'s sincere efforts made our trip memorable.' },
  { name: 'Dr Mitul Shah', destination: 'Spain, Europe', date: 'May 2023', text: 'I traveled solo to Paris and Travezy Global made it very simple. Fatema planned a great trip — from visa to bookings, everything was hassle-free.' },
  { name: 'Sangeeta Ray', destination: 'Multiple Trips', date: 'Since 2018', text: 'Fatema is the most responsive, knowledgeable and personable travel advisor. We have traveled the world with complete confidence having her advise us.' },
  { name: 'Ankita & Manish Jain', destination: 'Finland', date: 'Sep 2023', text: 'From dreamy accommodations to Santa Village, everything was fabulously planned. Their services are bang on!' },
  { name: 'Habiba Lokhandwala', destination: 'Kashmir, India', date: 'June 2023', text: 'Tasneem took care of every detail from tickets to stay — a memorable experience for all of us.' },
  { name: 'Dr Ankur Mehta', destination: 'Malaysia', date: 'May 2023', text: 'Malaysia trip was memorable. Services regarding pickup, guides, meals, hotels and sightseeing were as promised.' },
  { name: 'Alifya & Freoz Contractor', destination: 'Vietnam', date: 'May 2023', text: 'Every detail was taken care of. Airport transfers, hotel reservations, and excursions were all perfectly organized.' },
  { name: 'Akshit & Trupti Ramani', destination: 'Switzerland Honeymoon', date: 'Sep 2022', text: 'The itinerary was perfectly tailored to our interests. We will cherish these memories for a lifetime.' },
  { name: 'Tofiq Porbandarwala', destination: 'Scotland-London UK', date: 'July 2023', text: 'Fatema handled our entire trip from flight to rental car to hotel to shows. Highly recommended!' },
];

export const quickCategories = [
  { label: 'India', icon: 'MapPin', filter: 'India' },
  { label: 'International', icon: 'Globe', filter: 'International' },
  { label: 'Corporate', icon: 'Briefcase', filter: 'Corporate' },
  { label: 'Flights', icon: 'Plane', filter: 'Flights' },
  { label: 'Visa', icon: 'FileText', filter: 'Visa' },
  { label: 'Forex', icon: 'Coins', filter: 'Forex' },
];

export const services = [
  { name: 'Flight Bookings', icon: 'Plane' },
  { name: 'Visa', icon: 'FileText' },
  { name: 'Travel Insurance', icon: 'ShieldCheck' },
  { name: 'Travel Consultancy', icon: 'Compass' },
  { name: 'Forex', icon: 'Coins' },
  { name: 'Corporate / MICE', icon: 'Briefcase' },
];

export const CONTACT = {
  phone: '+91 98679 53344',
  phoneDial: '+919867953344',
  whatsapp: '919867953344',
  email: 'info@travezyglobal.com',
  address: 'Ground Floor, Park View, Sant Savita Marg 2, Opp Masina Hospital, Byculla (E), Mumbai 400027',
  logo: '/travezy-logo.png',
};

export function formatPrice(n: number): string {
  return '₹ ' + n.toLocaleString('en-IN');
}
