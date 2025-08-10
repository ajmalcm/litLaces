import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { Order } from "@/lib/db/models/order.model";
import { isAuthenticatedUser } from "@/lib/middleware/auth";

export const POST=async(req:NextRequest,res:NextResponse)=>{
    try{
        await connectDB();
        const user=await isAuthenticatedUser(req);
        if(!user || typeof user !== "object" || !("id" in user)){
            return NextResponse.json({message:"Please login to access cart data.",success:false},{status:401});
        }
        const {orderItems,shippingInfo,paymentInfo,isPaid,itemsPrice,shippingPrice,totalAmount}=await req.json();
        const order =await Order.create({
            user:user?.id,
            orderItems,
            shippingInfo,
            paymentInfo,
            paidAt:Date.now(),
            itemsPrice,
            shippingPrice,
            totalAmount,
            isPaid,
        })

        return NextResponse.json({
            success:true,
            order,
            message:"Order placed successfully."
        },{status:201})
    }
    catch(error)
    {
        console.log("error at /api/user/order/createOrder/route")
        return NextResponse.json({
            success:false,
            message:"error placing order."
        },{status:501})
    }
}
