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
    useEffect(()=>{
      if(isLoading)
        console.log("loading");

      if (error) {
       
          // API error (handled response)
          if ('data' in error) {
            const errorMessage = (error.data as { message: string })?.message;
            console.log(errorMessage);
            toast.error(errorMessage);
          }
        }
      console.log(isAdmin,isAuthenticated);
      if(data)
      {
        console.log(data?.message);
        dispatch(setAuthenticated(data?.success));
        dispatch(setAdmin(data?.isAdmin));
        toast.success(data?.message);
        console.log(isAuthenticated,isAdmin);
      }
  },[data,error,isLoading])

  return (
   <div>
    {/* bannerVideo */}
    <video src='/assets/bannerVideo1.mp4' autoPlay muted loop playsInline className="hidden md:block"/>
    <video src='/assets/phoneBanner.mp4' autoPlay muted loop playsInline className="block md:hidden"/>
    {/* <Image src={Gif} alt="fdf" className="block md:hidden"/> */}

    {/* shop by Brands */}
    <div>
      <Brands/>
    </div>

    {/* 3 banners */}
    <div className="flex flex-col w-full">
      {
        BannerItems.map((item,i)=>(
          <Banner key={i} img={item.image} alt={item.alt} text={item.text} link={item.link}/>
        ))
      }
   
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
