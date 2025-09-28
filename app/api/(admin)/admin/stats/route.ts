import { connectDB } from "@/lib/db/connection";
import { NextRequest,NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import userModel from "@/lib/db/models/user.model";
import { Order } from "@/lib/db/models/order.model";
import sneakerModel from "@/lib/db/models/sneaker.model";


export async function GET(request:NextRequest)
{
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

        // Example: return some stats data for admin
        return NextResponse.json({ message: "Admin stats fetched successfully" }, { status: 200 });
    }
    catch(error)
    {
        console.log("error in admin stats",error)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}