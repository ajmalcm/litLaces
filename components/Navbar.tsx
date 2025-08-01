"use client";

import React, { useEffect, useState } from "react";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Logo from "@/public/icons/lit_laces.png";
import MenuIcon from "@/public/icons/menu.svg";
import SearchIcon from "@/public/icons/search.svg";
import Image from "next/image";
import SideNav from "./SideNav";
import SearchBar from "@/components/SearchBar";
import CartDrawer from "@/components/CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "@/redux/services/userReducers";
import { setCart } from "@/redux/reducers/userSlice";
import { toast } from "sonner";

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [open, setOpen] = useState(false);
    const {data:cartData, isLoading:cartLoading, error:cartError} = useGetCartQuery("");
    const dispatch = useDispatch();
  

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const toggleSearch = (newSearchOpen: boolean) => () => {
    setIsSearch(newSearchOpen);
  };

  const toggleCart = (newCartopen: boolean) => () => {
    setIsCart(newCartopen);
  };

  const { cart } = useSelector((state: any) => state.auth);

   useEffect(()=>{
    console.log("Cart Data:", cartData);
    if(cartData && cartData.success) {
      dispatch(setCart(cartData.cartItems.cartItems));
    }
    if(cartError) {
      if ("data" in cartError) {
        const errorMessage = (cartError.data as { message: string })?.message;
        toast.error(errorMessage);
      }
    }

  },[cartData,cartError,dispatch])

  return (
    <div>
      <div className="px-6 md:px-8 flex justify-between items-center text-white bg-[#0a0a0a] shadow-md">
        <div className="cursor-pointer">
          <Image
            src={MenuIcon}
            alt="menu"
            className="hover:scale-110 transition-all"
            onClick={toggleDrawer(true)}
          />
        </div>
        <div className="cursor-pointer">
          <Image
            src={Logo}
            alt="logo"
            width={60}
            height={60}
            className="block md:hidden"
          />
          <Image
            src={Logo}
            alt="logo"
            width={70}
            height={70}
            className="hidden md:block"
          />
        </div>
        <div className="relative">
          <div className="flex gap-4 md:gap-8 items-center justify-center cursor-pointer">
            <Image
              src={SearchIcon}
              alt="search"
              className="hover:scale-110 transition-all"
              onClick={toggleSearch(true)}
            />
            <LocalMallOutlinedIcon
              className="hover:scale-110 transition-all"
              onClick={toggleCart(true)}
            />
          </div>
          {
            cart.length > 0 &&
          <p className="absolute -top-2 -right-[10px] text-white bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-[8px] font-bold border border-white">
            {cart.length}
          </p>
          }
        </div>
      </div>
      <SideNav open={open} toggleDrawer={toggleDrawer} />
      <SearchBar isSearch={isSearch} toggleSearch={toggleSearch} />
      <CartDrawer isCart={isCart} toggleCart={toggleCart} />
    </div>
  );
};

export default Navbar;
