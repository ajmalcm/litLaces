'use client'

import React from "react";
import { useParams } from "next/navigation";
import { User, Mail, Phone, MapPin, Building, Map, Hash } from "lucide-react";
import Link from "next/link";
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { CheckCircle, LocalShipping, CheckCircleOutline } from '@mui/icons-material';
import OrderProductCard from "@/components/OrderProductCard";
import { useGetOrderDetailsQuery } from "@/redux/services/userReducers";
import OrderDetailsSkeletonLoader from "@/components/loaders/OrderDetailsLoader";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderDetails, isLoading } = useGetOrderDetailsQuery({ id: id });

  if (!orderDetails?.success) {
    return <div>Order not found!</div>;
  }

  const statusStages = ["Pending", "Shipped", "Delivered"];
  const currentStatusIndex = statusStages.indexOf(orderDetails?.order?.deliveryStatus);

  const stepIcons = [
    <CheckCircleOutline key="pending" />,
    <LocalShipping key="shipped" />,
    <CheckCircle key="delivered" />
  ];

  const shipping = orderDetails?.order?.shippingInfo;
  const items = [
    { icon: <User size={16} />, value: `${shipping?.firstName} ${shipping?.lastName}` },
    { icon: <Mail size={16} />, value: shipping?.email },
    { icon: <Phone size={16} />, value: shipping?.phoneNo },
    { icon: <MapPin size={16} />, value: shipping?.address },
    { icon: <Building size={16} />, value: shipping?.city },
    { icon: <Map size={16} />, value: shipping?.state },
    { icon: <Hash size={16} />, value: shipping?.pinCode },
  ];

  return  isLoading?(<OrderDetailsSkeletonLoader/>):
   ( <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-4 mb-6">
          Order Details -{" "}
          {orderDetails?.order?.createdAt
            ? new Date(orderDetails?.order?.createdAt).toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
              })
            : ""}
        </h1>

        {/* Order Status Tracker */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Order Status</h2>
          <Stepper
            activeStep={currentStatusIndex}
            alternativeLabel
            connector={<StepConnector />}
            className="my-4"
          >
            {statusStages.map((stage, index) => (
              <Step key={index} title={stage}>
                <StepLabel
                  icon={stepIcons[index]}
                  className={`${index <= currentStatusIndex ? 'text-green-500' : 'text-gray-400'}`}
                >
                  {stage}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {/* Shipping Details Card */}

        {/* Order Items */}
        <OrderProductCard order={orderDetails?.order} page="details" />

 <div className="relative rounded-xl p-6 mb-8 border border-gray-800 bg-gray-900/70 backdrop-blur-md shadow-lg overflow-hidden">
      {/* Gradient accent bar */}
      <h3 className="text-lg font-semibold mb-4 text-white tracking-tight flex items-center gap-2">
        <span className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
        Shipping Details
      </h3>

      {/* Items with constant background & divider */}
      <div className="divide-y divide-gray-800 rounded-lg overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 bg-gray-800/40">
            <span className="text-indigo-400">{item.icon}</span>
            <span className="text-gray-100 font-medium text-sm leading-snug break-words max-w-[85%]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>

        {/* Back Button */}
        <button
          className="bg-gray-800 hover:bg-gray-700 text-sm text-white px-4 py-2 rounded-lg transition"
        >
          <Link href={`/orders`}>Back to Orders</Link>
        </button>
</div>


      </div>)
    
  
};

export default OrderDetails;
