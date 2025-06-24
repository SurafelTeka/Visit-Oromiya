import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BasicInfo from "./stage1/BasicInfo";
import AddressStep from "./stage3/AddressStep";
import Documents from "./stage4/Documents";
import Subscription from "./stage5/Subscription";

const steps = ["Basic Info", "Auto Address", "Documents", "Subscription"];

const SellerPopup = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    address: "",
    license: null,
    cover_picture: null,
    fayda: null,
    subscription: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files?.length ? files[0] : value,
    }));
  };

  const handleNext = () => {
    if (step === 0) {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const formattedPhone = form.phone_number.replace(/\s+/g, "");
      const payload = {
        name: form.name.trim(),
        phone_number: formattedPhone,
        password: form.password,
        role: "seller",
      };

      setLoading(true);
      fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          setLoading(false);
          if (!res.ok) throw new Error("Registration failed");
          const result = await res.json();
          console.log("✅ Registered:", result);

          // Proceed to login
          return fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone_number: payload.phone_number,
              password: payload.password,
            }),
          });
        })
        .then(async (res) => {
          if (!res.ok) throw new Error("Login failed");
          const loginResult = await res.json();

          // Store token
          localStorage.setItem("auth_token", loginResult.token);
          console.log("🔐 Logged in:", loginResult);

          // Go to next step
          setStep(1);
        })
        .catch((err) => {
          setLoading(false);
          console.error("❌ Error:", err);
          alert("Something went wrong. Please try again.");
        });

      return;
    }

    if (step === 3 && (!form.license || !form.cover_picture || !form.fayda)) {
      alert("Please upload all required documents.");
      return;
    }

    if (step === 3 && uploading) {
      alert("Please wait while we finish uploading your documents.");
      return;
    }

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step !== steps.length - 1) return;

    if (!form.subscription) {
      return;
    }

    const submission = { ...form };
    ["license", "cover_picture", "fayda"].forEach((key) => {
      if (form[key]) submission[key] = form[key].name;
    });

    console.log("✅ Final submission:", submission);
    alert("Seller registration submitted successfully.");
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BasicInfo form={form} handleChange={handleChange} />;
      case 1:
        return <AddressStep form={form} setForm={setForm} />;
      case 2:
        return (
          <Documents
            form={form}
            handleChange={handleChange}
            onUploadStart={() => setUploading(true)}
            onUploadComplete={() => setUploading(false)}
          />
        );
      case 3:
        return <Subscription form={form} handleChange={handleChange} />;
      default:
        return <div className="text-gray-500 text-center">Step not found</div>;
    }
  };

  const renderNavigation = () => {
    return (
      <div className="flex justify-between items-center pt-6 relative">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="text-gray-500 hover:text-gray-700"
        >
          Back
        </button>

        {step === steps.length - 1 ? (
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Next
          </button>
        )}

        {loading && (
          <div className="absolute top-[-2rem] right-0 bg-green-100 text-green-700 px-4 py-2 rounded-full shadow text-sm animate-pulse">
            Processing registration...
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl space-y-6 relative"
      >
        <h2 className="text-2xl font-semibold text-center">{steps[step]}</h2>
        {renderStep()}
        {renderNavigation()}

        <button
          type="button"
          onClick={onClose}
          className="block mx-auto text-sm text-gray-400 hover:underline pt-4"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SellerPopup;
