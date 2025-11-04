"use client"

import { Cross } from "lucide-react";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const UpdateCompsModal = ({setUpdateBannerModal}:{setUpdateBannerModal:Function}) => {

  const [bannerData,setBannerData]=useState({heroL:"/assets/bbgif.gif",heroSM:"/assets/phoneGif.gif",banner1:"/assets/men.jpg",banner2:"/assets/women.jpg",banner3:"/assets/all.jpg"});
  const {heroL,heroSM,banner1,banner2,banner3}=bannerData;


const closeModal=()=>{
  setUpdateBannerModal(false);
}

  return (
    <div className="p-2 md:p-4 flex flex-col justify-center items-center h-full mx-auto relative backdrop-blur-md overflow-x-scroll
        bg-white/20 border border-white/30 rounded-md">
              <Cross className="absolute top-2 right-2 hover:scale-110 ease-in-out  rotate-45  cursor-pointer" onClick={closeModal}/>

      <h2 className="text-2xl textwhite mb-3">Update Banners</h2>
      <form className="max-w-full md:max-w-[70%] ">
        <div>
          <label
            htmlFor="heroLarge"
            className="inline-flex justify-center items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-semibold shadow-lg cursor-pointer transition-transform 
               hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full gap-2"
          >
            <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m0-9a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            Hero Large
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple={false}
            id="heroLarge"
            className="hidden"
          />
          {/* preview of the selected sile*/}
          <div className="relative">
            <CloseIcon className="absolute -top-2 -right-2 hover:scale-110 ease-in-out border-[2px] cursor-pointer border-white rounded-full bg-black p-1 md:p-0" />
            <img src={heroL} alt="heroLargePreview" className="w-[400px] mx-auto h-[400px] aspect-square object-cover my-4" />
          </div>
        </div>
        <div>
          <label
            htmlFor="heroMobile"
            className="inline-flex justify-center items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-semibold shadow-lg cursor-pointer transition-transform 
               hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full gap-2"
          >
            <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m0-9a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            Hero Mobile
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple={false}
            id="heroMobile"
            className="hidden"
          />
          {/* preview of the selected sile*/}
          <div className="relative">
            <CloseIcon className="absolute -top-2 -right-2 hover:scale-110 ease-in-out border-[2px] cursor-pointer border-white rounded-full bg-black p-1 md:p-0" />
            <img
              src={heroSM}
              alt="heroMobilePreview"
              className="w-[400px] mx-auto h-[400px] aspect-square object-cover my-4"
            />
          </div>
        </div>

        <div>
          <label htmlFor="banners3" className="inline-flex justify-center items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-semibold shadow-lg cursor-pointer transition-transform 
               hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full gap-2"
          >
            <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m0-9a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Mini Banners 
              </label>

          <input
            type="file"
            accept="image/*"
            multiple
            id="banners3"
            className="hidden"
          />

          {/* preview of the selected files */}
          <div className="grid grid-cols-3 gap-4  my-3">
            <SmallImagePreview src={banner1} alt="banner1Preview"/>
            <SmallImagePreview src={banner2} alt="banner2Preview"/>
            <SmallImagePreview src={banner3} alt="banner3Preview"/>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
        >
          Update UI
        </button>
      </form>
    </div>
  );
};

const SmallImagePreview = ({src,alt}:{src:string,alt:string})=>{
  return(
    <div className="relative ">
      <img src={src} alt={alt} className="w-full h-full aspect-square object-cover "/>
      <CloseIcon className="absolute -top-2 -right-2 hover:scale-110 ease-in-out border-[2px] cursor-pointer border-white rounded-full bg-black p-1 md:p-0" />
    </div>
  );
}

export default UpdateCompsModal;
