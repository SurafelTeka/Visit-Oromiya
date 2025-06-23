import React from 'react';
import { Product, sampleProducts } from '../pages/fakeProducts';

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<Props> = ({ product, onClose }) => {
  const similar = sampleProducts.filter(
    (p) =>
      p.id !== product.id &&
      p.category === product.category &&
      parseFloat(p.price.slice(1)) <= parseFloat(product.price.slice(1))
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start justify-center pt-10 px-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:underline text-sm">
            Close
          </button>
        </div>
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded" />
        <p className="mt-4 text-lg font-medium">{product.price}</p>
        <p className="text-sm text-yellow-600">⭐ {product.rating} • Stock: {product.stock}</p>
        <p className="mt-3 text-gray-700">
          Other items in <strong>{product.category}</strong> at the same or lower price:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {similar.length > 0 ? (
            similar.map((p) => (
              <div key={p.id} className="border rounded-lg shadow-sm">
                <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded-t" />
                <div className="p-3">
                  <h4 className="font-semibold text-sm">{p.name}</h4>
                  <p className="text-sm text-gray-500">{p.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No similar items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
