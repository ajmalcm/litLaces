import React from "react";

const LatestOrdersCard = ({
  image,
  customer,
  amount,
  status,
  id,
  itemsCount,
  paidAt
}: {
  image: any;
  customer: string;
  amount: string;
  status: string;
  id: string;
  itemsCount:number;
  paidAt:string;
}) => {
  return (
    <div className="relative">
    <li className="flex items-center justify-between bg-gray-800 p-4 rounded-md shadow">
      <div className="flex items-center gap-4">
        {/* Order Image */}
        <img
          src={image}
          alt={customer}
          className="w-24 h-24 rounded-sm object-cover"
        />
        {/* Order Details */}
        <div>
          <p className="font-medium text-white">{customer}</p>
          <p className="text-sm text-gray-500">
            {id.length > 6 ? id.slice(0, 6) + "..." : id}
          </p>
        </div>
      </div>
      {/* Order Status and Amount */}
      <div className="text-right">
        <p className="font-medium text-green-400">{amount}</p>
        <p
          className={`text-sm ${
            status === "Delivered"
              ? "text-green-500"
              : status === "Pending"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {status}
        </p>
      </div>
    </li>
    <p className="absolute  -top-2 -right-2 bg-[#0a0a0a] text-white text-xs px-2 py-1 rounded-full  ">{itemsCount}</p>
    <p className="absolute text-gray-300 text-xs bottom-2 right-3"><strong>PaidAt: </strong>{new Date(paidAt).toLocaleDateString()}</p>
    </div>
  );
};

export default LatestOrdersCard;
