
"use client";
import React from "react";
import OrderProductCard from "@/components/OrderProductCard";
import MyOrdersSkeleton from "@/components/loaders/OrderDetailsLoader";
import { useGetMyOrdersQuery } from "@/redux/services/userReducers";

export default function MyOrders() {

  const {data:orderData,isLoading}=useGetMyOrdersQuery("");
  console.log(orderData);

  return isLoading?(<MyOrdersSkeleton/>):
    (<div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-4 mb-6">
          My Orders
        </h1>
        {orderData?.orders.map((order:any,index:number) => (
         <OrderProductCard key={index} order={order} page="orders"/>
        ))}
      </div>
    </div>)
    
  
}
