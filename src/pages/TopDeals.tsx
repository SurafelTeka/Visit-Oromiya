import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleProducts } from './fakeProducts';
import ProductPageHeader from '../components/ProductPageHeader';

const TopDeals: React.FC = () => {
  const navigate = useNavigate();
  const topDeals = sampleProducts.filter(p => p.rating > 4.7); // Example: High-rated products as deals

  return (
    <>
      <ProductPageHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Top Deals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {topDeals.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group relative border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default TopDeals; 