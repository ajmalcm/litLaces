"use client";
import Banner from "@/components/Banner";
import Brands from "@/components/Brands";
// import HomeAbout from "@/components/HomeAbout";
// import EmailSection from "@/components/EmailSection";
import { BannerItems } from "@/utils/temp";
import {useGetAdminUIQuery, useLoadUserQuery } from "@/redux/services/userReducers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setAuthenticated, setBannerData, setCart, setName } from "@/redux/reducers/userSlice";
import { toast } from "sonner";
import Gif from "@/public/assets/phoneGif.gif";
import Bgif from "@/public/assets/bbgif.gif";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Home = () => {
  // Resolve user query safely (avoid shadowing)
  const { isLoading, data: userData, error } = useLoadUserQuery("");
  const { data: bannerData, isSuccess, error: bannerError } = useGetAdminUIQuery("");
  const { isAdmin, isAuthenticated ,name} = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) console.log("loading");
    if (error) {
      if ("data" in error) {
        const errorMessage = (error.data as { message: string })?.message;
        toast.error(errorMessage);
      }
      dispatch(setAuthenticated(false));
      dispatch(setAdmin(false));
      return;
    }

    if (userData && userData.success ) {
      dispatch(setAuthenticated(true));
      dispatch(setAdmin(userData?.isAdmin));
      dispatch(setName(userData?.user?.name));
      toast.success(userData.message);
       userData.success && setTimeout(()=>{
          toast.success(`Welcome ${userData?.user?.name} 😎!`);
          },5000)
    } else {
      dispatch(setAuthenticated(false));
      dispatch(setAdmin(false));
    }

    if(bannerError) {
      if ("data" in bannerError) {
        const errorMessage = (bannerError.data as { message: string })?.message;
        toast.error(errorMessage);
      }
      return;
    }

    if(bannerData && isSuccess)
    {
      // bannerData might be { data: doc } or doc directly — handle both
      const banner = (bannerData as any)?.data ?? bannerData;

      // quick debug so you can see the exact shape in console
      console.log("Banner Data (raw):", bannerData);
      console.log("Banner Data (resolved):", banner);

      // safe destructure with fallback to empty object -> never throws
      // const { heroL = null, heroSM = null, banner1 = null, banner2 = null, banner3 = null } = banner ?? {};

      // optional: put banner into redux so other components read same source
      dispatch(setBannerData(banner));
    }
   
  }, [error, dispatch,userData,bannerData,bannerError]);  


 
  return (
    <div>
      {/* bannerVideo */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Video for Desktop */}
        <Image
          src={Bgif}
          alt="Mobile Banner"
          className="hidden md:block w-full h-full object-cover"
        />

        {/* Image for Mobile */}
        <Image
          src={Gif}
          alt="Mobile Banner"
          className="block md:hidden w-full h-full object-cover"
        />

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-widest drop-shadow-lg">
            LIT LACES
          </h1>
        </div>
      </div>
      {/* <video src='/assets/phoneBanner.mp4' autoPlay muted loop playsInline className="block md:hidden w-full h-full object-cover"/> */}

      {/* shop by Brands */}
      <div>
        <Brands />
      </div>

      {/* 3 banners */}
      <div className="py-4">
        <div className="grid md:grid-cols-3 gap-4">
          {BannerItems.map((item, i) => (
            <div key={i} className="w-full">
              <Banner
                img={item.image}
                alt={item.alt}
                text={item.text}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </div>

      {/* home about */}
      {/* <div className="mx-5 py-6">
        <HomeAbout />
      </div> */}

      {/* <div className="flex justify-center items-center text-white mx-5 border-t-[1px] border-[#434343]">
        <EmailSection />
      </div> */}
    </div>
  );
};

export default Home;
