import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, MapPin } from "lucide-react";
import RequestItemModal from "./RequestItemModal";
import { useCart } from "../hooks/useCart"; // Assuming this is defined elsewhere

const ProductPageHeader: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartCount } = useCart();
  const [location, setLocation] = useState<string>("Deliver to...");
  const [error, setError] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setLocation("Deliver to Not Supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setError(null);
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch address.");
            }
            const data = await response.json();
            if (data) {
              const addressParts = [
                data.locality,
                data.principalSubdivision,
                data.countryName,
              ].filter(Boolean);
              setLocation(`Deliver to ${addressParts.join(", ")}`);
            } else {
              throw new Error("Failed to parse address.");
            }
          } catch (err) {
            setError("Could not fetch location. Please try again.");
            setLocation("Deliver to Location Error");
          }
        },
        (err) => {
          setLocation("Deliver to Location Denied");
        }
      );
    };

    getLocation();
  }, []);

  const handleRequestItemSubmit = (data: {
    phone: string;
    email?: string;
    description: string;
  }) => {
    console.log("Item Request Submitted:", data);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center mb-4 sm:mb-0">
          <div
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-red-700 cursor-pointer mr-4"
          >
            Zenbil Vendor
          </div>

          <button
            onClick={() => window.location.reload()}
            className="hidden md:flex items-center gap-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-4 py-1 shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 mr-4 flex-shrink-0"
            title={error || "Click to refresh location"}
          >
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="truncate max-w-[180px] font-medium">
              {location}
            </span>
          </button>

          <button
            onClick={() => setShowRequestModal(true)}
            className="flex bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-800 transition-colors flex-shrink-0"
          >
            Request Item
          </button>
        </div>

        <div className="w-full order-last sm:order-none sm:w-auto flex-grow max-w-lg mt-4 sm:mt-0 px-0 sm:px-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700 ml-auto flex-shrink-0">
          {/* Sign In Button: Added onClick to navigate */}
          <button
            className="hidden sm:block hover:text-red-600"
            onClick={() => navigate("/signin-register")}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="relative hover:text-red-600 flex items-center"
            aria-label="View cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {getCartCount() > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="bg-red-700 text-white text-sm px-6 py-2">
        <div className="max-w-7xl mx-auto flex gap-x-6 overflow-x-auto whitespace-nowrap">
          <span
            onClick={() => navigate("/top-deals")}
            className="hover:underline cursor-pointer"
          >
            Top Deals
          </span>
          <span
            onClick={() => navigate("/todays-picks")}
            className="hover:underline cursor-pointer"
          >
            Today's Picks
          </span>
          <span
            onClick={() => navigate("/new-arrivals")}
            className="hover:underline cursor-pointer"
          >
            New Arrivals
          </span>
          <span
            onClick={() => navigate("/cultural-finds")}
            className="hover:underline cursor-pointer"
          >
            Cultural Finds
          </span>
          <span
            onClick={() => navigate("/handmade-treasures")}
            className="hover:underline cursor-pointer"
          >
            Handmade Treasures
          </span>
        </div>
      </div>

      {showRequestModal && (
        <RequestItemModal
          onClose={() => setShowRequestModal(false)}
          onSubmit={handleRequestItemSubmit}
        />
      )}
    </header>
  );
};

export default ProductPageHeader;
