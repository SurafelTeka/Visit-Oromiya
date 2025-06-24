import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleProducts, Product } from './fakeProducts';
import  SellerPopup from "../components/sellers/SellerPopup"

const categories = [
  { name: 'Home Decor', icon: '🪑' },
  { name: 'Coffee & Ceramics', icon: '☕' },
  { name: 'Clothing & Fabrics', icon: '🧣' },
  { name: 'Jewelry & Accessories', icon: '💍' },
];

 
const Ecommerce: React.FC = () => {
  const [showSellerPopup, setShowSellerPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const productsPerPage = 12;

  const filteredProducts = selectedCategory
    ? sampleProducts.filter((p) => p.category === selectedCategory)
    : sampleProducts;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-16 rounded-lg shadow mb-10">
        <h1 className="text-5xl font-extrabold mb-4">ZenbifdfdsfalVendor Market</h1>
        <p className="text-lg max-w-2xl mx-auto">Authentic Oromo crafts and culture — curated beautifully.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedCategory(cat.name);
              setCurrentPage(1);
            }}
            className={`cursor-pointer text-sm px-4 py-2 border rounded-full shadow-sm transition-all duration-200 ${
              selectedCategory === cat.name
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-indigo-100'
            }`}
          >
            <span className="mr-1">{cat.icon}</span> {cat.name}
          </div>
        ))}
        {selectedCategory && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(1);
            }}
            className="text-sm text-red-500 underline ml-2"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Seller CTA */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowSellerPopup(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Become a Seller
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow hover:shadow-xl transition overflow-hidden"
          >
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.price}</p>
              <p className="text-sm text-yellow-500 mt-1">⭐ {product.rating} • In stock: {product.stock}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      {showSellerPopup && <SellerPopup onClose={() => setShowSellerPopup(false)} />}
    </div>
  );
};

export default Ecommerce;
