import { useState } from 'react';
import { Package, formatPrice, CONTACT } from '@/data';
import { ChevronLeft, Calendar, Users, Minus, Plus, Check, Phone, MessageCircle } from 'lucide-react';
import { processPayment, generateBookingId } from '@/paymentService';

interface Props {
  pkg: Package;
  onBack: () => void;
  onConfirm: (booking: any) => void;
}

export default function Booking({ pkg, onBack, onConfirm }: Props) {
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'done'>('form');
  const [bookingId, setBookingId] = useState('');
  const [txnId, setTxnId] = useState('');

  const totalPrice = pkg.price * travelers;

  const handlePay = async () => {
    setStep('processing');
    const id = generateBookingId();
    setBookingId(id);
    const result = await processPayment({ amount: totalPrice, bookingId: id });
    setTxnId(result.transactionId);
    setStep('done');
    const booking = {
      id,
      pkgId: pkg.id,
      pkgName: pkg.name,
      destination: pkg.destination,
      date,
      travelers,
      total: totalPrice,
      txnId: result.transactionId,
      image: pkg.image,
      duration: pkg.duration,
    };
    setTimeout(() => onConfirm(booking), 2000);
  };

  if (step === 'done') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-scaleIn">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check size={40} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p className="text-sm text-gray-500 mb-1">Your booking ID</p>
        <p className="text-lg font-bold text-brand-700 mb-4">{bookingId}</p>
        <div className="bg-white rounded-2xl card-shadow p-4 w-full max-w-[300px] mb-4">
          <div className="flex gap-3">
            <img src={pkg.image} alt={pkg.destination} className="w-16 h-16 rounded-xl object-cover" />
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-gray-800">{pkg.name}</p>
              <p className="text-xs text-gray-400">{pkg.destination}</p>
              <p className="text-xs text-gray-500 mt-1">{date} · {travelers} travelers</p>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
            <span className="text-sm text-gray-500">Total Paid</span>
            <span className="text-sm font-bold text-brand-700">{formatPrice(totalPrice)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Txn: {txnId}</p>
        </div>
        <p className="text-xs text-gray-400">We'll contact you shortly to confirm details.</p>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-700 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-gray-600">Processing payment...</p>
        <p className="text-xs text-gray-400 mt-1">Test mode — no real charge</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 px-4 py-2">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center card-shadow active:scale-90 transition-transform">
          <ChevronLeft size={20} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Book Your Trip</h1>
      </div>

      <div className="px-4 mt-2">
        {/* Package Summary */}
        <div className="bg-white rounded-2xl card-shadow p-3 flex gap-3 mb-4">
          <img src={pkg.image} alt={pkg.destination} className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">{pkg.name}</p>
            <p className="text-xs text-gray-400">{pkg.destination} · {pkg.duration}</p>
            <p className="text-brand-700 font-bold mt-1">{formatPrice(pkg.price)}<span className="text-xs font-normal text-gray-400"> /person</span></p>
          </div>
        </div>

        {step === 'form' && (
          <>
            {/* Date Selection */}
            <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-brand-600" /> Travel Date
            </h2>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-white rounded-xl card-shadow px-4 py-3 text-sm text-gray-700 outline-none mb-4"
            />

            {/* Travelers */}
            <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Users size={16} className="text-brand-600" /> Travelers
            </h2>
            <div className="bg-white rounded-xl card-shadow px-4 py-3 flex items-center justify-between mb-4">
              <span className="text-sm text-gray-700">Number of travelers</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>
                <span className="text-sm font-bold text-gray-800 w-6 text-center">{travelers}</span>
                <button
                  onClick={() => setTravelers(Math.min(10, travelers + 1))}
                  className="w-9 h-9 bg-brand-700 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl card-shadow p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">{formatPrice(pkg.price)} × {travelers}</span>
                <span className="text-sm text-gray-700">{formatPrice(totalPrice)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between">
                <span className="text-sm font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold text-brand-700">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('payment')}
              disabled={!date}
              className="w-full bg-brand-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform disabled:opacity-40"
            >
              Continue to Payment
            </button>
          </>
        )}

        {step === 'payment' && (
          <>
            <div className="bg-white rounded-2xl card-shadow p-4 mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Payment Method</p>
              <div className="border-2 border-brand-700 rounded-xl p-3 flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center">
                  <span className="text-brand-700 font-bold text-xs">TEST</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Test Payment</p>
                  <p className="text-xs text-gray-400">No real charge — mock mode</p>
                </div>
                <Check size={18} className="text-brand-700" />
              </div>
              <div className="bg-amber-50 rounded-lg p-3 mb-3">
                <p className="text-xs text-amber-700">This is a test payment screen. No real transaction will occur. Replace with a real payment gateway for production.</p>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Amount to pay</span>
                <span className="text-sm font-bold text-brand-700">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <a href={`tel:${CONTACT.phoneDial}`} className="flex-1 bg-white rounded-xl card-shadow py-3 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Phone size={16} className="text-brand-700" />
                <span className="text-xs font-medium text-gray-700">Call</span>
              </a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" className="flex-1 bg-white rounded-xl card-shadow py-3 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <MessageCircle size={16} className="text-brand-700" />
                <span className="text-xs font-medium text-gray-700">WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handlePay}
              className="w-full bg-brand-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform"
            >
              Pay {formatPrice(totalPrice)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
