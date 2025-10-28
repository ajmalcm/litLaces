import React from "react";
import Link from "next/link";
import Image from "next/image";
import P2 from "@/public/assets/p2.webp";

// Import MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import { ShoppingCart } from "@mui/icons-material";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const Sidebar = () => {
  const navLinks = [
    { item: "Dashboard", link: "/admin", icon: DashboardIcon },
    { item: "All Products", link: "/admin/allProducts", icon: StorefrontIcon },
    { item: "Add Product", link: "/admin/addProduct", icon: AddBoxIcon },
    { item: "All Users", link: "/admin/allUsers", icon: PeopleIcon },
    { item: "All Orders", link: "/admin/allOrders", icon: ShoppingCart },
    { item: "UI comps", link: "/admin/appearence", icon: ViewCarouselIcon },
    { item: "Home", link: "/", icon: HomeIcon },
  ];

  return (
    <aside className="bg-gray-900 text-white w-52 min-h-screen hidden md:flex flex-col shadow-2xl">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-800 flex flex-col items-center">
        <div className="relative mb-4 w-24 h-24">
          <Image
            src={P2}
            alt="profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-gray-700"
          />
        </div>
        <p className="text-lg font-semibold">Jack</p>
        <p className="text-sm text-gray-400">Admin</p>
      </div>

      {/* Navigation Links */}
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

      {/* Footer */}
      <div className="p-6 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Lit Laces.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
