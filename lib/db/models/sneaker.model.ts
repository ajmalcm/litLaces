import mongoose, { Schema, Document, Types } from "mongoose";

interface Sneaker extends Document {
  name: string;
  brand: Types.ObjectId;
  category: Types.ObjectId;
  gender: "male" | "female" | "unisex";
  sizes: { size: number; stock: number }[];
  price: number;
  images: string[];
  description?: string;
  createdAt: Date;
}

const SneakerSchema = new Schema<Sneaker>(
  {
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true }, 
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, 
    gender: { type: String, enum: ["male", "female", "unisex"], required: true },
    sizes: [
      {
        size: { type: Number, required: true },
        stock: { type: Number, required: true, default: 0 },
      },
    ],
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Sneaker || mongoose.model<Sneaker>("Sneaker", SneakerSchema);
