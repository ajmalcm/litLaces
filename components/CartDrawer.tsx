"use client"

import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { CartItem } from "./CartItem";
import Link from "next/link";
import { useGetCartQuery } from "@/redux/services/userReducers";
import { useSelector ,useDispatch} from "react-redux";
import { toast } from "sonner";
import { setCart } from "@/redux/reducers/userSlice";

export default function TopDrawer({
  isCart,
  toggleCart,
}: {
  isCart: boolean;
  toggleCart: any;
}) {

  const [cartTotal, setCartTotal] = React.useState(0);
  const {data:cartData, isLoading:cartLoading, error:cartError} = useGetCartQuery("");
  const {cart}=useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    if(cartData && cartData.success) {
      console.log("Cart Data:", cartData);
      dispatch(setCart(cartData.cartItems.cartItems));
    }
    if(cartError) {
      if ("data" in cartError) {
        const errorMessage = (cartError.data as { message: string })?.message;
        toast.error(errorMessage);
      }
    }

  },[isCart])

  React.useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
      setCartTotal(total);
    } else {
      setCartTotal(0);
    }
  }, [cart]);
 
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
          cart?.map((product:any,index:number)=>(
            // <Link href={`/products/${product._id}`} key={index}>
            <CartItem key={index} img={product.image} name={product.name} price={product.price} size={product.size} quantity={product.quantity} productId={product?.product}/>
            // </Link>
          ))
        }

        {/* Total Section */} 
        <div className="mt-8">
          <div className="flex justify-between items-center text-lg font-bold py-4 border-t border-gray-600">
            <span>Estimated total</span>
            <span>Rs. {cartTotal}</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Taxes, discounts and shipping calculated at checkout.
          </p>
          <Link href="/checkout" onClick={toggleCart(false)}>
          <Button
            variant="contained"
            fullWidth
            className="mt-6 bg-gray-100 text-black hover:bg-gray-300"
          >
            Check out
          </Button>
            </Link>
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
