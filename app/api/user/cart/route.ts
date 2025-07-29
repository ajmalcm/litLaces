import cartModel from "@/lib/db/models/cart.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/lib/middleware/auth";

export async function GET(req:NextRequest){
    try{
        await connectDB();
        const user=await isAuthenticatedUser(req);
        if(!user || typeof user !== "object" || !("id" in user)){
            return NextResponse.json({message:"Please login to access cart data.",success:false},{status:401});
        }
        const cartItems = await cartModel.findOne({user:user.id}).populate("cartItems","name price images").populate("user","name email");
        if(!cartItems){
            return NextResponse.json({message:"Cart is empty.",success:false},{status:404});
        }
        return NextResponse.json({success:true,cartItems,message:"Cart fetched successfully."},{status:200});
    }
    catch(error){
        console.error("GET /api/user/cart Error:", error);
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500});
    }
}