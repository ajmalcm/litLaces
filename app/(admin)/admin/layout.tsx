"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import NotFound from "@/app/not-found";

const layout = ({ children }: { children: React.ReactNode }) => {
  const {isAuthenticated,isAdmin}=useSelector((state:any)=>state.auth);
  const navigate=useRouter();
  const [redirect,setRedirect]=useState(true);

  useEffect(()=>{
    if(typeof window !== "undefined")
    {

      if(!isAuthenticated)
        {
          toast.error("You are not authenticated");
          navigate.push("/login");
        }
      else if(!isAdmin)
        {
          toast.error("You are not authorized to view this page");
          navigate.push("/");
        }
        else
        {
          setRedirect(false);
        }
    }

  },[isAdmin,isAuthenticated,navigate])

  if(redirect)
    return null;
 

  return (
    <div className="min-h-screen min-w-[100vw] bg-black text-white absolute top-0 left-0 overflow-hidden">
      <div className="min-h-screen flex flex-col bg-black text-white">
        <div className="flex flex-1 flex-col md:flex-row">
        <Navbar />
        <Sidebar />
        {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
