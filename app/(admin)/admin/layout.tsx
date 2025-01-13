import React from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
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
