// Payment Service — mock/test mode. Replace with real Stripe/Razorpay API later.
// To scale: swap processPayment() with a real gateway integration.

export interface PaymentRequest {
  amount: number;
  bookingId: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  bookingId: string;
}

export async function processPayment(req: PaymentRequest): Promise<PaymentResult> {
  // Simulate API call delay
  await new Promise(r => setTimeout(r, 1500));
  return {
    success: true,
    transactionId: 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase(),
    bookingId: req.bookingId,
  };
}

export function generateBookingId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  return 'TG-' + ts + '-' + rnd;
}
