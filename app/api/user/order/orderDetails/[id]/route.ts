import { Order } from "@/lib/db/models/order.model";
import { connectDB } from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req:NextRequest,{params}:{params:Promise<{id:String}>})=>{
    try{
        await connectDB();
        const user=await isAuthenticatedUser(req);
        if(!user || typeof user !== "object" || !("id" in user)){
            return NextResponse.json({message:"Please login to access order data.",success:false},{status:401})
        }
        const { id } =await params;
        const order=await Order.findById(id)
        if(!order){
            return NextResponse.json({message:"Order not found.",success:false},{status:404})
        }
        return NextResponse.json({order,success:true},{status:200})
    }
    catch(err){
        console.error("Error fetching order details:", err);
        return NextResponse.json({message:"Failed to fetch order details",success:false}, {status:500})
    }
}