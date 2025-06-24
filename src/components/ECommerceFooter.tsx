import React from "react";
import { useNavigate } from "react-router-dom";

const ECommerceFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-white py-10 mt-20">
      {" "}
      {/* Added mt-20 for spacing from content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: Branding and About */}
          <div>
            <div
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-red-700 cursor-pointer mb-4"
            >
              Zenbil Vendor
            </div>
            <p className="text-gray-300 text-sm">
              Your marketplace for authentic Oromo crafts and culture.
              Supporting local artisans and bringing unique products to your
              doorstep.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/contact");
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/privacy");
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/terms");
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Categories (similar to promo bar in header) */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop Categories</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <span
                  onClick={() => navigate("/top-deals")}
                  className="hover:text-red-500 cursor-pointer transition-colors"
                >
                  Top Deals
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate("/todays-picks")}
                  className="hover:text-red-500 cursor-pointer transition-colors"
                >
                  Today's Picks
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate("/new-arrivals")}
                  className="hover:text-red-500 cursor-pointer transition-colors"
                >
                  New Arrivals
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate("/cultural-finds")}
                  className="hover:text-red-500 cursor-pointer transition-colors"
                >
                  Cultural Finds
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate("/handmade-treasures")}
                  className="hover:text-red-500 cursor-pointer transition-colors"
                >
                  Handmade Treasures
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact Info (Placeholder) */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>📧 info@zenbilvendor.com</li>
              <li>📞 +251-9XX-XXX-XXXX</li>{" "}
              {/* Use a relevant contact number for Zenbil Vendor */}
              <li>📍 Addis Ababa, Ethiopia</li>
              {/* You can add social media links here */}
            </ul>
          </div>
        </div>

        {/* Bottom copyright and tag line */}
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Zenbil Vendor. All rights reserved. |
            Empowering Oromo Artisans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ECommerceFooter;
