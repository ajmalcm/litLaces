"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, Mail, Phone, MapPin, Building, Map, Hash } from "lucide-react";
import Link from "next/link";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import {
  CheckCircle,
  LocalShipping,
  CheckCircleOutline,
} from "@mui/icons-material";
import OrderProductCard from "@/components/OrderProductCard";
import { useGetOrderDetailsQuery, useUpdateOrderStatusMutation } from "@/redux/services/userReducers";
import OrderDetailsSkeletonLoader from "@/components/loaders/OrderDetailsLoader";
import { toast } from "sonner";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderDetails, isLoading,refetch } = useGetOrderDetailsQuery({ id: id });
  const [updateOrderMutation] = useUpdateOrderStatusMutation();

  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const statusStages = ["Pending", "Shipped", "Delivered"];
  const currentStatusIndex = statusStages.indexOf(
    orderDetails?.order?.deliveryStatus ?? ""
  );

  const stepIcons = [
    <CheckCircleOutline key="pending" />,
    <LocalShipping key="shipped" />,
    <CheckCircle key="delivered" />,
  ];

  // useEffect(() => {
  //   // if (orderDetails?.success && orderDetails.order.deliveryStatus !== deliveryStatus) {
  //   //   setIsConfirmVisible(true);
  //   //   // console.log("Delivery Status:", orderDetails.order.deliveryStatus);
  //   //   // console.log("Current Delivery Status:", deliveryStatus);
  //   // }
  //   // else
  //   //   setIsConfirmVisible(false);
  // }, [deliveryStatus, orderDetails?.order?.deliveryStatus]);

  const onSelectChangehandler = (e: any) => {
    setDeliveryStatus(e.target.value);
    if(e.target.value !== orderDetails?.order?.deliveryStatus) {
      setIsConfirmVisible(true);
    }
    else
    {
      setIsConfirmVisible(false);
    }
  }


  const setUpdateHandler = async () => {
    await updateOrderMutation({id:id,status:deliveryStatus}).then((res)=>{
      if(res.data?.success) {
        refetch();
        setIsConfirmVisible(false);
        toast.success(res?.data.message || "Order status updated successfully.");
      }
    }).catch((error) => {
      console.error("Error updating order status:", error);
      setIsConfirmVisible(false);
      toast.error("Failed to update order status.");
    });
  };

  // ✅ Handle loading first
  if (isLoading) {
    return <OrderDetailsSkeletonLoader />;
  }

  // ✅ Then handle error case
  if (!orderDetails?.success) {
    return <div>Order not found!</div>;
  }

  const shipping = orderDetails?.order?.shippingInfo;
  const items = [
    {
      icon: <User size={16} />,
      value: `${shipping?.firstName} ${shipping?.lastName}`,
    },
    { icon: <Mail size={16} />, value: shipping?.email },
    { icon: <Phone size={16} />, value: shipping?.phoneNo },
    { icon: <MapPin size={16} />, value: shipping?.address },
    { icon: <Building size={16} />, value: shipping?.city },
    { icon: <Map size={16} />, value: shipping?.state },
    { icon: <Hash size={16} />, value: shipping?.pinCode },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 flex-1">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-4 mb-6">
          Order Details -{" "}
          {orderDetails?.order?.createdAt
            ? new Date(orderDetails.order.createdAt).toLocaleDateString(
                "en-IN",
                { timeZone: "Asia/Kolkata" }
              )
            : ""}
        </h1>

        {/* Order Status Tracker */}
        <div className="mb-6">
          <div className="flex gap-4 w-full relative">
            <h2 className="text-sm font-semibold text-white md:text-xl">Order Status</h2>
            <select
              value={deliveryStatus}
              onChange={onSelectChangehandler}
              className="bg-gray-900 font-mono text-sm p-1 md:text-md md:p-2 rounded-lg"
            >
              <option className="bg-gray-900 font-mono text-sm p-1 md:text-md md:p-2 rounded-lg">
                {orderDetails?.order?.deliveryStatus}
              </option>
              {orderDetails?.order?.deliveryStatus === "Pending" ? (
                <option className="bg-gray-900 font-mono text-sm p-1 md:text-md md:p-2 rounded-lg">
                  Shipped
                </option>
              ) : (
                <option className="bg-gray-900 font-mono text-sm p-1 md:text-md md:p-2 rounded-lg">
                  Delivered
                </option>
              )}
            </select>

            {isConfirmVisible && (
              <button
                onClick={setUpdateHandler}
                className="bg-green-600 text-white text-sm md:text-md px-2 py-1 md:text-md md:px-4 md:py-2 rounded-sm md:rounded-md hover:bg-green-700 transition absolute right-0 top-0"
              >
                Confirm Status
              </button>
            )}
          </div>

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
                  className={`${
                    index <= currentStatusIndex
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  {stage}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {/* Shipping Details Card */}
        <div className="relative rounded-xl p-6 mb-8 border border-gray-800 bg-gray-900/70 backdrop-blur-md shadow-lg overflow-hidden">
          <h3 className="text-lg font-semibold mb-4 text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
            Shipping Details
          </h3>

          <div className="divide-y divide-gray-800 rounded-lg overflow-hidden">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 bg-gray-800/40"
              >
                <span className="text-indigo-400">{item.icon}</span>
                <span className="text-gray-100 font-medium text-sm leading-snug break-words max-w-[85%]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <OrderProductCard order={orderDetails?.order} page="details" />

        {/* Back Button */}
        <button className="bg-gray-800 hover:bg-gray-700 text-sm text-white px-4 py-2 rounded-lg transition">
          <Link href={`/admin/allOrders`}>Back to All Orders</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
