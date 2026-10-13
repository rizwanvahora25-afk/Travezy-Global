import { useState, useRef, useEffect } from 'react';
import { packages, formatPrice, Package, CONTACT } from '@/data';
import { getRecommendations, getAIReply, quickReplies, UserPreferences, ChatMessage } from '@/aiService';
import { MessageCircle, Phone, Send, Sparkles, Star, ChevronRight, RotateCcw } from 'lucide-react';

interface Props {
  onPackage: (pkg: Package) => void;
}

export default function AIPlanner({ onPackage }: Props) {
  const [mode, setMode] = useState<'quiz' | 'chat'>('quiz');
  const [prefs, setPrefs] = useState<UserPreferences>({ budget: 'medium', interests: [], travelerType: 'couple' });
  const [results, setResults] = useState<Package[] | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Hello! I’m your Travezy travel planner. Tell me where you’d like to go, your approximate budget, or the kind of trip you have in mind, and I’ll suggest options from our packages.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  useEffect(() => () => {
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
  }, []);

  const interestOptions = ['Beach', 'Mountain', 'Romantic', 'Adventure', 'Culture', 'Family', 'Luxury', 'Nature'];

  const toggleInterest = (tag: string) => {
    setPrefs(p => ({
      ...p,
      interests: p.interests.includes(tag)
        ? p.interests.filter(t => t !== tag)
        : [...p.interests, tag],
    }));
  };

  const handleGetRecs = () => {
    setResults(getRecommendations(prefs));
  };

  const handleSend = (text: string) => {
    const msg = text.trim();
    if (!msg || isTyping) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setIsTyping(true);
    replyTimerRef.current = setTimeout(() => {
      setMessages(prev => [...prev, getAIReply(msg, prev)]);
      setIsTyping(false);
      replyTimerRef.current = null;
    }, 700);
  };

  return (
    <div className="h-full min-h-0 pb-4 flex flex-col">
      {/* Mode Toggle */}
      <div className="px-4 pt-2 pb-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">AI Travel Planner</h1>
        <div className="bg-gray-100 rounded-xl p-1 flex">
          <button
            onClick={() => setMode('quiz')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'quiz' ? 'bg-white text-brand-700 card-shadow' : 'text-gray-500'}`}
          >
            Preferences Quiz
          </button>
          <button
            onClick={() => setMode('chat')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'chat' ? 'bg-white text-brand-700 card-shadow' : 'text-gray-500'}`}
          >
            AI Chat
          </button>
        </div>
      </div>

      {mode === 'quiz' && (
        <div className="px-4 flex-1">
          {/* Budget */}
          <div className="bg-white rounded-2xl card-shadow p-4 mb-3">
            <p className="text-sm font-semibold text-gray-800 mb-3">What's your budget?</p>
            <div className="space-y-2">
              {[
                { v: 'low', l: 'Budget — Under ₹40,000' },
                { v: 'medium', l: 'Mid-range — ₹40K to ₹70K' },
                { v: 'high', l: 'Luxury — Above ₹70,000' },
              ].map(b => (
                <button
                  key={b.v}
                  onClick={() => setPrefs(p => ({ ...p, budget: b.v as any }))}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    prefs.budget === b.v ? 'bg-brand-700 text-white' : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {b.l}
                </button>
              ))}
            </div>
          </div>

          {/* Traveler Type */}
          <div className="bg-white rounded-2xl card-shadow p-4 mb-3">
            <p className="text-sm font-semibold text-gray-800 mb-3">Traveler type?</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { v: 'solo', l: 'Solo' },
                { v: 'couple', l: 'Couple' },
                { v: 'family', l: 'Family' },
                { v: 'friends', l: 'Friends' },
              ].map(t => (
                <button
                  key={t.v}
                  onClick={() => setPrefs(p => ({ ...p, travelerType: t.v as any }))}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    prefs.travelerType === t.v ? 'bg-brand-700 text-white' : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {t.l}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-2xl card-shadow p-4 mb-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Your interests</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    prefs.interests.includes(tag) ? 'bg-brand-700 text-white' : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGetRecs}
            className="w-full bg-brand-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles size={18} /> Get Recommendations
          </button>

          {results && (
            <div className="animate-slideUp">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">Recommended for You</h2>
                <button onClick={() => setResults(null)} className="text-xs text-gray-400 flex items-center gap-1">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
              <div className="space-y-3">
                {results.map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => onPackage(pkg)}
                    className="w-full bg-white rounded-2xl card-shadow overflow-hidden flex active:scale-95 transition-transform text-left"
                  >
                    <img src={pkg.image} alt={pkg.destination} className="w-[110px] h-[90px] object-cover flex-shrink-0" />
                    <div className="flex-1 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white bg-brand-700 rounded-full px-2 py-0.5">{pkg.duration}</span>
                        <div className="flex items-center gap-0.5">
                          <Star size={11} className="text-accent-500 fill-accent-500" />
                          <span className="text-xs font-semibold text-gray-600">{pkg.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{pkg.name}</p>
                      <p className="text-xs text-gray-400">{pkg.destination}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-brand-700 font-bold text-sm">{formatPrice(pkg.price)}</span>
                        <ChevronRight size={16} className="text-gray-300" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'chat' && (
        <div className="flex-1 min-h-[280px] flex flex-col px-4">
          <div ref={messagesContainerRef} className="flex-1 min-h-0 overflow-y-auto space-y-3 mb-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideInRight`}>
                <div className="max-w-[90%]">
                  <div className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.role === 'user' ? 'bg-brand-700 text-white rounded-br-md' : 'bg-white text-gray-700 card-shadow rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.packages?.map(pkg => (
                    <button
                      key={pkg.id}
                      onClick={() => onPackage(pkg)}
                      className="mt-2 w-full bg-white rounded-xl card-shadow overflow-hidden flex text-left active:scale-[0.98] transition-transform"
                    >
                      <img src={pkg.image} alt={pkg.destination} className="w-20 h-20 object-cover flex-shrink-0" />
                      <span className="flex-1 min-w-0 p-2.5">
                        <span className="block text-sm font-semibold text-gray-800 truncate">{pkg.name}</span>
                        <span className="block text-xs text-gray-500">{pkg.duration} · {pkg.region}</span>
                        <span className="block mt-1 text-sm font-bold text-brand-700">{formatPrice(pkg.price)} <span className="text-[10px] font-normal text-gray-400">per person</span></span>
                      </span>
                      <ChevronRight size={18} className="self-center mr-2 text-gray-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start" role="status" aria-label="Travel planner is preparing a reply">
                <div className="bg-white text-gray-500 card-shadow rounded-2xl rounded-bl-md px-4 py-3 text-sm">
                  Finding the best options for you…
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
            {quickReplies.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="bg-white text-brand-700 text-xs font-medium px-3 py-2 rounded-full whitespace-nowrap card-shadow active:scale-95 transition-transform"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 mb-2 safe-bottom">
            <div className="flex-1 bg-white rounded-xl card-shadow flex items-center px-4 py-2.5">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !isTyping && handleSend(input)}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={() => handleSend(input)}
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              className="w-11 h-11 bg-brand-700 rounded-xl flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-5 pb-2">
            <a href={`tel:${CONTACT.phoneDial}`} className="flex items-center gap-1.5 text-xs font-medium text-brand-700">
              <Phone size={14} /> Call an advisor
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-brand-700"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
