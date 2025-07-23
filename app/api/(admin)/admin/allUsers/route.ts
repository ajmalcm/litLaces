import userModel from "@/lib/db/models/user.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";

export const  GET=async (res:NextResponse)=>{
    try{
        await connectDB();
        const users=await userModel.find({}).sort({createdAt:-1}).exec();
        if(!users || users.length===0){
            return NextResponse.json({message:"No users found"},{status:404});
        }
        return NextResponse.json(users,{status:200});
    }
    catch(error){
        console.error("Error fetching users:",error);
        return NextResponse.json([], {status:500});
    }
}