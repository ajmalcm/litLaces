"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandItems } from "@/utils/temp";

const Brands = () => {
  return (
    <div className="bg-black py-12 font-mono border-[10px] border-white">
      <div className="container mx-auto px-4">
        {/* Subheading */}
        <h2 className="text-white text-2xl font-bold mb-6 text-center">BRANDS</h2>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-5 gap-6">
          {BrandItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 shadow-gray-700 bg-[#0a0a0a] rounded-xs shadow-md hover:shadow-xl delay-300 ease-out transition-shadow duration-700"
            >
              <Link href={item.link} className="flex flex-col items-center">
                <div className="h-24 w-24 relative mb-2">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className="text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300">
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden overflow-x-auto whitespace-nowrap py-4">
          {BrandItems.map((item, i) => (
            <div
              key={i}
              className="inline-block mx-2 last:mr-0 flex-shrink-0 w-32 shadow-gray-700 shadow-md"
            >
              <Link
                href={item.link}
                className="flex flex-col items-center justify-center p-4 bg-[#0a0a0a] rounded-lg"
              >
                <div className="h-20 w-20 relative mb-2">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
