import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login — later, replace with real auth
    navigate('/ecommerce');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" required placeholder="Email" className="w-full border px-4 py-2 rounded" />
          <input type="password" required placeholder="Password" className="w-full border px-4 py-2 rounded" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <button onClick={() => navigate('/register')} className="text-indigo-600 hover:underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
