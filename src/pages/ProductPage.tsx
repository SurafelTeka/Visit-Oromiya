import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleProducts } from "./fakeProducts";
import ProductPageHeader from "../components/ProductPageHeader";
import "./ProductPage.css";
import { useCart } from "../hooks/useCart";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = sampleProducts.find((p) => p.id === Number(id));
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);

  if (!product) {
    return (
      <main className="text-center py-20">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <button
          onClick={() => navigate("/ecommerce")}
          className="mt-4 text-indigo-600 underline focus:outline-none focus:ring"
          aria-label="Go back to ecommerce"
        >
          Go back
        </button>
      </main>
    );
  }

  // Products cheaper or equal price in same category, excluding current product
  const cheaperOptions = sampleProducts.filter(
    (p) =>
      p.id !== product.id &&
      p.category === product.category &&
      parseFloat(p.price.slice(1)) <= parseFloat(product.price.slice(1))
  );

  // Suggested products from other categories
  const suggestions = sampleProducts
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .slice(0, 4);

  // Static example reviews - could be extended to dynamic/fetched reviews
  const reviews = [
    { id: 1, user: "Sena", rating: 5, comment: "Amazing quality and detail!" },
    {
      id: 2,
      user: "Liya",
      rating: 4,
      comment: "Really love the craftsmanship.",
    },
    {
      id: 3,
      user: "Abdi",
      rating: 3,
      comment: "Nice, but expected it larger.",
    },
    { id: 4, user: "Hana", rating: 5, comment: "Absolutely beautiful." },
  ];

  // Filter reviews by selected rating
  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews;

  return (
    <>
      <ProductPageHeader />

      <main
        className="product-page-container"
        aria-label={`Product details for ${product.name}`}
      >
        <section className="product-grid mb-12">
          <article>
            <img
              src={product.imageUrl}
              alt={`Image of ${product.name}`}
              className="product-main-image"
              loading="lazy"
            />
            <div
              className="product-thumbnails"
              aria-label="Additional product images"
            >
              {[...Array(3)].map((_, i) => (
                <img
                  key={i}
                  src={product.imageUrl}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  className="product-thumbnail"
                  loading="lazy"
                />
              ))}
            </div>
          </article>

          <article>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price" aria-live="polite" aria-atomic="true">
              {product.price}
            </p>
            <p className="product-meta">
              ⭐ {product.rating.toFixed(1)} • Stock: {product.stock}
            </p>

            {/* Enhanced product description */}
            <section
              className="product-description"
              aria-label="Product description"
            >
              <p>{product.description}</p>

              {!showFullContent ? (
                <>
                  <div className="mt-4 max-h-36 overflow-hidden relative">
                    <p className="whitespace-pre-line">{product.details}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  </div>
                  <button
                    onClick={() => setShowFullContent(true)}
                    className="mt-2 text-indigo-600 underline focus:outline-none focus:ring"
                    aria-label="Show full product details"
                  >
                    See More
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-4 whitespace-pre-line">{product.details}</p>
                  <button
                    onClick={() => setShowFullContent(false)}
                    className="mt-2 text-indigo-600 underline focus:outline-none focus:ring"
                    aria-label="Collapse product details"
                  >
                    See Less
                  </button>
                </>
              )}
            </section>

            <button
              type="button"
              className="product-button mt-6"
              aria-label={`Add ${product.name} to cart`}
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
          </article>
        </section>

        <section aria-labelledby="cheaper-options-title" className="mb-10">
          <h2 id="cheaper-options-title" className="section-title">
            Cheaper Options in {product.category}
          </h2>
          {cheaperOptions.length > 0 ? (
            <div className="card-grid" role="list">
              {cheaperOptions.map((p) => (
                <article
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="product-card"
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/product/${p.id}`);
                  }}
                  aria-label={`View details of ${p.name}`}
                >
                  <img src={p.imageUrl} alt={p.name} loading="lazy" />
                  <div className="product-card-content">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-gray-600">{p.price}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No cheaper items found.</p>
          )}
        </section>

        <section aria-labelledby="suggestions-title" className="mb-10">
          <h2 id="suggestions-title" className="section-title">
            Customers Also Liked
          </h2>
          <div className="card-grid" role="list">
            {suggestions.map((p) => (
              <article
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="product-card"
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/product/${p.id}`);
                }}
                aria-label={`View details of ${p.name}`}
              >
                <img src={p.imageUrl} alt={p.name} loading="lazy" />
                <div className="product-card-content">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-gray-600">{p.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="reviews-title"
          className="mb-12 flex flex-col md:flex-row gap-8"
        >
          {/* Sidebar filter */}
          <aside className="w-full md:w-1/4">
            <h2 id="reviews-title" className="text-2xl font-semibold mb-4">
              Customer Reviews
            </h2>
            <h3 className="text-sm font-semibold mb-3 text-gray-700">
              Filter by Rating
            </h3>
            <div className="space-y-2">
              {[5, 4, 3].map((r) => {
                const count = reviews.filter((rev) => rev.rating === r).length;
                return (
                  <button
                    key={r}
                    onClick={() => setSelectedRating(r)}
                    aria-pressed={selectedRating === r}
                    aria-label={`Show ${r}-star reviews (${count})`}
                    className={`w-full flex items-center justify-between px-3 py-2 border rounded hover:bg-gray-50 transition text-sm ${
                      selectedRating === r
                        ? "bg-indigo-50 border-indigo-600"
                        : "border-gray-300"
                    }`}
                  >
                    <span className="text-yellow-500">{"★".repeat(r)}</span>
                    <span className="text-gray-600 text-xs">({count})</span>
                  </button>
                );
              })}
              <button
                onClick={() => setSelectedRating(null)}
                className="text-indigo-600 text-sm mt-3 hover:underline"
              >
                Clear Filter
              </button>
            </div>
          </aside>

          {/* Reviews panel */}
          <div
            className="w-full md:w-3/4 space-y-6"
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredReviews.length > 0 ? (
              filteredReviews.map((r) => (
                <article
                  key={r.id}
                  className="border rounded-lg p-5 shadow-sm bg-white"
                  tabIndex={0}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-bold w-10 h-10 rounded-full flex items-center justify-center">
                      {r.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800">{r.user}</p>
                        <p className="text-yellow-500 text-sm">
                          {"★".repeat(r.rating)}
                          {"☆".repeat(5 - r.rating)}
                        </p>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        Verified Buyer • June 2025
                      </p>
                      <p className="text-gray-700 text-sm mt-2">{r.comment}</p>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-gray-400">No reviews found for this rating.</p>
            )}

            {/* Leave a review box */}
            <div className="mt-10 border-t pt-6">
              <h3
                id="leave-review-title"
                className="text-lg font-semibold mb-3"
              >
                Leave a Review
              </h3>
              <textarea
                rows={4}
                placeholder="Write your thoughts about this product..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-sm"
                aria-label="Write your review"
              />
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm transition"
                aria-label="Sign in to submit review"
              >
                Sign in to Submit Review
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductPage;
