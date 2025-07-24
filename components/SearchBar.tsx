"use client"
import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector,useDispatch } from "react-redux";
import { setSearchText } from "@/redux/reducers/productSlice";
import { useGetProductsQuery } from "@/redux/services/userReducers";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";

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
  const {data,error,isLoading}=useGetProductsQuery({keyword:debouncedSearch,id:id||"all"});
  
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



  const content = (
    <div className="flex gap-4 justify-center items-center py-4 bg-[#0a0a0a] text-white">
      <input
        placeholder="Search Products"
        className="rounded-xl w-[85%] md:w-[500px] border-[1px] border-gray-400 p-3 bg-[#0a0a0a]"
        value={searchText}
        onChange={onChangeHandler}
      />
      <CloseIcon onClick={toggleSearch(false)} className="cursor-pointer" />
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="top"
        open={isSearch}
        onClose={toggleSearch(false)}
        onOpen={toggleSearch(true)}
      >
        {content}
      </SwipeableDrawer>
    </div>
  );
}
