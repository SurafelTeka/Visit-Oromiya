import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-red-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <h1
              className="text-2xl font-bold text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Visit Oromia
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-white hover:text-green-200 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/destinations")}
              className="text-white hover:text-green-200 transition-colors"
            >
              Destinations
            </button>
            <a
              href="#packages"
              className="text-white hover:text-green-200 transition-colors"
            >
              Tour Packages
            </a>{" "}
            <button
              onClick={() => navigate("/ecommerce")}
              className="text-white hover:text-green-200 transition-colors"
            >
              Zenbil
            </button>
            <Button
              onClick={() => navigate("/admin")}
              variant="outline"
              className="text-red-600 border-white hover:bg-white hover:text-red-600"
            >
              Admin
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" className="text-white">
              ☰
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
