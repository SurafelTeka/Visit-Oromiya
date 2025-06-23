import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Ensure Button is correctly imported
import { Menu, X } from "lucide-react"; // Import Menu and X icons

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar after navigation on mobile
  };

  return (
    <nav className="sticky top-0 z-50 bg-oromiaRed shadow-lg">
      {" "}
      {/* Changed bg-red-600 to bg-oromiaRed for consistency */}
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
              className="text-white hover:text-gray-200 transition-colors" // Adjusted hover color
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("/destinations")}
              className="text-white hover:text-gray-200 transition-colors" // Adjusted hover color
            >
              Destinations
            </button>
            {/* Note: Direct hash links like #packages won't work with react-router-dom navigate directly without extra setup
               If #packages is meant to scroll within the current page, you can keep <a>.
               If it's meant to navigate to a page AND scroll, it's more complex.
               For consistency with react-router-dom, I'll keep it as a button to navigate if it's a route.
            */}
            <button
              onClick={() => handleNavigate("/packages")} // Assuming /packages is a route
              className="text-white hover:text-gray-200 transition-colors" // Adjusted hover color
            >
              Tour Packages
            </button>
            <button
              onClick={() => handleNavigate("/ecommerce")}
              className="text-white hover:text-gray-200 transition-colors" // Adjusted hover color
            >
              Zenbil
            </button>
            <Button
              onClick={() => handleNavigate("/admin")}
              variant="outline"
              className="text-oromiaRed border-white hover:bg-white hover:text-oromiaRed" // Adjusted colors for Oromia Red theme
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
              <Menu className="h-6 w-6" /> {/* Lucide Menu Icon */}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
        ></div>
      )}
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-gray-900 shadow-lg z-50 p-6 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:hidden`} // Slide from right
      >
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(false)}
            className="text-white"
          >
            <X className="h-6 w-6" /> {/* Lucide X Icon for closing */}
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
            onClick={() => handleNavigate("/packages")} // Assuming /packages is a route
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
          <Button
            onClick={() => handleNavigate("/admin")}
            variant="outline"
            className="mt-4 text-oromiaRed border-white hover:bg-white hover:text-oromiaRed text-lg font-medium"
          >
            Admin
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
