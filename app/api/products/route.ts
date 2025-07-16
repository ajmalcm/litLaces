import { connectDB } from "@/lib/db/connection";
import { NextRequest } from "next/server";

import sneakerModel from "@/lib/db/models/sneaker.model";

export async function GET(req:NextRequest){
    try{
        await connectDB();
        const sneakers=await sneakerModel.find();
        return Response.json({
            success:true,
            sneakers,
            message:"Sneakers fetched successfully"
        }, { status: 200 });
    }
    catch(error)
{
   return Response.json({
    success:false,
    message:"Unable to fetch sneakers"
}, { status: 500
   }
) 
}
}