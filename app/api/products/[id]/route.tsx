import sneakerModel from "@/lib/db/models/sneaker.model";

import { connectDB } from "@/lib/db/connection";
import { NextResponse,NextRequest } from "next/server";

export const GET =async (req:Request,{params}:{params:{id:String}})=>{
    try{
        await connectDB();
        if(params.id==="all")
        {
            const sneakers=await sneakerModel.find();
            if(!sneakers || sneakers.length===0)
            {
                return NextResponse.json({message:"No products found"}, {status:404});
            }
            return NextResponse.json(sneakers, {status:200});
        }
        const sneakersCategory=await sneakerModel.find({category:params.id});
        const sneakersBrand=await sneakerModel.find({brand:params.id});
        const sneakers=[...sneakersCategory,...sneakersBrand];
        if(!sneakers || sneakers.length===0)
        {
            return NextResponse.json({message:"No products found"}, {status:404});
        }
        return NextResponse.json(sneakers, {status:200});
    }
    catch
(err)
    {
        console.error("Error fetching products:", err);
        return NextResponse.json({message:"Unable to fetch products"}, {status:500});
    }
}