import React from "react";

const Subscription = ({ form, handleChange }) => {
  return (
    <div className="space-y-4">
      <label htmlFor="subscription" className="block text-sm font-medium text-gray-700">
        Choose a Subscription Plan
      </label>
      <select
        id="subscription"
        name="subscription"
        value={form.subscription}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none bg-white text-gray-800"
      >
        <option value="" disabled>
          -- Select a plan --
        </option>
        <option value="basic">🟢 Basic – Free (limited features)</option>
        <option value="pro">🔵 Pro – 499 ETB/mo (for growing vendors)</option>
        <option value="premium">🟣 Premium – 999 ETB/mo (full features + support)</option>
      </select>
    </div>
  );
};

export default Subscription;
  