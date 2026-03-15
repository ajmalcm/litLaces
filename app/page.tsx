"use client";
import Banner from "@/components/Banner";
import Brands from "@/components/Brands";
// import HomeAbout from "@/components/HomeAbout";
// import EmailSection from "@/components/EmailSection";
import { BannerItems } from "@/utils/temp";
import {useGetAdminUIQuery, useLoadUserQuery } from "@/redux/services/userReducers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setAuthenticated, setBannerData, setCart, setName } from "@/redux/reducers/userSlice";
import { toast } from "sonner";
import Gif from "@/public/assets/phoneGif.gif";
import Bgif from "@/public/assets/bbgif.gif";
// using native <img> for dynamic/external URLs so we don't need width/height

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Home = () => {
  // Resolve user query safely (avoid shadowing)
  const { isLoading, data: userData, error } = useLoadUserQuery("");
  const { data: bannerData, isSuccess, error: bannerError } = useGetAdminUIQuery("");
  const {bannerData:banner} = useSelector((state: any) => state.auth);
  const heroL = banner?.heroL ?? null;
  const heroSM = banner?.heroSM ?? null;
  console.log('Banner from Redux:', { heroL, heroSM });
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  // mark mounted so we only render dynamic external URLs after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
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

    if (bannerData && isSuccess) {
      // bannerData might be { data: doc } or doc directly — handle both
      const banner = (bannerData as any)?.data ?? bannerData;

      // if backend returned an array, pick first (defensive)
      const resolvedBanner = Array.isArray(banner) ? banner[0] ?? null : banner ?? null;

      // only update redux/localStorage when we actually have a banner object
      if (resolvedBanner && Object.keys(resolvedBanner).length > 0) {
        // Normalize nested fields: if any nested entry is null, replace with default empty shape
        const emptyField = { public_id: "", url: "" };
        const normalized = {
          heroL: resolvedBanner.heroL ?? emptyField,
          heroSM: resolvedBanner.heroSM ?? emptyField,
          banner1: resolvedBanner.banner1 ?? emptyField,
          banner2: resolvedBanner.banner2 ?? emptyField,
          banner3: resolvedBanner.banner3 ?? emptyField,
        };

        console.log("Normalized banner to save:", normalized);
        dispatch(setBannerData(normalized));
        try {
          localStorage.setItem("bannerData", JSON.stringify(normalized)); // persist in localStorage
        } catch (e) {
          // ignore localStorage write errors
        }
      } else {
        console.log("No banner document returned from API — keeping existing redux banner");
      }
    }
   
  }, [error, dispatch,userData,bannerData,bannerError]);  


 
  return (
    <div>
      {/* bannerVideo */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Video for Desktop */}
        {
          // only use dynamic heroL.url after client mount to avoid hydration mismatch
          mounted && heroL && heroL?.url && heroL.url.includes('.mp4') ? (
            <video
              src={heroL.url}
              autoPlay
              muted
              loop
              playsInline
              className="hidden md:block w-full h-full object-cover"
            />
          ) : mounted && heroL && heroL?.url ? (
            <img
              src={heroL.url}
              alt="Desktop Banner"
              className="hidden md:block w-full h-full object-cover"
            />
          ) : (
            // server and initial client render use the same static fallback
            <img
              src={(Bgif as any)?.src || "/assets/bbgif.gif"}
              alt="Desktop Banner"
              className="hidden md:block w-full h-full object-cover"
            />
          )
        }

        {/* Image for Mobile */}
        {
          // only use dynamic heroSM.url after client mount to avoid hydration mismatch
          mounted && heroSM && heroSM?.url && heroSM.url.includes('.mp4') ? (
            <video
              src={heroSM.url}
              autoPlay
              muted
              loop
              playsInline
              className="block md:hidden w-full h-full object-cover"
            />
          ) : mounted && heroSM && heroSM?.url ? (
            <img
              src={heroSM.url}
              alt="Mobile Banner"
              className="block md:hidden w-full h-full object-cover"
            />
          ) : (
            <img
              src={(Gif as any)?.src || "/assets/phoneGif.gif"}
              alt="Mobile Banner"
              className="block md:hidden w-full h-full object-cover"
            />
          )
        }
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
