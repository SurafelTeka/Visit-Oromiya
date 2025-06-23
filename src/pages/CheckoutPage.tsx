import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity,
        0
      )
    );
  }, [cartItems]);

  const handleChapaPayment = async () => {
    alert(`This would send ${total} ETB to Chapa for payment!`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
        <button onClick={() => navigate('/')} className="bg-red-500 text-white px-4 py-2 rounded">Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white shadow rounded p-4 mb-6">
        {cartItems.map(item => {
          const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ""));
          return (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
              </div>
              <div>
                <div className="text-right">ETB {priceNum} x {item.quantity}</div>
                <div className="font-bold">ETB {(priceNum * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center mt-4 pt-4 border-t font-bold text-lg">
          <span>Total</span>
          <span>ETB {total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleChapaPayment}
        className="w-full bg-green-600 text-white py-3 rounded text-xl font-bold hover:bg-green-700"
      >
        Pay with Chapa
      </button>
    </div>
  );
};

export default CheckoutPage; 