import sneakerModel from "@/lib/db/models/sneaker.model";
import { connectDB } from "@/lib/db/connection";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const url = new URL(req.url);
    const keyword = url.searchParams.get("keyword") || "";
    const gte = parseFloat(url.searchParams.get("gte") || "0");
    const lte = parseFloat(url.searchParams.get("lte") || "10000");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const resultPerPage = 10;

    await connectDB();

    let filter: any = {};
    if (id !== "all") {
      filter = { $or: [{ category: id }, { brand: id }] };
    }
    if (keyword) {
      filter = { ...filter, name: { $regex: keyword, $options: "i" } };
    }
    if (gte !== 0 || lte !== 10000) {
      filter = { ...filter, price: { $gte: gte, $lte: lte } };
    }

    const totalCount = await sneakerModel.countDocuments(filter);
    const sneakers = await sneakerModel
      .find(filter)
      .limit(resultPerPage)
      .skip((page - 1) * resultPerPage);

    if (!sneakers || sneakers.length === 0) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }
    return NextResponse.json({ sneakers, totalCount }, { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ message: "Unable to fetch products" }, { status: 500 });
  }
};