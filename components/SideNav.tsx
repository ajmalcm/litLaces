"use client";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
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
import { useLogoutuserMutation } from "@/redux/services/userReducers";
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
  const [logoutTrigger] = useLogoutuserMutation();
  const dispatch = useDispatch();

  const navLinks = [
  { item: "Home", link: "/" },
  { item: "Shop Men", link: "/collections/Men" },
  { item: "Shop Women", link: "/collections/Women" },
  { item: "Shop All", link: "/collections/all" },
  {
    item: isAuthenticated ? "Log-Out" : "Log-in",
    link: isAuthenticated ? "/" : "/login",
  },
  { item: "My Orders", link: "/orders" },
  ...(isAdmin ? [{ item: "admin", link: "/admin" }] : []),
];

  const logoutHandler = async (text: string) => {
    try {
      const { data, error } = await logoutTrigger("");
      if (error) {
        toast.error("Unable to logout now. Try later!");
        return;
      }
      if (data) {
        dispatch(setAuthenticated(false));
        dispatch(setAdmin(false));
        toast.success(data?.message);
      }
      window.location.href = text;
    } catch (err) {
      console.error("Logout Error:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleLogin = (text: string) => {
    navigate.push(text);
  };

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 320 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#111827",
        height: "100vh",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow: 6,
        color: "white",
        p: 0,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {/* Close Icon */}
      <div className="flex justify-end items-center p-4 bg-gray-900">
        <Image src={CloseIcon} alt="closeIcon" width={28} height={28} />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-2 font-mono">
        <List>
          {navLinks.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() =>
                  text.item === "Log-Out"
                    ? logoutHandler(text.link)
                    : handleLogin(text.link)
                }
                sx={{
                  px: 3,
                  py: 2,
                  color: "gray.300",
                  "&:hover": {
                    backgroundColor: "#1f2937",
                    color: "#fff",
                  },
                  borderRadius: 2,
                  my: 0.5,
                }}
              >
                <ListItemText
                  primary={text.item}
                  sx={{
                    ".MuiTypography-root": {
                      fontWeight: 500,
                      fontSize: "1rem",
                      letterSpacing: "0.02em",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>

      {/* Logo + Instagram Section */}
      <div className="flex justify-between items-center px-8 py-6 bg-gray-900 border-t border-gray-800">
        <Image src={Logo} alt="logo" width={60} height={60} />
        <InstagramIcon style={{ color: "white" }} fontSize="large" />
      </div>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default SideNav;
