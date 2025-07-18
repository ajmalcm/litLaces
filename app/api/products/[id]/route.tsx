import sneakerModel from "@/lib/db/models/sneaker.model";

import { connectDB } from "@/lib/db/connection";
import { NextResponse,NextRequest } from "next/server";

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params; // Await params!
        const url = new URL(req.url);
        // const keyword = url.searchParams.get("keyword") || "";
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const resultPerPage = 10; // Define how many products you want per page
        await connectDB();

        let filter={};
        if(id!=="all")
        {
            filter = { $or: [{ category: id }, { brand: id }] };
        }

        const totalCount=await sneakerModel.countDocuments(filter);

        const sneakers=await sneakerModel.find(filter).limit(resultPerPage).skip((page - 1) * resultPerPage);

        if(!sneakers || sneakers.length === 0) {
            return NextResponse.json({ message: "No products found" }, { status: 404 });
        }
        return NextResponse.json({sneakers,totalCount}, { status: 200 });
    } catch (err) {
        console.error("Error fetching products:", err);
        return NextResponse.json({ message: "Unable to fetch products" }, { status: 500 });
    }
}