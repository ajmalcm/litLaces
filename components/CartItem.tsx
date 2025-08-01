import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAddToOrIncreaseCartMutation, useGetCartQuery, useRemoveFromOrDecreaseCartMutation } from "@/redux/services/userReducers";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/reducers/userSlice";
import Link from "next/link";

export const CartItem = ({
  img,
  name,
  price,
  size,
  quantity,
  productId
}: {
  img: any;
  name: string;
  price: number;
  size: string;
  quantity: number;
  productId: string;
}) => {

  const [increaseMutation] = useAddToOrIncreaseCartMutation();
  const [decreaseMutation] = useRemoveFromOrDecreaseCartMutation();
  const {data:cartData, refetch} = useGetCartQuery("");
  const dispatch = useDispatch();

  const inCreaseQty=async()=>{
    const {data, error} = await increaseMutation({action:"add",product:{productId,quantity:1,size,price,name,image:img}});
    if (data?.success) {
      console.log("Increased quantity successfully:", data);
      refetch();
            dispatch(setCart(data?.cartItems));
    }
    if (error) {
      console.error("Error increasing quantity:", error);
    }
  }

  const deCreaseQty=async()=>{
    const {data, error} = await decreaseMutation({productId,action:"minus"});
    if (data?.success) {
      console.log("Decreased quantity successfully:", data);
      refetch();
            dispatch(setCart(cartData?.cartItems?.cartItems));
    }
    if (error) {
      console.error("Error decreasing quantity:", error);
    }
  }

  const handleDelete=async()=>{
    const {data, error} = await decreaseMutation({productId,action:"removeFromCart"});
    if (data?.success) {
      console.log("Item removed successfully:", data);
      refetch();
      dispatch(setCart(cartData?.cartItems?.cartItems));

      toast.success(data?.message)
      // refetch();
    }
    if (error) {
      console.error("Error removing item:", error);
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-b border-gray-600 py-6 flex-wrap">
      {/* Product Details */}
      <Link href={`/products/${productId}`} className="flex items-center">
        <div className="w-28 h-28 relative rounded-lg overflow-hidden">
          <img
            src={img.url} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-6">
          <h2 className="text-md md:text-lg font-semibold uppercase text-white">{name}</h2>
          <p className="text-sm text-gray-400 mt-1">SIZE: {size}</p>
          <p className="text-md md:text-xl font-bold mt-3">Rs. {price}</p>
        </div>
      </Link>

      {/* Quantity and Delete */}
      <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0">
        <div className="flex items-center border border-gray-500 rounded overflow-hidden">
          <IconButton
            size="small"
            className="text-white p-1"
            aria-label="decrease quantity"
            onClick={deCreaseQty}
          >
            <RemoveIcon />
          </IconButton>
          <span className="px-4 text-lg font-semibold text-white">{quantity}</span>
          <IconButton
            size="small"
            className="text-white p-1"
            aria-label="increase quantity"
            onClick={inCreaseQty}
          >
            <AddIcon />
          </IconButton>
        </div>
        <IconButton
          size="medium"
          className="text-gray-400 ml-4"
          aria-label="delete item"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
