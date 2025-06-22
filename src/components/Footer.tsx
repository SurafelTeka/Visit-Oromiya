import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Visit Oromia</h3>
            <p className="text-gray-300">
              Discover the natural beauty and rich culture of Oromia region with our expert-guided tours.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/destinations" className="hover:text-white">Destinations</a></li>
              <li><a href="/packages" className="hover:text-white">Packages</a></li>
              <li><a href="/admin" className="hover:text-white">Admin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Bale Mountains</a></li>
              <li><a href="#" className="hover:text-white">Wenchi Crater Lake</a></li>
              <li><a href="#" className="hover:text-white">Rift Valley Lakes</a></li>
              <li><a href="#" className="hover:text-white">Arsi Mountains</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📧 info@visitoromia.com</li>
              <li>📞 +251-11-123-4567</li>
              <li>📍 Addis Ababa, Ethiopia</li>
              <li>🌐 www.visitoromia.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Visit Oromia. All rights reserved. | Discover Ethiopia's Natural Heritage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;