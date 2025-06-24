import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ChapaCheckout?: any;
  }
}

const BookingChapaCheckoutPage: React.FC = () => {
  const { state } = useLocation();
  const amount = state?.total?.toFixed(2) || '0.00';
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!document.querySelector('script[src="https://js.chapa.co/v1/inline.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.chapa.co/v1/inline.js';
      script.async = true;
      script.onload = () => setIsReady(true);
      script.onerror = () => console.error('Failed to load Chapa script');
      document.body.appendChild(script);
    } else {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (isReady && window.ChapaCheckout) {
      const chapa = new window.ChapaCheckout({
        publicKey: 'CHAPUBK_TEST-qqoOdCqwaSIlrAJ8loItqp4F6gDvTCou',
        amount,
        currency: 'ETB',
        availablePaymentMethods: ['telebirr', 'cbebirr', 'ebirr', 'mpesa', 'chapa'],
        customizations: {
          buttonText: 'Pay Now',
          styles: `
            .chapa-pay-button {
              background-color: #2D6A4F;
              color: white;
              font-weight: 600;
              font-size: 16px;
              padding: 12px 24px;
              border-radius: 6px;
              transition: background 0.3s ease;
            }
            .chapa-pay-button:hover {
              background-color: #1B4332;
            }
          `,
        },
        callbackUrl: 'https://yourdomain.com/callback',
        returnUrl: 'http://localhost:8080/booking-success',
        onSuccessfulPayment: (res: any) => console.log('Payment successful:', res),
        onPaymentFailure: (res: any) => console.error('Payment failed:', res),
        onClose: () => console.log('Checkout closed'),
      });

      chapa.initialize('chapa-inline-form');
    }
  }, [isReady, amount]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.header}>Zenbil Payment Portal</h2>
        <p style={styles.description}>You're about to complete a purchase using Chapa.</p>
        <div style={styles.amountBox}>
          <span style={styles.currency}>ETB</span>
          <span style={styles.amount}>{amount}</span>
        </div>
        {!isReady && <p style={styles.loading}>Loading payment interface...</p>}
        <div id="chapa-inline-form" style={styles.paymentSection} />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: '#f7f8fa',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    maxWidth: 420,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
    padding: 32,
    textAlign: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    fontSize: 24,
    fontWeight: 700,
    color: '#222',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  amountBox: {
    backgroundColor: '#e6f4ea',
    borderRadius: 8,
    padding: '16px 24px',
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 20,
  },
  currency: {
    fontSize: 18,
    fontWeight: 600,
    color: '#2D6A4F',
  },
  amount: {
    fontSize: 28,
    fontWeight: 700,
    color: '#2D6A4F',
  },
  loading: {
    color: '#aaa',
    marginBottom: 16,
  },
  paymentSection: {
    marginTop: 12,
  },
};

export default BookingChapaCheckoutPage;
