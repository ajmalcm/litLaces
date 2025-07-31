import sneakerModel from "@/lib/db/models/sneaker.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const products = await sneakerModel.find({}).sort({ createdAt: -1 }).exec();
    if (!products || products.length === 0) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json([], { status: 500 });
  }
};
