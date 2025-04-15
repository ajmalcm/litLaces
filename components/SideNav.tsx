"use client";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
// import Logo from "@/public/icons/lit_laces.png";
import Logo from "@/public/icons/loog.png";
import CloseIcon from "@/public/icons/close.svg";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useLazyLogoutuserQuery, useLogoutuserQuery } from "@/redux/services/userReducers";
import { toast } from "sonner";
import { setAdmin, setAuthenticated } from "@/redux/reducers/userSlice";

const SideNav = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: Function;
}) => {
  const { isAuthenticated, isAdmin } = useSelector((state: any) => state.auth);
  const navigate = useRouter();
  const [triggerLogout] = useLazyLogoutuserQuery();
  const dispatch = useDispatch();

  const navLinks = [
    { item: "Home", link: "/" },
    { item: "Shop Men", link: "/collections/ShopMen" },
    { item: "Shop Women", link: "/collections/ShopWomen" },
    { item: "Shop All", link: "/collections/ShopAll" },
    {
      item: isAuthenticated ? "Log-Out" : "Log-in",
      link: isAuthenticated ? "/" : "/login",
    },
    // {item:"login ",link:"/login"},{item:"sign-up",link:"/sign-up"}
    { item: "admin", link: "/admin" },
  ];

  const logoutHandler = async (text: string) => {
    try {
      const response = await triggerLogout(""); // Ensure the API call completes
      console.log("Logout Response:", response);
  
      if (response.error) {
        toast.error("Unable to logout now. Try later!");
        return;
      }
  
      if (response.data) {
        dispatch(setAuthenticated(false));
        dispatch(setAdmin(false));
        toast.success(response.data?.message);
      }
  
      console.log("Updated State:", { isAuthenticated, isAdmin }); // Still might log old values
      navigate.push(text);
    } catch (err) {    
      console.error("Logout Error:", err);
      toast.error("An unexpected error occurred.");   
    }
  };
  
  
  const handleLogin=(text:string)=>
  {
    navigate.push(text)

  }

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 400 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#eaeaea",
        height: "100vh",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div className="flex justify-start items-center p-6 md:p-8 bg-[#0a0a0a] cursor-pointer">
        <Image src={CloseIcon} alt="closeIcon" />
      </div>
      <List className="-mt-[40vh] px-8 text-lg">
        {navLinks.map((text, index) => (
          <ListItem key={text.item} disablePadding>
            {/* <Link href={text.link}> */}
            <ListItemButton onClick={() =>text.link!=='/login'? logoutHandler(text.link):handleLogin(text.link)}>
              <ListItemText primary={text.item} />
            </ListItemButton>
            {/* </Link> */}
          </ListItem>
        ))}
      </List>
      <div className="flex justify-between items-center px-8 bg-[#0a0a0a] cursor-pointer">
        <Image src={Logo} alt="logo" width={70} height={70} />
        <InstagramIcon style={{ color: "white" }} fontSize="large" />
      </div>
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

export default SideNav;
