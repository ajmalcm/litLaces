import { connectDB } from "@/lib/db/connection";
import { NextResponse, NextRequest } from "next/server";
import sneakerModel from "@/lib/db/models/sneaker.model";
import { v2 as cloudinary } from "cloudinary";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();
    const { id } = await params;
    const { name, brand, category, gender, sizes, price, images, description } = await req.json();

    if (!name || !brand || !category || !gender || !sizes || !price || !images || !description) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check duplicates
    const nameExists = await sneakerModel.findOne({ name, brand, category, _id: { $ne: id } });
    if (nameExists) {
      return NextResponse.json({ message: "Product with same name, brand and category already exists" }, { status: 400 });
    }

    // Get current product
    const currentProduct = await sneakerModel.findById(id);
    if (!currentProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    let uploadedImages: { public_id: string; url: string }[] = [];

    // 1. Keep or upload new images
    for (let img of images) {
      if (img.public_id && img.url) {
        uploadedImages.push(img); // keep existing
      } else {
        const result = await cloudinary.uploader.upload(img, { folder: "products" });
        uploadedImages.push({ public_id: result.public_id, url: result.secure_url });
      }
    }

    // 2. Delete removed images from Cloudinary
    const oldImages = currentProduct.images || [];
    const removedImages = oldImages.filter(
      (oldImg: any) => !uploadedImages.some((newImg) => newImg.public_id === oldImg.public_id)
    );

    for (let img of removedImages) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // 3. Update product
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
