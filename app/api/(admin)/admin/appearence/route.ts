import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Banner from "@/lib/db/models/banner.model";

export const GET=async(req:NextRequest)=>{
    try{
       await connectDB();
        const dynamicUI=await Banner.find(); // since there will be only one document
        return NextResponse.json({data:dynamicUI},{status:200});
    }
    
    catch(error)
    {
        console.log("error at /api/(admin)/admin/appearence/get",error);
        return NextResponse.json({message:"error on get Request api/(admin)/admin/appearence"},{status:500});
    }
}