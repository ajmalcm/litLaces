import { connectDB } from "@/lib/db/connection";
import { NextResponse, NextRequest } from "next/server";
import sneakerModel from "@/lib/db/models/sneaker.model";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { name, brand, category, gender, sizes, price, images, description } =
      await req.json();
    if (
      !name ||
      !brand ||
      !category ||
      !gender ||
      !sizes ||
      !price ||
      !images ||
      !description
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    const sneakerExists = await sneakerModel.findOne({ name, brand, category });
    if (sneakerExists) {
      return NextResponse.json(
        { success: false, message: "Product already exists" },
        { status: 400 }
      );
    }
    const uploadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
        use_filename: true,
        unique_filename: false,
      });
      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const product=await sneakerModel.create({
        name,
        brand,
        category,
        gender,
        sizes,
        price,
        images: uploadedImages,
        description,
      });
      return NextResponse.json({success:true,data:product,message:"Product Uploaded Successfully"},{status:201});

  } catch (err: any) {
    console.log("erroradmin/addProduct/route.ts", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
