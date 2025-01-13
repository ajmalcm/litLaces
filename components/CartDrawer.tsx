import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { CartItem } from "./CartItem";
import Link from "next/link";
import { ProductsArray } from "@/utils/temp";

export default function TopDrawer({
  isCart,
  toggleCart,
}: {
  isCart: boolean;
  toggleCart: any;
}) {
  const content = (
    <div className=" bg-[#0f0f0f] text-white ">
        <div className="max-w-5xl mx-auto p-4 md:py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Your cart</h1>
          <CloseIcon onClick={toggleCart(false)} className="cursor-pointer" /> 
        </div>

        {/* Cart Item */}
        {
          ProductsArray.slice(0,4).map((product,index)=>(
            <Link href={`/products/${product.productName}`} key={index}>
            <CartItem img={product.img} name={product.productName} price={product.price} size={product.size}/>
            </Link>
          ))
        }

        {/* Total Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center text-lg font-bold py-4 border-t border-gray-600">
            <span>Estimated total</span>
            <span>Rs. 2,699.00</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Taxes, discounts and shipping calculated at checkout.
          </p>
          <Button
            variant="contained"
            fullWidth
            className="mt-6 bg-gray-100 text-black hover:bg-gray-300"
          >
            <Link href="/checkout" onClick={toggleCart(false)}>
            Check out
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isCart}
        onClose={toggleCart(false)}
        onOpen={toggleCart(true)}
      >
        {content}
      </SwipeableDrawer>
    </div>
  );
}
