import React from "react";

const ProductDetailsLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row px-4 py-4 md:px-28 md:py-8 justify-center md:items-center gap-2 md:gap-16">
        {/* Carousel Placeholder */}
        <div className="md:flex-[0.6] bg-gray-800 h-[300px] md:h-[400px] rounded-lg"></div>

        {/* Product Info Placeholder */}
        <div className="flex flex-col gap-4 md:gap-2 w-full">
          <div className="h-4 bg-gray-800 w-1/3 rounded"></div>
          <div className="h-8 bg-gray-800 w-2/3 rounded"></div>
          <div className="h-4 bg-gray-800 w-1/4 rounded"></div>
          <div className="h-4 bg-gray-800 w-1/2 rounded"></div>

          {/* Size Selector */}
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-800 w-1/6 rounded"></div>
            <div className="h-10 bg-gray-800 w-full md:max-w-[200px] rounded"></div>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-800 w-1/6 rounded"></div>
            <div className="flex items-center gap-2 border-[1px] border-gray-700 rounded-xl p-2 w-fit">
              <div className="h-6 w-6 bg-gray-800 rounded"></div>
              <div className="h-6 w-12 bg-gray-800 rounded"></div>
              <div className="h-6 w-6 bg-gray-800 rounded"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <div className="h-10 bg-gray-800 w-2/3 rounded"></div>
            <div className="h-10 bg-gray-800 w-2/3 rounded"></div>
          </div>

          {/* Accordion Placeholder */}
          <div className="h-20 bg-gray-800 rounded"></div>
        </div>
      </div>

      {/* People Also Like Section */}
      <div className="px-4 py-4 md:px-16 md:py-8">
        <div className="h-6 bg-gray-800 w-1/4 mb-6 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-[200px] bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="h-16 bg-gray-800 mx-5 rounded"></div>
    </div>
  );
};

export default ProductDetailsLoader;
