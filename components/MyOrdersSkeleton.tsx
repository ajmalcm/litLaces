import React from "react";

export default function MyOrdersSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white animate-pulse p-6">
      <div className="max-w-5xl mx-auto">
        <div className="h-8 w-1/3 bg-gray-800 rounded mb-6"></div>

        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-xl shadow-xl mb-6 border border-gray-800"
          >
            {/* Order Details */}
            <div className="mb-4 flex flex-wrap justify-between items-center">
              <div>
                <div className="h-4 w-1/2 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-800 rounded"></div>
              </div>
              <div className="h-6 w-1/4 bg-gray-800 rounded"></div>
            </div>

            {/* Order Items */}
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="flex justify-between mt-4">
              <div className="h-4 w-1/3 bg-gray-800 rounded"></div>
              <div className="h-8 w-1/4 bg-gray-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
