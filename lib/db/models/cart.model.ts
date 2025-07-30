import mongoose, { Schema, Document } from "mongoose";

interface CartItem extends Document {
  user: Schema.Types.ObjectId;
  cartItems: Array<{
    product: string;
    name: string;
    quantity: number;
    size: string;
    price: number;
    image: {
      public_id: string;
      url: string;
    };
  }>;
}


const CartSchema = new Schema<CartItem>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true ,unique: true },
    cartItems: [
      {
        product: {
          type: String,
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        image: {
          public_id: { type: String, required: true },
          url: { type: String, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<CartItem>("Cart",CartSchema);
