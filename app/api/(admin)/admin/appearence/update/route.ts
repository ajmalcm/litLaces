import { NextResponse } from "next/server";
import bannerModel from "@/lib/db/models/banner.model";

export async function POST(req: Request) {
  try {
    const update = await req.json(); // URLs only, no files
    const current = await bannerModel.findOne();

    if (current) {
      await bannerModel.updateOne({}, { $set: update });
    } else {
      await bannerModel.create(update);
    }

    return NextResponse.json({ success: true, message: "Banners updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ success: false, message: "Failed to update banners" }, { status: 500 });
  }
}
