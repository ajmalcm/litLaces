import Image from 'next/image';
import React from 'react';

const ProductCard = ({ src, alt, productName, price }: { src: string | any; alt: string | any; productName: string; price: any }) => {
  return (
    <div className="flex flex-col gap-2 font-mono bg-black">
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        {/* Image cropping and centering */}
        <img src={src} alt={alt} className='object-cover' />
      </div>
      <p className="text-sm font-bold text-white flex">{productName}</p>
      <div className="flex items-center gap-8">
        <s className="text-xs font-light tracking-wider text-white">Rs: {price}</s>
        <p className="text-xs font-light tracking-wider text-white">Rs: {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
