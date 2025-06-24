import React, { useState } from "react";

const OtpVerification = ({ form, onVerify }) => {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);

  const verifyOtp = () => {
    setVerifying(true);
    setError(null);

    const phone = form.phone_number.replace(/\s+/g, "");
    const payload = { phone_number: phone, otp: otp.trim() };

    fetch("http://localhost:3000/api/users/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const result = await res.json();
        if (!res.ok) throw new Error(result?.message || "Invalid OTP");
        console.log("✅ OTP Verified");

        return fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: phone,
            password: form.password
          })
        });
      })
      .then(async (res) => {
        const result = await res.json();
        setVerifying(false);
        if (!res.ok) throw new Error(result?.message || "Login failed");
        localStorage.setItem("auth_token", result.token);
        console.log("🔐 Login successful. Token stored.");
        onVerify();
      })
      .catch((err) => {
        setVerifying(false);
        console.error("❌ OTP/Login Error:", err.message);
        setError(err.message || "Something went wrong");
      });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700">
        Enter the OTP sent to <strong>{form.phone_number}</strong> to verify your account.
      </p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="button"
        onClick={verifyOtp}
        disabled={verifying || otp.length < 4}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {verifying ? "Verifying..." : "Verify & Continue"}
      </button>
    </div>
  );
};

export default OtpVerification;
