import React, { useState } from "react";

const OtpVerification = ({ form, onVerify }) => {
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const sendOtp = () => {
    setSending(true);
    setError(null);
    setTimeout(() => {
      console.log(`📩 OTP sent to: ${form.phone_number}`);
      setSent(true);
      setSending(false);
    }, 1000); // Simulated for now
  };

  const verifyOtp = () => {
    setVerifying(true);
    setError(null);

    const payload = {
      phone_number: form.phone_number.replace(/\s+/g, ""),
      otp: otp.trim()
    };

    fetch("http://localhost:3000/api/users/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        setVerifying(false);
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result?.message || "Invalid OTP");
        }
        console.log("✅ OTP Verified:", result);
        onVerify();
      })
      .catch((err) => {
        console.error("❌ OTP verification failed:", err.message);
        setError("Invalid OTP. Please try again.");
      });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700">
        An OTP will be sent to{" "}
        <strong>{form.phone_number || "your phone number"}</strong>.
      </p>

      <button
        type="button"
        onClick={sendOtp}
        disabled={sending || sent}
        className="bg-green-100 text-green-700 px-4 py-1 rounded hover:bg-green-200 text-sm"
      >
        {sending ? "Sending..." : sent ? "OTP Sent" : "Send OTP"}
      </button>

      {sent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="button"
            onClick={verifyOtp}
            disabled={verifying || otp.length < 4}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {verifying ? "Verifying..." : "Verify & Continue"}
          </button>
        </>
      )}
    </div>
  );
};

export default OtpVerification;
