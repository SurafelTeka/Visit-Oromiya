import React from "react";

const inputStyle =
  "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white";

const BasicInfo = ({ form, handleChange }) => (
  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 text-sm text-gray-700">Full Name</label>
      <input
        name="name"
        placeholder="e.g. Abel Mekonnen"
        value={form.name}
        onChange={handleChange}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block mb-1 text-sm text-gray-700">Phone Number</label>
      <input
        name="phone_number"
        placeholder="+251..."
        value={form.phone_number}
        onChange={handleChange}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block mb-1 text-sm text-gray-700">Password</label>
      <input
        name="password"
        type="password"
        placeholder="●●●●●●●"
        value={form.password}
        onChange={handleChange}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block mb-1 text-sm text-gray-700">Confirm Password</label>
      <input
        name="confirmPassword"
        type="password"
        placeholder="●●●●●●●"
        value={form.confirmPassword}
        onChange={handleChange}
        className={inputStyle}
      />
    </div>
  </div>
);

export default BasicInfo;
