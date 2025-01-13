import React from "react";

const CollectionSkeletonLoader = () => {
  return (
    <div className="animate-pulse text-white px-4 py-4 md:px-16 md:py-8 flex flex-col gap-3">
      {/* Title Section */}
      <div className="h-8 bg-gray-800 w-1/4 mb-6 rounded"></div>

      {/* Filter and Product Count */}
      <div className="flex justify-between items-center mb-8">
        {/* Filter Placeholder */}
        <div className="flex gap-4 items-center">
          <div className="h-6 bg-gray-800 w-16 rounded"></div>
          <div className="h-8 bg-gray-800 w-32 rounded"></div>
        </div>
        {/* Product Count Placeholder */}
        <div className="h-6 bg-gray-800 w-16 rounded"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="h-[250px] bg-gray-800 rounded-lg"></div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="h-10 bg-gray-800 w-64 rounded"></div>
      </div>
    </div>
  );
};

export default CollectionSkeletonLoader;
