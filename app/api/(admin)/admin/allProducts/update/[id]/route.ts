import { connectDB } from "@/lib/db/connection";
import { NextResponse,NextRequest } from "next/server";
import sneakerModel from "@/lib/db/models/sneaker.model";
import { v2 as cloudinary } from "cloudinary";

//to update product
export const POST = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();
    const { id } = await params;
    const { name, brand, category, gender, sizes, price, images, description } = await req.json();

    if (!name || !brand || !category || !gender || !sizes || !price || !images || !description) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // validation checks...
    const nameExists = await sneakerModel.findOne({ name, brand, category, _id: { $ne: id } });
    if (nameExists) {
      return NextResponse.json({ message: "Product with same name, brand and category already exists" }, { status: 400 });
    }

    let uploadedImages: { public_id: string; url: string }[] = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      // If image already has public_id, keep it (unchanged)
      if (img.public_id && img.url) {
        uploadedImages.push(img);
      } else {
        // Upload only new images
        const result = await cloudinary.uploader.upload(img, {
          folder: "products",
        });
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    const updatedProduct = await sneakerModel.findByIdAndUpdate(
      id,
      { name, brand, category, gender, sizes, price, images: uploadedImages, description },
      { new: true }
    );

    return NextResponse.json({ message: "Product updated successfully", updatedProduct }, { status: 200 });
  } catch (err) {
    console.error("Error updating product:", err);
    return NextResponse.json({ success: false, message: "Unable to update product" }, { status: 500 });
  }
};
