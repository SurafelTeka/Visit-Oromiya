import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ShoppingCart, MapPin } from "lucide-react";
import RequestItemModal from "./RequestItemModal"; // Import the modal component

const ProductPageHeader: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartCount } = useCart();
  const [location, setLocation] = useState<string>("Deliver to...");
  const [error, setError] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false); // State for modal visibility

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
              // Compose a general address string
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
          // Handle errors
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
    // In a real application, you would send this data to your backend
    console.log("Item Request Submitted:", data);
    // The modal itself handles the "We will get back to you" message and closing
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top navigation */}
      {/* Changed to flex-wrap to allow elements to wrap on smaller screens */}
      {/* justify-between ensures space is distributed when not wrapped */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Left Section: Logo, Deliver To, Request Item Button */}
        {/* Added mb-4 for spacing when items wrap on small screens */}
        <div className="flex items-center mb-4 sm:mb-0">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-red-700 cursor-pointer mr-4"
          >
            Zenbil Vendor
          </div>

          {/* Deliver to */}
          {/* hidden md:flex to hide on small devices, flex-shrink-0 to prevent shrinking */}
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

          {/* Request Item Button */}
          {/* flex to always show, flex-shrink-0 to prevent shrinking */}
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-800 transition-colors flex-shrink-0"
          >
            Request Item
          </button>
        </div>

        {/* Search Bar */}
        {/* w-full on small, flex-grow on large to take space */}
        {/* order-last on small devices to push it to the bottom line */}
        {/* sm:order-none to revert to normal order on larger screens */}
        {/* mt-4 for spacing on small screens, px-0 to remove default horizontal padding */}
        <div className="w-full order-last sm:order-none sm:w-auto flex-grow max-w-lg mt-4 sm:mt-0 px-0 sm:px-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Right-side buttons (Sign In, Cart) */}
        {/* ml-auto pushes them to the far right on the current line */}
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700 ml-auto flex-shrink-0">
          <button className="hover:text-red-600 hidden sm:block">
            Sign In
          </button>{" "}
          {/* Hidden on very small screens to save space */}
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

      {/* Promo bar */}
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

      {/* Request Item Modal */}
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
