import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration — replace with your backend logic
    navigate('/ecommerce');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" required placeholder="Full Name" className="w-full border px-4 py-2 rounded" />
          <input type="email" required placeholder="Email" className="w-full border px-4 py-2 rounded" />
          <input type="password" required placeholder="Password" className="w-full border px-4 py-2 rounded" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already registered?{" "}
          <button onClick={() => navigate('/login')} className="text-indigo-600 hover:underline">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
