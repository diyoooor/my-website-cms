"use client";

import React, { useState } from "react";

// Optional: Define the shape of product data
export interface ProductData {
  name: string;
  category: string;
  condition: string;
  description: string;
  price: number;
  imageUrl: string;
  imageFile: File | null;
}

interface CreateProductModalProps {
  isOpen: boolean; // controls whether modal is visible
  onClose: () => void; // called when the modal should close
  onCreate: (data: ProductData) => void; // called when form is submitted
}

export function CreateProductModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) {
  // ----- FORM STATES -----
  const [name, setName] = useState("");
  const [category, setCategory] = useState("electronics");
  const [condition, setCondition] = useState("new");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Clear form fields
  const clearForm = () => {
    setName("");
    setCategory("electronics");
    setCondition("new");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setImageFile(null);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData: ProductData = {
      name,
      category,
      condition,
      description,
      price: parseFloat(price || "0"),
      imageUrl,
      imageFile,
    };

    // Call parent-supplied onCreate handler
    onCreate(productData);

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

        <h2 className="text-xl font-bold mb-4">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. iPhone 12"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Category (Select) */}
          <div>
            <label htmlFor="category" className="block mb-1 font-semibold">
              Category
            </label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          {/* Condition (Radio) */}
          <div>
            <label className="block mb-1 font-semibold">Condition</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="condition"
                  value="new"
                  checked={condition === "new"}
                  onChange={() => setCondition("new")}
                />
                New
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  checked={condition === "used"}
                  onChange={() => setCondition("used")}
                />
                Used
              </label>
            </div>
          </div>

          {/* Description (TextArea) */}
          <div>
            <label htmlFor="description" className="block mb-1 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Describe the product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Price (Number) */}
          <div>
            <label htmlFor="price" className="block mb-1 font-semibold">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
