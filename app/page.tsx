"use client"
import Banner from "@/components/Banner";
import Brands from "@/components/Brands";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HomeAbout from "@/components/HomeAbout";
import EmailSection from "@/components/EmailSection";
import { BannerItems } from "@/utils/temp";
import { useLoadUserQuery } from "@/redux/services/userReducers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setAuthenticated } from "@/redux/reducers/userSlice";
import { toast } from "sonner";

  const  Home= ()=> {
  
    const {isLoading,data,error} = useLoadUserQuery("");
    const {isAdmin,isAuthenticated}=useSelector((state: any)=>state.auth);
    const dispatch=useDispatch();
    useEffect(() => {
      if (isLoading) console.log("loading");
      if (error) {
        if ('data' in error) {
          const errorMessage = (error.data as { message: string })?.message;
          toast.error(errorMessage);
        }
        dispatch(setAuthenticated(false));
        dispatch(setAdmin(false));
        return;
      }

      if (data && data.success) {
        dispatch(setAuthenticated(true));
        dispatch(setAdmin(data.isAdmin));
        toast.success(data.message);
      } else {
        dispatch(setAuthenticated(false));
        dispatch(setAdmin(false));
      }
    }, [ error, dispatch, isLoading,isAdmin, isAuthenticated]);
  return (
   <div>
    {/* bannerVideo */}
    <div className="h-[85vh]">
    <video src='/assets/bannerVideo1.mp4' autoPlay muted loop playsInline className="hidden md:block w-full h-full object-cover"/>
    <video src='/assets/phoneBanner.mp4' autoPlay muted loop playsInline className="block md:hidden w-full h-full object-cover"/>
      </div>
    {/* <Image src={Gif} alt="fdf" className="block md:hidden"/> */}

    {/* shop by Brands */}
    <div>
      <Brands/>
    </div>

    {/* 3 banners */}
    <div className="py-8">
      <div className="grid md:grid-cols-3 gap-4">
        {
          BannerItems.map((item,i)=>(

            <div key={i} className="w-full">
              <Banner img={item.image} alt={item.alt} text={item.text} link={item.link}/>
            </div>
          ))
        }
      </div>
   
    </div>

      {/* home about */}
      <div className="mx-5 py-6">
      <HomeAbout/>
      </div>

      <div className="flex justify-center items-center text-white mx-5 border-t-[1px] border-[#434343]">
        <EmailSection/>
      </div>

   </div>
  );
}

export default Home;
