import React from "react";

export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white animate-pulse">
      <div className="max-w-5xl mx-auto p-6 lg:flex lg:gap-12">
        {/* Left Section: Contact & Delivery */}
        <div className="flex-1 bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-800">
          <div className="h-8 w-1/3 bg-gray-800 rounded mb-6"></div>

          {/* Contact Section */}
          <div className="h-6 w-1/2 bg-gray-800 rounded mb-4"></div>
          <div className="h-12 bg-gray-800 rounded-lg mb-6"></div>
          <div className="h-4 w-2/3 bg-gray-800 rounded mb-8"></div>

          {/* Delivery Section */}
          <div className="h-6 w-1/2 bg-gray-800 rounded mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="h-12 bg-gray-800 rounded-lg"></div>
            <div className="h-12 bg-gray-800 rounded-lg"></div>
          </div>
          <div className="h-12 bg-gray-800 rounded-lg mt-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="h-12 bg-gray-800 rounded-lg"></div>
            <div className="h-12 bg-gray-800 rounded-lg"></div>
            <div className="h-12 bg-gray-800 rounded-lg"></div>
          </div>
          <div className="h-12 bg-gray-800 rounded-lg mt-6"></div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-1/3 bg-gray-900 p-6 mt-8 lg:mt-0 rounded-xl shadow-xl border border-gray-800">
          <div className="h-6 w-1/2 bg-gray-800 rounded mb-6"></div>

          {/* Product Info */}
          <div className="relative flex items-center mb-6">
            <div className="relative w-20 h-20 bg-gray-800 rounded-lg"></div>
            <div className="ml-4 flex-1"> 
              <div className="h-4 w-3/4 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
            </div>
            <div className="ml-auto h-4 w-1/4 bg-gray-800 rounded"></div>
          </div>
          <hr className="border-gray-700 mb-6" />

          {/* Price Details */}
          <div className="flex justify-between mb-4">
            <div className="h-4 w-1/3 bg-gray-800 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-800 rounded"></div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="h-4 w-1/3 bg-gray-800 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-800 rounded"></div>
          </div>
          <hr className="border-gray-700 mb-6" />
          <div className="flex justify-between">
            <div className="h-6 w-1/3 bg-gray-800 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-800 rounded"></div>
          </div>

          {/* Checkout Button */}
          <div className="mt-8 w-full h-12 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
