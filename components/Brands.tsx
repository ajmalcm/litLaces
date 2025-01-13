"use client";

import React from "react";
import { BrandItems } from "@/utils/temp";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";

const Brands = () => {
  return (
    <div className="bg-black flex flex-col gap-3 text-white  py-12 font-mono border-y-2 border-white">
      {/* top */}
      <p className="text-4xl font-bold text-center">Shop By Brand</p>
      {/* bottom */}
      <div className="gap-6 justify-center items-center flex-wrap hidden md:flex">
      {
          BrandItems.map((item,i)=><div key={i} className='flex flex-col gap-4'>
            <Link href={item.link}>
            <Image src={item.logo} alt={item.name} height={200}/>
            <button className='outline-none border-none self-start pl-4'>{item.name+' ->'}</button>
            </Link>
            </div>)
        }
      </div>

      <div className="gap-6 justify-center items-center flex-wrap flex md:hidden">
        {/* brand Card */}
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper "
        >
          {BrandItems.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href={item.link}>
              <Image src={item.logo} alt={item.name} /> 
              <button className="outline-none border-none self-start pl-4">
                {item.name+' ->'}
              </button>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
