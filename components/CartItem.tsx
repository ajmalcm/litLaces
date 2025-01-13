import React from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const CartItem = ({
  img,
  name,
  price,
  size,
}: {
  img: any;
  name: string;
  price: number;
  size: string;
}) => {
  return (
    <div className="flex items-center justify-between border-t border-b border-gray-600 py-6 flex-wrap">
      {/* Product Details */}
      <div className="flex items-center">
        <div className="w-28 h-28 relative rounded-lg overflow-hidden">
          <Image
            src={img} // Replace with the actual image path
            alt={name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="ml-6">
          <h2 className="text-md md:text-lg font-semibold uppercase">{name}</h2>
          <p className="text-sm text-gray-400 mt-1">SIZE: {size}</p>
          <p className="text-md md:text-xl font-bold mt-3">Rs. {price}</p>
        </div>
      </div>

      {/* Quantity and Delete */}
      <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0">
        <div className="flex items-center border border-gray-500 rounded overflow-hidden">
          <IconButton
            size="small"
            className="text-white p-1"
            aria-label="decrease quantity"
          >
            <RemoveIcon />
          </IconButton>
          <span className="px-4 text-lg font-semibold">1</span>
          <IconButton
            size="small"
            className="text-white p-1"
            aria-label="increase quantity"
          >
            <AddIcon />
          </IconButton>
        </div>
        <IconButton
          size="medium"
          className="text-gray-400 ml-4"
          aria-label="delete item"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
