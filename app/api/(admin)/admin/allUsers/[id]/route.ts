import { connectDB } from "@/lib/db/connection";
import userModel from "@/lib/db/models/user.model";
import { NextResponse,NextRequest } from "next/server";


export const GET=async(req:NextRequest,{params}:{params:Promise<{id:String}>})=>{
    try{
        await connectDB();
        const {id}=await params;
        if(!id){
            return NextResponse.json({message:"User id is required"},{status:400})
        }
        const user=await userModel.findById(id).select("-password");
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        return NextResponse.json({success:true,user},{status:200});
    }
    catch(err:any){
        console.log("errorAlluser/[id]/route.ts",err.message);
        return NextResponse.json({message:err.message},{status:500})
    }
}