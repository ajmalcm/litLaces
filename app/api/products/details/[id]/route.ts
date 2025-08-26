import sneakerModel from "@/lib/db/models/sneaker.model";

import { connectDB } from "@/lib/db/connection";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export const GET=async(req:NextRequest,{params}:{params:Promise<{id:String}>})=>{
    const {id}=await params; // Await params!
    try{
        await connectDB();
        const product=await sneakerModel.findById(id);
        if(!product){
            return NextResponse.json({message:"Product not found"},{status:404});
        }
        let relatedProducts=await sneakerModel.find({
            $or: [{ category: product.category }, { brand: product.brand }],
        })
        
        if(relatedProducts.length<4)
        {
            const excludeIds=[id,...relatedProducts.map(item=>item._id.toString())];
            const additionalProducts=await sneakerModel.aggregate([
                {$match:{_id:{$nin:excludeIds.map(_id=>new mongoose.Types.ObjectId(_id))}}},
                {$sample:{size:4-relatedProducts.length}}
            ])
            relatedProducts=[...relatedProducts,...additionalProducts];
        }

         relatedProducts = relatedProducts.slice(0, 4); // Limit to 4 related products
        return NextResponse.json({success:true, product, relatedProducts }, { status: 200 });
    }
    catch(err)
    {
        console.error("Error fetching product:", err);
        return NextResponse.json({success:false, message: "Unable to fetch product" }, { status: 500 });
    }
}
