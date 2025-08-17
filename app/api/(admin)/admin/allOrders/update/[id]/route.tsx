import { Order } from "@/lib/db/models/order.model"; 
import { connectDB } from "@/lib/db/connection";
// import { isAuthenticatedUser } from "@/lib/middleware/auth";
import { NextRequest,NextResponse } from "next/server";

export const POST=async(req:NextRequest,{params}:{params:Promise<{id:String}>})=>{
    try{
        await connectDB();
        const {status}=await req.json();
        const {id}=await params;
        const order=await Order.findByIdAndUpdate(id,{deliveryStatus:status});
        if(!order)
        {
            return NextResponse.json({success:false,message:"Order Not Found"});
        }
        return NextResponse.json({success:true,message:'OrderStatus Updated',order})
        // const user=await isAuthenticatedUser(req);

    }
    catch(error)
    {
          console.error("Error updating orderStatus:", error);
            return NextResponse.json([], { status: 500 });
    }
}