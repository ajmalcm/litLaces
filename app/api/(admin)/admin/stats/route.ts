import { connectDB } from "@/lib/db/connection";
import { NextRequest,NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import userModel from "@/lib/db/models/user.model";
import { Order } from "@/lib/db/models/order.model";
import sneakerModel from "@/lib/db/models/sneaker.model";


export async function GET(request:NextRequest)
{

    //thing to populate
    //total revenue
    //total orders
    //total products
    //total users
    //out of stock products and in stock products (for pie chart)
    //last 5 orders
    //last 7 months income data (for line chart)
    //last 7 months order count data (for bar chart)
    //last 7 days income data (for area chart)
    try{
        await connectDB();
        const user = await isAuthenticatedUser(request);
        if(!user || typeof user !== "object" || !("id" in user)){
            return NextResponse.json({message:"Please login to access cart data.",success:false},{status:401});
        }
        const adminUser = await userModel.findById(user.id);
        if(!adminUser || adminUser.role !== "admin"){
            return NextResponse.json({message:"Access denied. Admins only.",success:false},{status:403});
        }

        const totalRevenueAgg = await Order.aggregate([
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$totalAmount" }
            }
          }
        ]);
        const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].totalAmount : 0;
        const totalOrders=await Order.countDocuments();
        const totalUsers=await userModel.countDocuments();
        const totalProducts=await sneakerModel.countDocuments();
        // Out of stock: all sizes have stock 0
        const outOfStockProducts = await sneakerModel.countDocuments({
          sizes: { $not: { $elemMatch: { stock: { $gt: 0 } } } }
        });
        // In stock: at least one size has stock > 0
        const inStockProducts = await sneakerModel.countDocuments({
          "sizes.stock": { $gt: 0 }
        });
        //last 5 orders
        const last5Orders=await Order.find().sort({createdAt:-1}).limit(5);
        // Example: return some stats data for admin
        return NextResponse.json({ message: "Admin stats fetched successfully" ,totalOrders,totalUsers,totalProducts,outOfStockProducts,inStockProducts,totalRevenue,last5Orders}, { status: 200 });
    }
    catch(error)
    {
        console.log("error in admin stats",error)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}