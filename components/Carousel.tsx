'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CustomCarousel = ({ product }: { product: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % product.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + product.length) % product.length);
    };

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
  };

    return (
      <div>
        <div className="relative w-full h-full">
            {/* Carousel Content */}
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {product.map((item, index) => (
                        <div
                            key={index}
                            className="min-w-full aspect-square relative"
                        >
                               <img
                                src={item.url}
                                alt={`Slide ${index}`}
                                // layout='fill'
                                // objectFit='cover'
                                className="rounded-md object-cover w-full h-full"
                                // sizes="(max-width: 768px) 95vw, 45vw"
                                // priority={index === 0} // Load the first image eagerly for better performance
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Navigation Buttons */}
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 px-4 py-2"
                onClick={goToPrev}
            >
                <ArrowBackIosNewIcon/>
            </button>
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2"
                onClick={goToNext}
            >
                <ArrowForwardIosIcon/>
            </button>

              {/* Image Previewer/Indicators */}
             {/* Image Previewer/Indicators (Below the Main Image) */}
            
        </div>
        <div className="mt-4 flex justify-center space-x-2">
            {product.map((item, index) => (
                <button
                    key={index}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 border-gray-300 ${
                        currentIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => goToSlide(index)}
                >
                    <img
                        src={item.url}
                        alt={`Thumbnail ${index}`}
                        width={64} // Thumbnail size
                        height={64}
                        className="object-cover w-full h-full"
                    />
                </button>
            ))}
        </div>
      </div>
    );
};

export default CustomCarousel;
