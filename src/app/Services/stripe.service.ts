import { Injectable } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('your-public-key');
  }

  async makePayment(amount: number, currency: string) {
    try {
      const response = await fetch('http://localhost:8082/payments/create-payment-intent?amount=${totalAmount}&currency=${currency}`', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, currency })
      });
  
      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }
  
      const clientSecret = await response.text();
  
      // Confirm the payment with Stripe
      // ...
    } catch (error) {
      console.error('Error making payment:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  }
}

