import React from "react";

const OrderDetailsSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 animate-pulse flex-1">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="h-8 bg-gray-800 w-1/2 mb-6 rounded"></div>

        {/* Stepper Section */}
        <div className="mb-6">
          <div className="h-6 bg-gray-800 w-1/3 mb-4 rounded"></div>
          <div className="flex justify-between items-center">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-10 w-10 bg-gray-800 rounded-full mb-2"></div>
                <div className="h-4 w-16 bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details Section */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl mb-6 border border-gray-800">
          {/* Order Info */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="h-4 bg-gray-800 w-32 mb-2 rounded"></div>
              <div className="h-4 bg-gray-800 w-24 rounded"></div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-800 w-20 mb-2 rounded"></div>
              <div className="h-4 bg-gray-800 w-28 rounded"></div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <div className="h-6 bg-gray-800 w-1/4 mb-4 rounded"></div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-4"
              >
                <div className="relative w-20 h-20 bg-gray-800 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-800 w-3/4 mb-2 rounded"></div>
                  <div className="h-4 bg-gray-800 w-1/2 mb-2 rounded"></div>
                  <div className="h-4 bg-gray-800 w-1/4 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div className="flex justify-between mt-4">
            <div className="h-4 bg-gray-800 w-1/3 rounded"></div>
          </div>
        </div>

        {/* Back Button */}
        <div className="h-10 bg-gray-800 w-32 rounded"></div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeletonLoader;
