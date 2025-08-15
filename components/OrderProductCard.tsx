import Link from "next/link";
import React from "react";

const OrderProductCard = ({ order, page }: { order: any; page: string }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl mb-6 border border-gray-800">
      {/* Order Details */}
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">Order ID:</span>{" "}
            {order._id}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">Date:</span>{" "}
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })
              : ""}
          </p>
        </div>
        <div className="text-right">
          <p
            className={`text-lg text-left font-medium ${
              order.status === "Delivered" ? "text-green-600" : "text-red-700"
            } `}
          >
            {order.deliveryStatus}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            <span className="font-medium text-white">Total:</span>{" "}
            {order.totalAmount - order.shippingPrice} + {order.shippingPrice}
          </p>
        </div>
      </div>

      {/* Order Items */}
      {order.orderItems.map((item: any, index: any) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
        >
          <div className="relative w-20 h-20">
            {" "}
            {/* Further reduced size */}
            <img
              src={item.image}
              alt={item.name}
              className="rounded-lg border border-gray-800 object-cover w-full h-full"
            />
            <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
              x{item.quantity}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-medium">{item.name}</h2>
            <p className="text-sm text-gray-400">{item.size}</p>
            <p className="text-sm text-gray-400">₹ {item.price}</p>
          </div>
        </div>
      ))}

      {/* Order Summary */}
      <div className="flex justify-between mt-4">
        <p className="text-sm text-gray-400">
          <span className="font-medium text-white">Grand Total:</span>{" "}
         ₹ {order.totalAmount}
        </p>
        <button
          className={`${
            page === "details" ? "hidden" : "block"
          } bg-gray-800 hover:bg-gray-700 text-sm text-white px-4 py-2 rounded-lg transition`}
        >
          <Link href={`/orders/${order._id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderProductCard;
