import cartModel from "@/lib/db/models/cart.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const {
      productId,
      action,
      size,
    }: { productId: string; action: string; size: string } = await req.json();
    const user = await isAuthenticatedUser(req);

    if (!user || typeof user !== "object" || !("id" in user)) {
      return NextResponse.json(
        { message: "Please login to remove items from cart.", success: false },
        { status: 401 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user.id);
    let userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return NextResponse.json(
        { message: "Cart not found.", success: false },
        { status: 404 }
      );
    }

    if (action === "removeFromCart") {
      // ✅ FIX: Corrected removal condition
      userCart.cartItems = userCart.cartItems.filter(
        (item: {
          product: string | mongoose.Types.ObjectId;
          size: string | any;
        }) =>
          !(
            item.product.toString() === productId &&
            item.size === size
          )
      );

      await userCart.save();
      return NextResponse.json(
        {
          message: "Product removed from cart successfully.",
          success: true,
          cartItems: userCart.cartItems,
        },
        { status: 200 }
      );
    } else if (action === "minus") {
      // Decrease the quantity of the product in the cart
      const itemIndex = userCart.cartItems.findIndex(
        (item: {
          product: string | mongoose.Types.ObjectId;
          size: string | any;
        }) => item.product.toString() === productId && item.size === size
      );

      if (itemIndex === -1) {
        return NextResponse.json(
          { message: "Product not found in cart.", success: false },
          { status: 404 }
        );
      }

      if (userCart.cartItems[itemIndex].quantity > 1) {
        userCart.cartItems[itemIndex].quantity -= 1;
      } else {
        userCart.cartItems.splice(itemIndex, 1);
      }

      await userCart.save();
      return NextResponse.json(
        {
          message: "Product quantity updated successfully.",
          success: true,
          cartItems: userCart.cartItems,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid action specified.", success: false },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("POST /api/user/cart/remove Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
