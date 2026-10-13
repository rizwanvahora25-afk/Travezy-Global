# Travezy Global — Mobile App (PWA)

Women-led travel company app for Mumbai-based Travezy Global. Tagline: "Your journey is our passion".

## Stack
React + Vite + TypeScript + Tailwind CSS. LocalStorage for persistence. No backend.

## Structure
- `src/data.ts` — packages, testimonials, categories, contact info
- `src/aiService.ts` — rule-based AI recommendations & chat (replace with real AI API)
- `src/paymentService.ts` — mock payment (replace with Stripe/Razorpay)
- `src/screens/` — Home, Explore, PackageDetail, Booking, Planner, AIPlanner, Trips, Profile
- `src/App.tsx` — navigation, splash, bottom tab bar

## How to Scale & Maintain
1. **Add packages**: edit `src/data.ts` — add to the `packages` array
2. **Real AI**: replace functions in `src/aiService.ts` with OpenAI/Gemini API calls
3. **Real payments**: replace `processPayment()` in `src/paymentService.ts` with Stripe/Razorpay
4. **Backend**: connect Supabase for auth, bookings sync, and admin dashboard
5. **Push notifications**: add a service worker with web push API
