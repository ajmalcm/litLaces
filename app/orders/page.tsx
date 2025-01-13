import React from "react";
import Image from "next/image";
import { orders } from "@/utils/temp";
import Link from "next/link";
import OrderProductCard from "@/components/OrderProductCard";

export default function MyOrders() {
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
