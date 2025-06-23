import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ProductPageHeader: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartCount } = useCart();
  const [location, setLocation] = useState<string>('Deliver to...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        setLocation('Deliver to Not Supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setError(null);
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            if (!response.ok) {
              throw new Error('Failed to fetch address.');
            }
            const data = await response.json();
            if (data && data.locality) {
                const locality = data.locality;
                const placeId = data.localityInfo?.administrative?.find(a => a.name === locality)?.wikidataId || 'N/A';
                setLocation(`Deliver to ${locality} (${placeId})`);
            } else {
                throw new Error('Failed to parse address.');
            }
          } catch (err) {
            setError('Could not fetch location. Please try again.');
            setLocation('Deliver to Location Error');
          }
        },
        (err) => {
          // Handle errors
          setLocation('Deliver to Location Denied');
        }
      );
    };

    getLocation();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top navigation */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-red-700 cursor-pointer"
        >
          ZenbilVendor
        </div>

        {/* Deliver to */}
        <button
          onClick={() => window.location.reload()}
          className="hidden md:flex items-center gap-1 text-sm text-gray-600"
          title={error || 'Click to refresh location'}
        >
          <span className="material-icons text-base">location_on</span>
          <span>{location}</span>
        </button>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-lg hidden sm:block">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Right-side buttons */}
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <button className="hover:text-red-600">Sign In</button>
          <button
            onClick={() => navigate('/cart')}
            className="relative hover:text-red-600 flex items-center"
          >
            <span className="material-icons">shopping_cart</span>
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
          <span onClick={() => navigate('/top-deals')} className="hover:underline cursor-pointer">Top Deals</span>
          <span onClick={() => navigate('/todays-picks')} className="hover:underline cursor-pointer">Today's Picks</span>
          <span onClick={() => navigate('/new-arrivals')} className="hover:underline cursor-pointer">New Arrivals</span>
          <span onClick={() => navigate('/cultural-finds')} className="hover:underline cursor-pointer">Cultural Finds</span>
          <span onClick={() => navigate('/handmade-treasures')} className="hover:underline cursor-pointer">Handmade Treasures</span>
        </div>
      </div>
    </header>
  );
};

export default ProductPageHeader;
