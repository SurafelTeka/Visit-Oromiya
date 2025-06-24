import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AdminSignInModal from "./AdminSignInModal"; // Import the new Admin Sign-In Modal

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAdminSignInModal, setShowAdminSignInModal] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleAdminClick = () => {
    setShowAdminSignInModal(true);
  };

  const handleAdminSignInSuccess = () => {
    setShowAdminSignInModal(false);
    navigate("/admin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-oromiaRed shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <h1
              className="text-2xl font-bold text-white cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              Visit Oromia
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigate("/")}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("/destinations")}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Destinations
            </button>
            <button
              onClick={() => handleNavigate("/packages")}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Tour Packages
            </button>
            <button
              onClick={() => handleNavigate("/ecommerce")}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Zenbil
            </button>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
            >
              MEET CHALA
            </a>

            {/* Admin Button: Now opens the modal */}
            <Button
              onClick={handleAdminClick} /* Corrected comment syntax */
              variant="outline"
              className="text-oromiaRed border-white hover:bg-white hover:text-oromiaRed"
            >
              Admin
            </Button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen(true)}
              className="text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-gray-900 shadow-lg z-50 p-6 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(false)}
            className="text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleNavigate("/")}
            className="text-white text-lg font-medium hover:text-oromiaRed transition-colors px-3 py-2 rounded-md hover:bg-gray-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate("/destinations")}
            className="text-white text-lg font-medium hover:text-oromiaRed transition-colors px-3 py-2 rounded-md hover:bg-gray-800"
          >
            Destinations
          </button>
          <button
            onClick={() => handleNavigate("/packages")}
            className="text-white text-lg font-medium hover:text-oromiaRed transition-colors px-3 py-2 rounded-md hover:bg-gray-800"
          >
            Tour Packages
          </button>
          <button
            onClick={() => handleNavigate("/ecommerce")}
            className="text-white text-lg font-medium hover:text-oromiaRed transition-colors px-3 py-2 rounded-md hover:bg-gray-800"
          >
            Zenbil
          </button>
          {/* Admin Button in Mobile Sidebar: Now opens modal */}
          <Button
            onClick={handleAdminClick} /* Corrected comment syntax */
            variant="outline"
            className="mt-4 text-oromiaRed border-white hover:bg-white hover:text-oromiaRed text-lg font-medium"
          >
            Admin
          </Button>
        </div>
      </div>

      {/* Admin Sign-In Modal */}
      {showAdminSignInModal && (
        <AdminSignInModal
          onClose={() => setShowAdminSignInModal(false)}
          onSignInSuccess={handleAdminSignInSuccess}
        />
      )}
    </nav>
  );
};

export default Navigation;
