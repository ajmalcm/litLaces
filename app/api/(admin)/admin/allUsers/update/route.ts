import { connectDB } from "@/lib/db/connection";
import { NextResponse,NextRequest } from "next/server";
import userModel from "@/lib/db/models/user.model";


export const POST=async(req:NextRequest)=>{
    try{
        await connectDB();
        const {id,name,email,role}=await req.json();
        if(!id || !name || !email|| !role){
            return NextResponse.json({message:"All fields are required"},{status:400})
        }
        const user=await userModel.findByIdAndUpdate(id,{name,email,role},{new:true});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        return NextResponse.json({success:true,user,message:"User updated successfully."},{status:200});
    }
    catch(err:any){
        console.log("errorAlluser/update/route.ts",err.message);
        return NextResponse.json({message:err.message},{status:500})
    }
}