"use client"

import UpdateCompsModal from "@/components/UpdateCompsModal";
import { setBannerData } from "@/redux/reducers/userSlice";
import { useGetAdminUIQuery } from "@/redux/services/userReducers";
import { Edit } from "lucide-react";
import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";

const page = () => {

  const fileType="img"; //will be video or audio
  const [updateBannerModal,setUpdateBannerModal]=useState(false);

  const { data: banner } = useGetAdminUIQuery("");
  const dispatch = useDispatch();

  // Do not dispatch during render — dispatch only after banner query updates
  React.useEffect(() => {
    if (!banner) return;

    // banner may be wrapped (e.g. { data: doc }) or be the doc itself
    const resolved = (banner as any)?.data ?? banner;
    const resolvedBanner = Array.isArray(resolved) ? resolved[0] ?? null : resolved ?? null;

    if (resolvedBanner && Object.keys(resolvedBanner).length > 0) {
      const emptyField = { public_id: "", url: "" };
      const normalized = {
        heroL: resolvedBanner.heroL ?? emptyField,
        heroSM: resolvedBanner.heroSM ?? emptyField,
        banner1: resolvedBanner.banner1 ?? emptyField,
        banner2: resolvedBanner.banner2 ?? emptyField,
        banner3: resolvedBanner.banner3 ?? emptyField,
      };

      dispatch(setBannerData(normalized));
    }
  }, [banner, dispatch]);

  const { bannerData } = useSelector((state: any) => state.auth); //get banner data from redux
  const {heroSM,heroL,banner1,banner2,banner3}=bannerData || {}; //destructure banner data safely with fallback
  console.log("Banner data from Redux:", { heroSM, heroL, banner1, banner2, banner3 }); //log for debugging


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
            heroL&&heroL.url.endsWith(".mp4")?
            <video src={heroL.url} autoPlay muted loop playsInline className="w-full h-full object-cover"/>
            :<img src={heroL.url || "/assets/bbgif.gif"} alt="largeHero" height={"60vh"} className="w-full h-full object-cover"/>
          }
          <p className="absolute top-1/2 left-1/2 text-3xl -translate-x-1/2 -translate-y-1/2 md:text-7xl font-extrabold">LIT LACES</p>
        </div>

        <div className="flex-[0.3] border-[1px] border-color-white rounded-md relative">
          {
            heroSM?.url.endsWith(".mp4")?
            <video src={heroSM.url} autoPlay muted loop playsInline className="w-full h-full object-cover"/>:
            <img src={heroSM.url || "/assets/phoneGif.gif"} alt="phoneGif" height={"60vh"} className="object-cover w-full h-full"/>
          }
          <p className="absolute top-1/2 left-1/2 text-3xl -translate-x-1/2 -translate-y-1/ font-extrabold">LIT LACES</p>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-1 mt-1 min-h-[20vh] md:min-h-[30vh]">
        <div className="flex-1 border-[1px] border-color-white rounded-md">
          {
              banner1&&banner1.url.endsWith(".mp4")?
              <video src={banner1.url} autoPlay muted loop playsInline className="w-full h-full object-cover"/>:
              <img src={banner1.url || "/assets/men.jpg"} alt="men" className="w-full h-full aspect-square object-cover "/>
          }
        </div>
        <div className="flex-1 border-[1px] border-color-white rounded-md">
          {
              banner2&&banner2.url.endsWith(".mp4")?
              <video src={banner2.url} autoPlay muted loop playsInline className="w-full h-full object-cover"/>:
              <img src={banner2.url || "/assets/women.jpg"} alt="women" className="w-full h-full aspect-square object-cover "/>
          }
        </div>
        <div className="flex-1 border-[1px] border-color-white rounded-md">
          {
              banner3&&banner3.url.endsWith(".mp4")?
              <video src={banner3.url} autoPlay muted loop playsInline className="w-full h-full object-cover"/>:
              <img src={banner3.url || "/assets/all.jpg"} alt="all" className="w-full h-full aspect-square object-cover "/>
          }
        </div>
      </div>
    </div>
  );
};

export default page;
