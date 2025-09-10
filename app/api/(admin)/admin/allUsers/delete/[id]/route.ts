import { connectDB } from "@/lib/db/connection";
import userModel from "@/lib/db/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:String}>})
{
    try{

        const {id}=await params;
        if(!id)
            {
                return NextResponse.json({message:"User id is required"},{status:400})
            }
            await connectDB();
            const user=await userModel.findByIdAndDelete(id);
            if(!user)
            {
                return NextResponse.json({message:"User not found"},{status:404})
            }
            if(user.avatar && user.avatar.public_id)
            {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }

            return NextResponse.json({success:true,message:"User deleted successfully"},{status:200});

    }
    catch(err)
    {
        console.log("error in delete user",err);
        return NextResponse.json({success:false,message:"Internal server error"},{status:500})
    }
}