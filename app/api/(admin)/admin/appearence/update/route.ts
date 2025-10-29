import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Banner from "@/lib/db/models/banner.model";

export const GET=async(req:NextRequest)=>{
    try{
       await connectDB();
       const {heroL,heroSM,banner1,banner2,banner3}=await req.json();
        const dynamicUI=await Banner.find(); // since there will be only one document
    }
    
    catch(error)
    {
        console.log("error at /api/(admin)/admin/appearence/update",error);
        return NextResponse.json({message:"error on post Request api/(admin)/admin/appearence/update"},{status:500});
    }
}