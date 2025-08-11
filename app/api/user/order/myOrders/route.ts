import {Order} from "@/lib/db/models/order.model";
import { connectDB } from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest)=>{
    try{
        await connectDB();
        const user=await isAuthenticatedUser(req);

        if(!user || typeof user !== "object" || !("id" in user)){
            return NextResponse.json({message:"Please login to access User data.",success:false},{status:401});
        }

        const orders=await Order.find({user:user.id}).populate("products.product").sort({createdAt:-1})
        return NextResponse.json({orders,success:true},{status:200})
    }
    catch(err){
        console.error("Error fetching orders:", err);
        return NextResponse.json({message:"Failed to fetch orders",success:false}, {status:500});
    }
}
