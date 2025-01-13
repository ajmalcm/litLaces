import SummaryProduct from "@/components/SummaryProduct";
import P1 from "@/public/assets/p2.webp";
import { ProductsArray } from "@/utils/temp";
import React from "react";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-6 lg:flex lg:gap-12">
        {/* Left Section: Contact & Delivery */}
        <div className="flex-1 bg-[#0a0a0a] p-6 rounded-xl shadow-xl border border-gray-900">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-100">
            Checkout
          </h1>

          {/* Contact Section */}
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Contact Information
          </h2>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Email"
            />
            <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                id="offers"
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 rounded"
              />
              <label htmlFor="offers" className="ml-2 text-sm text-gray-400">
                Send me news and exclusive offers
              </label>
            </div>
          </div>

          {/* Delivery Section */}
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Delivery Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              id="first-name"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="First Name"
            />
            <input
              type="text"
              id="last-name"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Last Name"
            />
          </div>
          <div className="mt-6">
            <input
              type="text"
              id="address"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Address"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <input
              type="text"
              id="city"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="City"
            />
            <select
              id="state"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none text-sm"
            >
              <option>Karnataka</option>
              {/* Add more states */}
            </select>
            <input
              type="text"
              id="zip"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="ZIP Code"
            />
          </div>
          <div className="mt-6">
            <input
              type="tel"
              id="phone"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-1/3 bg-[#0a0a0a] p-6 mt-8 lg:mt-0 rounded-xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">
            Order Summary
          </h2>

          {/* Product Info */}
          {ProductsArray.slice(0,3).map((item,index)=>(
            <SummaryProduct key={index} image={item.img} size={item.size} name={item.productName} price={item.price} quantity={2}/>
          ))}

          <hr className="border-gray-700 mb-6" />

          {/* Price Details */}
          <div className="flex justify-between mb-4 text-gray-300 text-sm">
            <p>Subtotal</p>
            <p>₹2,699.00</p>
          </div>
          <div className="flex justify-between mb-4 text-gray-300 text-sm">
            <p>Shipping</p>
            <p className="text-gray-500">Enter address</p>
          </div>
          <hr className="border-gray-700 mb-6" />
          <div className="flex justify-between text-lg font-semibold text-gray-100">
            <p>Total</p>
            <p>₹2,699.00</p>
          </div>

          {/* Checkout Button */}
          <button className="mt-8 w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium shadow-lg focus:outline-none transition-transform duration-300 hover:scale-105">
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
