import mongoose, { Schema, Document } from "mongoose";

interface Banner extends Document {
  heroVideoLarge: string; // Video URL for large screens
  heroVideoSmall: string; // Video URL for small screens
  productBanners: string[]; // Array for product banners (default: 2 images)
  active: boolean;
  createdAt: Date;
}

const BannerSchema = new Schema<Banner>(
  {
    heroVideoLarge: { type: String, required: true }, // URL of large screen hero video
    heroVideoSmall: { type: String, required: true }, // URL of small screen hero video
    productBanners: { 
      type: [String], 
      validate: [(val: string[]) => val.length === 3, "Exactly 3 product banners are required"],
      required: true
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model<Banner>("Banner", BannerSchema);
