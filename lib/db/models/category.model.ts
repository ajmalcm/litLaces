import mongoose, { Schema, Document } from "mongoose";

interface Category extends Document {
  name: string;
  createdAt: Date;
}

const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<Category>("Category", CategorySchema);
