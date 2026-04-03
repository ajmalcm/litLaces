import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { Order } from "@/lib/db/models/order.model";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import sendEmail from '@/lib/email';
import { orderConfirmationTemplate, adminOrderNotificationTemplate } from '@/lib/emailTemplates';

export const POST=async(req:NextRequest)=>{
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

                // send confirmation email (best-effort)
                try {
                    await sendEmail({
                        to: shippingInfo.email,
                        subject: 'Order Confirmation — Lit Laces',
                        html: orderConfirmationTemplate(order),
                    });
                } catch (e) {
                    console.error('Failed to send order confirmation email', e);
                }
                // notify admin (best-effort) if ADMIN_EMAIL is configured
                try {
                    const adminEmail = process.env.ADMIN_EMAIL;
                    if (adminEmail) {
                        const site = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://lit-laces.vercel.app';
                        const adminOrderUrl = `${site.replace(/\/$/, '')}/admin/allOrders/${order._id}`;
                                                await sendEmail({
                                                        to: adminEmail,
                                                        subject: `New order placed — ${order._id}`,
                                                        html: adminOrderNotificationTemplate(order, user as any),
                                                });
                    }
                } catch (e) {
                    console.error('Failed to send admin notification email', e);
                }

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
            message:"error placing order.",
            error
        },{status:501})
    }
}
