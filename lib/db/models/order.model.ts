import mongoose, { Schema, Document, Types } from "mongoose";

interface Order extends Document {
  user: Types.ObjectId;
  items: {
    sneaker: Types.ObjectId;
    size: number;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
}

const OrderSchema = new Schema<Order>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        sneaker: { type: Schema.Types.ObjectId, ref: "Sneaker", required: true },
        size: { type: Number, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);
