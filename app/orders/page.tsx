
"use client";
import React from "react";
import { orders } from "@/utils/temp";
import OrderProductCard from "@/components/OrderProductCard";
import { useGetMyOrdersQuery } from "@/redux/services/userReducers";

export default function MyOrders() {

  const {data}=useGetMyOrdersQuery("");
  console.log(data);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-4 mb-6">
          My Orders
        </h1>
        {orders.map((order,index) => (
         <OrderProductCard key={index} order={order} page="orders"/>
        ))}
      </div>
    </div>
  );
}
