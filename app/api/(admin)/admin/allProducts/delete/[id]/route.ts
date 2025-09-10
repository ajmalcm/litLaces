import { connectDB } from "@/lib/db/connection";
import sneakerModel from "@/lib/db/models/sneaker.model";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const DELETE=async(re:NextRequest,{params}:{params:Promise<{id:String}>})=>
{
    try{
        const {id}=await params;
        if(!id)
            {
                return NextResponse.json({message:"Product id is required"},{status:400})
            }
        await connectDB();
        const product=await sneakerModel.findByIdAndDelete(id);
        if(!product)
            {
                return NextResponse.json({message:"Product not found"},{status:404})
            }

            product.images.forEach(async (image:{public_id:string,url:string}) => {
                if (image.public_id) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
                
            })
        return NextResponse.json({success:true,message:"Product deleted successfully"},{status:200});
        
    }
    catch(err)
    {
        console.log("error in delete product",err);
        return NextResponse.json({success:false,message:"Internal server error"},{status:500})
    }
}