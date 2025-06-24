// components/Loader.tsx
import React from "react";
import "./Loader.css"; // or use Tailwind if preferred

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-4">
    <div className="loader" />
    <p className="mt-2 text-sm text-gray-600 animate-pulse">
      Processing your checkout...
    </p>
  </div>
);

export default Loader;
