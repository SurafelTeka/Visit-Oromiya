import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have this Button component

interface AdminSignInModalProps {
  onClose: () => void;
  onSignInSuccess: () => void;
}

const AdminSignInModal: React.FC<AdminSignInModalProps> = ({
  onClose,
  onSignInSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setIsLoading(true);

    // --- Simulate API Call for Admin Sign-in ---
    // In a real application, you would replace this with an actual API call
    // to your backend authentication endpoint.
    try {
      // Example: Check against hardcoded admin credentials (for demonstration ONLY)
      if (email === "admin@example.com" && password === "adminpass") {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        onSignInSuccess(); // Call success callback from parent
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred during sign-in.");
    } finally {
      setIsLoading(false);
    }
    // --- End Simulation ---
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative transform transition-all scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
          aria-label="Close modal"
          disabled={isLoading}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm"
              role="alert"
            >
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="admin-email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-oromiaRed focus:border-oromiaRed"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="admin-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-oromiaRed focus:border-oromiaRed"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-oromiaRed text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-oromiaRed focus:ring-offset-2 transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignInModal;
