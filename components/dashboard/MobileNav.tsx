"use client";
import P2 from "@/public/assets/p2.webp";
import React, { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import { ShoppingCart } from "@mui/icons-material";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const MobileNav = ({open,toggleDrawer}:{open:boolean,toggleDrawer:any}) => {

  const navLinks = [
    { item: "Dashboard", link: "/admin", icon: DashboardIcon },
    { item: "All Products", link: "/admin/allProducts", icon: StorefrontIcon },
    { item: "Add Product", link: "/admin/addProduct", icon: AddBoxIcon },
    { item: "All Users", link: "/admin/allUsers", icon: PeopleIcon },
    { item: "All Orders", link: "/admin/allOrders", icon: ShoppingCart },
    { item: "UI comps", link: "/admin/appearence", icon: ViewCarouselIcon },
    { item: "Home", link: "/", icon: HomeIcon },
  ];

  const DrawerList = (
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:'100vh' }} role="presentation" onClick={toggleDrawer(false)} className='bg-gray-900 font-mono'>
    <aside className="bg-gray-900 text-white w-64 block md:hidden shadow-md">
      <div className="p-4 text-center border-b border-gray-800">
        <div className="relative mb-4 w-20 h-20 mx-auto">
          {" "}
          {/* Further reduced size */}
          <Image
            src={P2}
            alt="ujhfka"
            layout="fill" //Further reduced size
            objectFit="cover" //Further reduced size
            className="rounded-full border border-gray-800 mx-auto"
          />
        </div>
        <p className="text-lg font-semibold">Jack</p>
        <p className="text-sm text-gray-400">Admin</p>
      </div>

      <nav className="mt-6 flex-1">
        {navLinks.map((item, index) => (
          <Link href={item.link} key={index}>
            <p className="flex items-center px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-all rounded-lg my-1">
              <item.icon className="text-xl mr-4" />
              {item.item}
            </p>
          </Link>
        ))}
      </nav>
    </aside>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default MobileNav;
