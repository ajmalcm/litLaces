import { connectDB } from "@/lib/db/connection";
import { NextRequest,NextResponse } from "next/server";
import Razorpay from "razorpay";


const razorpay=new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || ""
})

export const POST=async(req:NextRequest)=>{
    try{
        await connectDB();
        const {amount}=await req.json();
        const order=await razorpay.orders.create({
            amount:amount*100, // Amount in paise
            currency:"INR",
            receipt:"receipt_"+ Math.random().toString(36).substring(2, 15),
        });

        return NextResponse.json({
            id:order.id,success:true},{status:200})
    }
    catch(err){
        console.error("Error creating Razorpay order:", err);
        return NextResponse.json({error:"Failed to create razorpay payment order"}, {status:500});
    }
}