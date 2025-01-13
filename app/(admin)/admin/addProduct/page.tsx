"use client";

import { useState } from "react";
import { Cancel } from "@mui/icons-material";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    gender: "",
    description: "",
    images: [] as any,
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e:any) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file:any) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const removeImage = (index:number) => {
    const updatedImages = formData.images.filter((_:any, i:any) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Add API integration to save product details
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-center items-center flex-1">
      <div className="w-full md:w-[80%] bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-100 text-center mb-6">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-gray-300 font-medium">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-gray-300 font-medium"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Shoes">Shoes</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Boots">Boots</option>
              <option value="Loafers">Loafers</option>
              <option value="Sandals">Sandals</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-gray-300 font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-gray-300 font-medium">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-gray-300 font-medium">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="images" className="block text-gray-300 font-medium">
              Product Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Selected Images */}
          <div className="mt-4">
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {formData.images.map((img:any, index:number) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 rounded overflow-hidden"
                  >
                    <img
                      src={img.preview}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-gray-900 text-red-500 rounded-full"
                    >
                      <Cancel className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-gray-100 p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
