// AI Service — rule-based recommendations. Replace with real AI API later.
// To scale: swap the functions below with calls to OpenAI / Gemini / etc.

import { packages, Package } from './data';

export interface UserPreferences {
  budget: 'low' | 'medium' | 'high';
  interests: string[];
  travelerType: 'solo' | 'couple' | 'family' | 'friends';
}

export function getRecommendations(prefs: UserPreferences): Package[] {
  let scored = packages.map(pkg => {
    let score = 0;
    if (prefs.budget === 'low' && pkg.price <= 40000) score += 3;
    if (prefs.budget === 'medium' && pkg.price > 35000 && pkg.price <= 70000) score += 3;
    if (prefs.budget === 'high' && pkg.price > 60000) score += 3;
    prefs.interests.forEach(tag => {
      if (pkg.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))) score += 2;
    });
    if (prefs.travelerType === 'couple' && pkg.tags.includes('Romantic')) score += 2;
    if (prefs.travelerType === 'family' && pkg.tags.includes('Family')) score += 2;
    if (prefs.travelerType === 'solo' && pkg.tags.includes('Adventure')) score += 1;
    score += pkg.rating * 0.5;
    return { pkg, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 4).map(s => s.pkg);
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  packages?: Package[];
}

export function getAIReply(userText: string, history: ChatMessage[] = []): ChatMessage {
  const q = userText.toLowerCase();

  const destinationMatch = packages.find(pkg => {
    const terms = [pkg.destination, pkg.id, pkg.name].map(value => value.toLowerCase());
    return terms.some(term => q.includes(term));
  });
  if (destinationMatch) {
    return {
      role: 'bot',
      text: `${destinationMatch.name} is a ${destinationMatch.duration} ${destinationMatch.region.toLowerCase()} package from ${formatPrice(destinationMatch.price)} per person. It includes ${destinationMatch.inclusions.join(', ').toLowerCase()}. Would you like help with the itinerary, inclusions, or planning around your dates?`,
      packages: [destinationMatch],
    };
  }

  if (/\b(hi|hello|hey|good morning|good evening)\b/.test(q)) {
    return {
      role: 'bot',
      text: 'Hello! I’m your Travezy travel planner. Tell me where you’d like to go, your approximate budget, or the kind of trip you have in mind, and I’ll suggest options from our packages.',
    };
  }

  if (/\b(visa|document|passport)\b/.test(q)) {
    return {
      role: 'bot',
      text: 'We provide visa assistance with our international packages, and the exact documents depend on your destination and travel dates. Which country are you considering? I can check whether it’s in our packages.',
    };
  }

  if (/\b(flight|airfare|air ticket|tickets)\b/.test(q)) {
    return {
      role: 'bot',
      text: 'We can help with flight bookings. Fares depend on your departure city and dates. Share those details, or contact our travel team for a quote.',
    };
  }

  if (/\b(forex|currency exchange|travel insurance|corporate|mice|business trip|team offsite)\b/.test(q)) {
    return {
      role: 'bot',
      text: `Our team can help with ${/\b(forex|currency exchange)\b/.test(q) ? 'forex' : /\b(travel insurance)\b/.test(q) ? 'travel insurance' : 'corporate and MICE travel'}. Tell me a little about what you need, or speak directly with an advisor.`,
    };
  }

  if (/\b(call|phone|whatsapp|human|agent|advisor|person|speak to|talk to|contact|book now)\b/.test(q)) {
    return {
      role: 'bot',
      text: 'Of course — our travel team can help with a personalised quote and booking details.',
    };
  }

  const recentUserText = history
    .filter(message => message.role === 'user')
    .slice(-4)
    .map(message => message.text.toLowerCase())
    .join(' ');
  const context = `${recentUserText} ${q}`;
  const budgetMatch = q.match(/(?:under|below|within|max(?:imum)?(?: budget)?(?: of)?|budget(?: of)?|₹|rs\.?)\s*₹?\s*(\d+(?:,\d{3})*|\d+(?:\.\d+)?)\s*(k|thousand)?/i)
    || q.match(/(\d+(?:\.\d+)?)\s*(k|thousand)\b/i);
  let budget: number | undefined;
  if (budgetMatch) {
    const amount = Number(budgetMatch[1].replace(/,/g, ''));
    budget = Math.round(amount * (/^(k|thousand)$/i.test(budgetMatch[2] || '') ? 1000 : 1));
  } else if (/\b(budget|cheap|afford|low.cost|value for money)\b/.test(q)) {
    budget = 40000;
  }

  const preferenceGroups: { terms: RegExp; tags: string[]; label: string }[] = [
    { terms: /\b(beach|island|sea|coast)\b/, tags: ['beach'], label: 'beach' },
    { terms: /\b(mountain|mountains|adventure|trek|hiking)\b/, tags: ['mountains', 'adventure'], label: 'mountain and adventure' },
    { terms: /\b(romantic|honeymoon|couple)\b/, tags: ['romantic'], label: 'romantic' },
    { terms: /\b(family|families|kids|children)\b/, tags: ['family'], label: 'family-friendly' },
    { terms: /\b(culture|cultural|history|sightseeing)\b/, tags: ['culture'], label: 'culture and sightseeing' },
    { terms: /\b(nature|relax|relaxation|scenic)\b/, tags: ['nature', 'relaxation', 'scenic'], label: 'nature and relaxation' },
  ];
  const preference = preferenceGroups.find(group => group.terms.test(context));
  let recommendations = packages.filter(pkg =>
    (!budget || pkg.price <= budget) &&
    (!preference || preference.tags.some(tag => pkg.tags.some(pkgTag => pkgTag.toLowerCase().includes(tag)))),
  );

  if (recommendations.length) {
    recommendations = recommendations
      .sort((a, b) => a.price - b.price || b.rating - a.rating)
      .slice(0, 3);
    const preferenceText = preference ? `${preference.label} ` : '';
    const budgetText = budget ? ` within ${formatPrice(budget)} per person` : '';
    return {
      role: 'bot',
      text: `Based on what you’ve shared, here are a few ${preferenceText}ideas${budgetText}. Prices shown are package prices per person; tell me your travel month and group size and I can help narrow them down.`,
      packages: recommendations,
    };
  }

  if (budget || preference) {
    return {
      role: 'bot',
      text: `I couldn’t find a listed package matching those exact preferences${budget ? ` under ${formatPrice(budget)}` : ''}. If you can be flexible on budget or trip style, I can suggest the closest options. You can also ask our advisor about a tailor-made trip.`,
    };
  }

  if (/\b(plan|planning|trip|travel|destination|recommend|suggest|where|ideas)\b/.test(q)) {
    return {
      role: 'bot',
      text: 'I’d love to help you plan. What’s your approximate budget per person, when are you hoping to travel, and are you travelling solo, as a couple, with family, or with friends?',
    };
  }

  return {
    role: 'bot',
    text: 'I can help compare our destinations, package prices and durations, visa assistance, or flight bookings. What kind of trip are you hoping for? A budget, destination, or travel style is a great place to start.',
  };
}

export const quickReplies = [
  'Beach trip under ₹70,000',
  'Budget trips under ₹40,000',
  'Romantic getaway',
  'Family-friendly trips',
  'Help me plan a trip',
  'Visa information',
];

function formatPrice(n: number): string {
  return '₹ ' + n.toLocaleString('en-IN');
}
