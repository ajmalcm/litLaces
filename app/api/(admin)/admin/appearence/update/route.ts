import { NextResponse } from "next/server";
import bannerModel from "@/lib/db/models/banner.model";
import { connectDB } from "@/lib/db/connection";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await connectDB();
    // Expect payload like { heroL: { url, public_id }, banner1: { url, public_id }, ... }
    const update = await req.json();
    const current = await bannerModel.findOne();

    // If current exists, for each updated key attempt to delete the previous Cloudinary asset
    if (current) {
      const deletions: Promise<any>[] = [];
      for (const key of Object.keys(update)) {
        try {
          const newVal = update[key];
          const prevVal = (current as any)[key];
          // If previous public_id exists and it's different from the new one, delete it
          if (prevVal && prevVal.public_id && newVal && newVal.public_id && prevVal.public_id !== newVal.public_id) {
            // choose resource_type heuristically from the new URL or public_id
            const url: string = newVal.url || "";
            const isVideo = url.includes(".mp4") || url.includes("/video/") || (newVal.public_id || "").startsWith("video/");
            const resource_type = isVideo ? "video" : "image";
            // best-effort delete (do not block on failure)
            deletions.push(
              cloudinary.uploader.destroy(prevVal.public_id, { resource_type }).catch((e) => {
                console.warn(`Failed to destroy previous asset ${prevVal.public_id}:`, e?.message || e);
              })
            );
          }
        } catch (e) {
          console.warn(`Skipping deletion check for key ${key}:`, (e as any)?.message || e);
        }
      }

      // Await deletions but continue even if some fail
      try {
        await Promise.all(deletions);
      } catch (e) {
        // already handled per-promise; ignore
      }

      // Persist the new banner values
      await bannerModel.updateOne({}, { $set: update });
    } else {
      // No previous doc — just create
      await bannerModel.create(update);
    }

    return NextResponse.json({ success: true, message: "Banners updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ success: false, message: "Failed to update banners" }, { status: 500 });
  }
}
