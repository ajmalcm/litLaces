import { Order } from "@/lib/db/models/order.model"; 
import { connectDB } from "@/lib/db/connection";
// import { isAuthenticatedUser } from "@/lib/middleware/auth";
import { NextRequest,NextResponse } from "next/server";
import sendEmail from '@/lib/email';
import { orderStatusUpdateTemplate } from '@/lib/emailTemplates';

export const POST=async(req:NextRequest,{params}:{params:Promise<{id:String}>})=>{
    try{
        await connectDB();
        const {status}=await req.json();
        const {id}=await params;
                // update and get the new order document
                await Order.findByIdAndUpdate(id, { deliveryStatus: status });
                const order = await Order.findById(id);
        if(!order)
        {
            return NextResponse.json({success:false,message:"Order Not Found"});
        }

                // send status update email (best-effort)
                try {
                    const recipient = order.shippingInfo?.email;
                    if (recipient) {
                        await sendEmail({
                            to: recipient,
                            subject: `Order ${order._id} status updated to ${status}`,
                            html: orderStatusUpdateTemplate(order, status),
                        });
                    }
                } catch (e) {
                    console.error('Failed to send order status email', e);
                }
        return NextResponse.json({success:true,message:'OrderStatus Updated',order})

    }
    catch(error)
    {
          console.error("Error updating orderStatus:", error);
            return NextResponse.json([], { status: 500 });
    }
}