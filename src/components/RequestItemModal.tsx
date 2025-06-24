import React, { useState } from "react";

interface RequestItemModalProps {
  onClose: () => void;
  onSubmit: (data: {
    phone: string;
    email?: string;
    description: string;
  }) => void;
}

const RequestItemModal: React.FC<RequestItemModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !description.trim()) {
      alert("Please fill in required fields: Phone and Item Description.");
      return;
    }

    // Simulate API call or form submission
    onSubmit({ phone, email: email || undefined, description });

    setSubmissionMessage("We will get back to you!");
    // Close the modal after a short delay to show the message
    setTimeout(() => {
      onClose();
      setSubmissionMessage(null); // Reset message for next time
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative transform transition-all scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
          aria-label="Close modal"
        >
          &times;
        </button>
        {submissionMessage ? (
          <div className="text-center py-10">
            <p className="text-xl font-semibold text-green-600">
              {submissionMessage}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Didn't find what you were looking for?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., +251912345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Describe the item you are looking for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Request Item
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestItemModal;
