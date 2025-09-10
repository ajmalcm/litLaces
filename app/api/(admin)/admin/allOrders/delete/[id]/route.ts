import { connectDB } from "@/lib/db/connection";
import { Order } from "@/lib/db/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:String}>})
{
    try{
        const {id}=await params;
        if(!id)
            {
                return NextResponse.json({message:"Order id is required"},{status:400})
            }
            await connectDB();
            const order=await Order.findByIdAndDelete(id);
            if(!order)
            {
                return NextResponse.json({message:"Order not found"},{status:404})
            }
            return NextResponse.json({success:true,message:"Order deleted successfully"},{status:200});
    }
    catch(err)
    {
        console.log("error in delete order",err);
        return NextResponse.json({success:false,message:"Internal server error"},{status:500})
    }
}