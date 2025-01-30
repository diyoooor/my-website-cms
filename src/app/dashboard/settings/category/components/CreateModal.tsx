"use client";

import React, { useState } from "react";

// Optional: Define the shape of product data
export interface CategoryData {
  name: string;
  description: string;
  imageUrl: string;
  imageFile: File | null;
}

interface CreateModalProps {
  isOpen: boolean; // controls whether modal is visible
  onClose: () => void; // called when the modal should close
  onCreate: (data: CategoryData) => void; // called when form is submitted
}

export function CreateModal({
  isOpen,
  onClose,
  onCreate,
}: Readonly<CreateModalProps>) {
  // ----- FORM STATES -----
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Clear form fields
  const clearForm = () => {
    setName("");
    setDescription("");
    setImageUrl("");
    setImageFile(null);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryData: CategoryData = {
      name,
      description,
      imageUrl,
      imageFile,
    };

    // Call parent-supplied onCreate handler
    onCreate(categoryData);

    // Clear fields & close modal
    clearForm();
    onClose();
  };

  if (!isOpen) {
    return null; // Don't render anything if modal is not open
  }

  return (
    // OVERLAY
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose /* Close modal on overlay click */}
    >
      {/* MODAL CONTENT */}
      <div
        className="bg-white p-6 rounded shadow w-full max-w-md relative"
        onClick={
          (e) => e.stopPropagation() /* Prevent close on content click */
        }
      >
        {/* Close button (top-right corner) */}
        <button
          onClick={() => {
            clearForm();
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">สร้างหมวดหมู่</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              ชื่อหมวดหมู่
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ตย. คะน้า"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block mb-1 font-semibold">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Image File Upload */}
          <div>
            <label htmlFor="imageFile" className="block mb-1 font-semibold">
              Image File
            </label>
            <input
              id="imageFile"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          {/* Description (TextArea) */}
          <div>
            <label htmlFor="description" className="block mb-1 font-semibold">
              คำอธิบาย
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="คำอธิบายหมวดหมู่"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
