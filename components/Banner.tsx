import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Banner = ({ img, alt, text, link }: { img: string | any, alt: string, text: string, link: string }) => {
  const aspectRatio = 9 / 16 * 100; // Define the aspect ratio (e.g., 16:9) as a percentage

  return (
    <div className="relative group overflow-hidden rounded-none md:shadow-md px-2">
      <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
        <Image
          src={img}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="absolute bottom-4 left-4">
        <Link href={`/collections/${link}`}>
          <button className="bg-white text-black px-4 py-2 font-mono rounded-sm text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:bg-gray-200">
            {text}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;