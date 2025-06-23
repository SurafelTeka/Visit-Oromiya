import React, { useState } from 'react';

const categories = [
  { name: 'Home Decor', icon: '🪑' },
  { name: 'Coffee & Ceramics', icon: '☕' },
  { name: 'Clothing & Fabrics', icon: '🧣' },
  { name: 'Jewelry & Accessories', icon: '💍' },
];

const SellerPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Become a Seller</h2>
      <input
        type="text"
        placeholder="Your Store Name"
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Register Now
      </button>
      <button onClick={onClose} className="mt-2 text-gray-500 underline block w-full text-center">
        Cancel
      </button>
    </div>
  </div>
);
