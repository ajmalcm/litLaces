"use client";

import { Cross } from "lucide-react";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const UpdateCompsModal = ({
  setUpdateBannerModal,
}: {
  setUpdateBannerModal: Function;
}) => {
  const [bannerData, setBannerData] = useState({
    heroL:null,
    heroSM: null,
     banner1: null,
    banner2: null,
    banner3: null,
  });
  const [bannerDataPreview, setBannerDataPreview] = useState({
    heroL:"/assets/bbgif.gif",
    heroSM: "/assets/phoneGif.gif",
     banner1: "/assets/men.jpg",
    banner2: "/assets/women.jpg",
    banner3: "/assets/all.jpg",
  });
 
  // const { heroL, heroSM,banner1, banner2, banner3  } = bannerData;
  // const { heroL, heroSMp,banner1p, banner2p, banner3p  } = bannerDataPreview;

  const closeModal = () => {
    setUpdateBannerModal(false);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if(files && files.length > 0)
    {
      const fileUrl=URL.createObjectURL(files[0]);
      setBannerDataPreview((prev)=>{
        return {
          ...prev,
          [name]:fileUrl
        }
      });
      setBannerData((prev)=>{
        return {
          ...prev,
          [name]:files[0]
        }
      });
    }

  };

 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(bannerData);
    
  
  };

  return (
    <div
      className="p-2 md:p-4 flex flex-col justify-center items-center h-full mx-auto relative backdrop-blur-md overflow-x-scroll
        bg-white/20 border border-white/30 rounded-md"
    >
      <Cross
        className="absolute top-2 right-2 hover:scale-110 ease-in-out  rotate-45  cursor-pointer"
        onClick={closeModal}
      />

      <h2 className="text-2xl textwhite mb-3">Update Banners</h2>
      <form className="max-w-full md:max-w-[70%] " onSubmit={handleSubmit}>
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
            name="heroL"
            onChange={changeHandler}
          />
          {/* preview of the selected sile*/}
          <HeroPreview
            src={bannerDataPreview?.heroL}
            type={bannerData?.heroL}
            alt="heroLargePreview"
          />
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
            name="heroSM"
            id="heroMobile"
            className="hidden"
            onChange={changeHandler}
          />
          {/* preview of the selected sile*/}
          <HeroPreview
            src={bannerDataPreview?.heroSM}
            type={bannerData?.heroSM}
            alt="heroMobilePreview"
          />
        </div>

        <div>
          <div className="flex justify-between gap-2">
            <label
              htmlFor="banner1"
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
              B-1
            </label>

            <input
              type="file"
              accept="image/*"
              multiple={false}
              id="banner1"
              name="banner1"
              onChange={changeHandler}
              className="hidden"
            />

            <label
              htmlFor="banner2"
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
              B-2
            </label>

            <input
              type="file"
              accept="image/*"
              multiple={false}
              id="banner2"
              name="banner2"
              className="hidden"
              onChange={changeHandler}
            />

            <label
              htmlFor="banner3"
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
              B-1
            </label>

            <input
              type="file"
              accept="image/*"
              multiple={false}
              id="banner3"
              name="banner3"
              className="hidden"
              onChange={changeHandler}
            />
          </div>

          {/* preview of the selected files */}
          <div className="grid grid-cols-3 gap-4  my-3">
            <SmallImagePreview
              src={bannerDataPreview?.banner1}
              type={bannerData?.banner1}
              alt="banner1Preview"
            />
            <SmallImagePreview
              src={bannerDataPreview?.banner2}
              type={bannerData?.banner2}
              alt="banner2Preview"
            />
            <SmallImagePreview
              src={bannerDataPreview?.banner3}
              type={bannerData?.banner3}
              alt="banner3Preview"
            />
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

const SmallImagePreview = ({
  src,
  alt,
  type,
}: {
  src: string;
  alt: string;
  type: File | null;
}) => (
  <div className="relative">
    {type instanceof File && type.type.startsWith("video")  ? (
      <video
        src={src}
        controls
        autoPlay
        muted
        loop
        className="w-full h-full aspect-square object-cover rounded-lg"
      />
    ) : (
      <img
        src={src}
        className="w-full h-full aspect-square object-cover rounded-lg"
        alt={alt}
      />
    )}
    <CloseIcon className="absolute -top-2 -right-2 hover:scale-110 ease-in-out border-[2px] cursor-pointer border-white rounded-full bg-black p-1 md:p-0" />
  </div>
);

const HeroPreview = ({
  src,
  type,
  alt,
}: {
  src: string;
  type: File | null;
  alt: string;
}) => (
  <div className="relative w-fit mx-auto">
    { type instanceof File && type.type.startsWith("video") ? (
      <video
        src={src}
        controls
        autoPlay
        loop
        muted
        className="w-[400px]  h-[400px] aspect-square object-cover my-4"
      />
    ) : (
      <img
        src={src}
        alt={alt}
        className="w-[400px]  h-[400px] aspect-square object-cover my-4"
      />
    )}
    <CloseIcon className="absolute -top-2 -right-2 hover:scale-110 ease-in-out border-[2px] cursor-pointer border-white rounded-full bg-black p-1 md:p-0" />
  </div>
);

export default UpdateCompsModal;
