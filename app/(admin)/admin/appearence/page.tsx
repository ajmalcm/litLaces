"use client"

import UpdateCompsModal from "@/components/UpdateCompsModal";
import { Edit } from "lucide-react";
import React,{useState} from "react";


const page = () => {

  const fileType="img"; //will be video or audio
  const [updateBannerModal,setUpdateBannerModal]=useState(false);

  return (

    <div className="flex-1 flex h-full flex-col">
       {
        updateBannerModal && (
          <div className="fixed top-0 left-0 w-full max-h-full z-30 overflow-auto">
            <UpdateCompsModal setUpdateBannerModal={setUpdateBannerModal}/>
            </div>
       )}
       <p className="fixed md:top-0 top-[11vh] left-0 md:left-[14vw] z-20 font-bold text-xl backdrop-blur-md
        bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg rounded-l-none md:rounded-bl-lg" onClick={()=>setUpdateBannerModal(true)}><Edit/></p>
      <div className="w-full flex flex-col md:flex-row gap-1 h-fit">
        <div className="flex-[0.7] border-[1px] border-color-white rounded-md relative">
          {
            fileType==="img"?
            <img src="/assets/bbgif.gif" alt="largeHero" height={"60vh"} className="w-full h-full object-cover"/>:
            <video/>
          }
          <p className="absolute top-1/2 left-1/2 text-3xl -translate-x-1/2 -translate-y-1/2 md:text-7xl font-extrabold">LIT LACES</p>
        </div>

        <div className="flex-[0.3] border-[1px] border-color-white rounded-md relative">
          {
            fileType==="img"?
            <img src="/assets/phoneGif.gif" alt="phoneGif" height={"60vh"} className="object-cover w-full h-full"/>:
            <video/>
          }
          <p className="absolute top-1/2 left-1/2 text-3xl -translate-x-1/2 -translate-y-1/ font-extrabold">LIT LACES</p>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-1 mt-1 min-h-[20vh] md:min-h-[30vh]">
        <div className="flex-1 border-[1px] border-color-white rounded-md">
            <img src="/assets/men.jpg" alt="men" className="w-full h-full aspect-square object-cover "/>
        </div>
        <div className="flex-1 border-[1px] border-color-white rounded-md">
            <img src="/assets/women.jpg" alt="women" className="w-full h-full aspect-square object-cover "/>
        </div>
        <div className="flex-1 border-[1px] border-color-white rounded-md">
            <img src="/assets/all.jpg" alt="all" className="w-full h-full aspect-square object-cover "/>
        </div>
      </div>
    </div>
  );
};

export default page;
