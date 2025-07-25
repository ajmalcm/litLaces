import { ProductType } from '@/utils/temp';
import React from 'react';
import { motion } from 'framer-motion';

const SearchResultCard = ({ product }: { product: ProductType }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}
      className="flex w-[95vw] md:w-[500px] items-center gap-4 rounded-xl bg-[#1f1f1f] p-3 shadow-md cursor-pointer mb-1 z-[100]"
    >
      {/* Product Image */}
      <div className="relative h-20 w-20 overflow-hidden rounded-lg z-50">
        <img
          src={product?.images[0]?.url}
          alt={product?.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between text-white">
        <p className="text-sm font-semibold">{product?.name}</p>
        <div className="flex gap-2 items-center text-xs">
          <s className="text-gray-400">Rs {product?.price + 800}</s>
          <span className="text-green-400 font-medium">Rs {product?.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResultCard;
