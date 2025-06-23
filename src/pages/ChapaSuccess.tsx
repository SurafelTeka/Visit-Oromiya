import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import ProductPageHeader from '../components/ProductPageHeader';

const ChapaSuccess: React.FC = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <>
      <ProductPageHeader />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-green-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <svg
            className="mx-auto mb-6 h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          <button
            onClick={() => navigate('/ecommerce')}
            className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </>
  );
};

export default ChapaSuccess;
