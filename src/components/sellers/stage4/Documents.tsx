import React, { useEffect } from "react";

const Documents = ({ form, handleChange, onUploadStart, onUploadComplete }) => {
  const boxStyle =
    "border-2 border-dashed border-gray-300 rounded-md px-4 py-6 text-center text-sm text-gray-500 bg-white hover:border-green-500 transition cursor-pointer";

  useEffect(() => {
    const allReady = form.license && form.cover_picture && form.fayda;
    if (!allReady) return;

    const upload = async () => {
      onUploadStart?.();
      const token = localStorage.getItem("auth_token");
      const formData = new FormData();
      formData.append("license", form.license);
      formData.append("cover_picture", form.cover_picture);
      formData.append("fayda", form.fayda);

      try {
        const res = await fetch("http://localhost:4000/api/information", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result?.message || "Upload failed");
        console.log("✅ Documents uploaded:", result);
      } catch (err) {
        console.error("❌ Upload error:", err.message);
        alert("Failed to upload documents. Please try again.");
      } finally {
        onUploadComplete?.();
      }
    };

    upload();
  }, [form.license, form.cover_picture, form.fayda]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {["license", "cover_picture", "fayda"].map((key) => (
          <label key={key} className={boxStyle}>
            <p className="mb-2 font-medium">
              Upload {key.replace("_", " ").toUpperCase()}
            </p>
            <input
              type="file"
              name={key}
              accept="image/*,application/pdf"
              onChange={handleChange}
              className="hidden"
            />
            <span className="text-xs text-gray-400">
              {form[key]?.name || "No file selected"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Documents;
