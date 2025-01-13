'use client'

import React from "react";
import { orders } from "@/utils/temp"; // Assuming the orders are coming from a mock data file
import Image from "next/image"; // Importing Image component
import { useParams } from "next/navigation";
import Link from "next/link";
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { CheckCircle, LocalShipping, CheckCircleOutline } from '@mui/icons-material';
import OrderProductCard from "@/components/OrderProductCard";

const OrderDetails = () => {
  const { id } = useParams(); // Get the dynamic orderId from the URL

  // Find the order by ID
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return <div>Order not found!</div>;
  }

  // Define order statuses
  const statusStages = ["Order Placed", "Shipped", "Delivered"];
  const currentStatusIndex = statusStages.indexOf(order.status);

  // Icons for each step
  const stepIcons = [
    <CheckCircleOutline />,
    <LocalShipping />,
    <CheckCircle />
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-4 mb-6">
          Order Details - {order.id}
        </h1>

        {/* Order Status Tracker as Stepper */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Order Status</h2>
          <Stepper activeStep={currentStatusIndex} alternativeLabel connector={<StepConnector />} className="my-4">
            {statusStages.map((stage, index) => (
              <Step key={index} title={stage}>
                <StepLabel
                  icon={stepIcons[index]}
                //   title={stage}
                  className={`text-center ${index <= currentStatusIndex ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {stage}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {/* Order Details */}
        <OrderProductCard order={order} page='details'/>

        {/* Back Button */}
        <button
          className="bg-gray-800 hover:bg-gray-700 text-sm text-white px-4 py-2 rounded-lg transition"
        >
          <Link href={`/orders`}>Back to Orders</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
