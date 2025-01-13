'use client'

import Image from "next/image";
import React, { useState } from "react";
import MenuIcon from "@/public/icons/menu.svg"
import MobileNav from "./MobileNav";
import Logo from "@/public/icons/lit_laces.png"

const Navbar = () => {

   const [open, setOpen] = useState(false);
  
    const toggleDrawer = (newOpen:boolean) => () => {
      setOpen(newOpen);
    };

  return (
    <header className="bg-gray-900 text-white block md:hidden shadow-md">
      <div className="flex justify-between items-center px-4">
        {/* Logo */}
        <div className='cursor-pointer'>
            <Image src={MenuIcon} alt="menu" className='hover:scale-110 transition-all' onClick={toggleDrawer(true)}/>
        </div>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
        <Image src={Logo} alt="logo" width={60} height={60}/>
        </div>
      </div>
      <MobileNav open={open} toggleDrawer={toggleDrawer}/>
    </header>
  );
};

export default Navbar;
