"use client"
import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector,useDispatch } from "react-redux";
import { setSearchText } from "@/redux/reducers/productSlice";
import { useGetProductsQuery } from "@/redux/services/userReducers";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import SearchResultCard from "./SearchResultCard";
import { AnimatePresence } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";

export default function TopDrawer({
  isSearch,
  toggleSearch,
}: {
  isSearch: boolean;
  toggleSearch: any;
}) {

  const { searchText } = useSelector((state: any) => state.product);
  const dispatch = useDispatch();
  const {id}=useParams();
  const [debouncedSearch,setDebouncedSearch]=useState(searchText)
  const shouldFetch = !!debouncedSearch; // true if debouncedSearch is not empty

  const { data, error, isLoading } = useGetProductsQuery(
    { keyword: debouncedSearch, id: id || "all" },
    { skip: !shouldFetch }
  );
  
  useEffect(()=>{
    const handler=setTimeout(()=>{
      setDebouncedSearch(searchText.trim());
      if(searchText.trim()!=="") {
        dispatch(setSearchText(searchText.trim()));
      }
    }, 500);
    return ()=>clearTimeout(handler);
    
  },[searchText,dispatch]);
  
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchText(value));
  }

  const searchCloseHandler = () => {
    toggleSearch(false)();
    dispatch(setSearchText(""));
  }



  const content = (
    <div className="flex gap-4 justify-center items-center py-4 bg-[#0a0a0a] text-white">
      <input
        placeholder="Search Products"
        className="rounded-xl w-[85%] md:w-[500px] border-[1px] border-gray-400 p-3 bg-[#0a0a0a]"
        value={searchText}
        onChange={onChangeHandler}
      />
      <CloseIcon onClick={searchCloseHandler} className="cursor-pointer" />
    </div>
  );

  return (
    <div className="relative">
      <SwipeableDrawer
        anchor="top"
        open={isSearch}
        onClose={searchCloseHandler}
        onOpen={toggleSearch(true)}
        hideBackdrop
        sx={{zIndex:50}}
      >
        {content}
      </SwipeableDrawer>
      {
        isSearch && shouldFetch && data && data.sneakers && data.sneakers.length > 0 &&
      <div className="absolute top-0 left-0 md:-top-3 md:-left-5 w-full bg-transparent text-white p-4 flex flex-col justify-center items-center">
        {isLoading ? (
          <AnimatePresence>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex w-[95vw] md:w-[500px] items-center gap-4 rounded-xl bg-[#232323] p-3 shadow-md mb-1"
              >
                <Skeleton variant="rectangular" width={80} height={80} className="rounded-lg" />
                <div className="flex-1">
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </div>
              </div>
            ))}
          </AnimatePresence>
        ) : error || !data?.sneakers?.length ? (
          <div className="flex w-[95vw] md:w-[500px] items-center justify-center gap-4 rounded-xl bg-[#232323] p-6 shadow-md mb-1">
            <span className="text-gray-400 text-center w-full">No Products Found</span>
          </div>
        ) : (
          data.sneakers.map((product: any) => (
            <SearchResultCard key={product._id} product={product} />
          ))
        )}
    </div>
      }
    </div>
  );
}
