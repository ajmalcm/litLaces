import cartModel from "@/lib/db/models/cart.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import mongoose from "mongoose";

interface ProductInput {
  productId: string;
  name: string;
  quantity: number;
  size: string;
  price: number;
  image: {
    public_id: string;
    url: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const product: ProductInput = body.product;
    const action: "addToCart" | "add" = body.action;

    const user = await isAuthenticatedUser(req);
    if (!user || typeof user !== "object" || !("id" in user)) {
      return NextResponse.json(
        { message: "Please login to add items to cart.", success: false },
        { status: 401 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user.id);
    const productId = product.productId;

    let userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      // No cart yet — create one
      const newCart = await cartModel.create({
        user: userId,
        cartItems: [
          {
            product: productId,
            name: product.name, // Ensure name is included
            quantity: product.quantity,
            size: product.size,
            price: product.price,
            image: product.image,
          },
        ],
      });

      return NextResponse.json(
        {
          message: "Product added to cart successfully.",
          success: true,
          cartItems: newCart.cartItems,
        },
        { status: 201 }
      );
    }

  const existingItemIndex = userCart.cartItems.findIndex(
  (item: {
    product: string | mongoose.Types.ObjectId;
    size: string;
  }) =>
    item.product.toString() === product.productId &&
    item.size === product.size
);


    if (existingItemIndex !== -1) {
      if (action === "addToCart") {
        // Don't add if already exists
        return NextResponse.json(
          {
            message: "Item already exists in cart.",
            success: false,
            alreadyExists: true,
          },
          { status: 200 }
        );
      } else if (action === "add") {
        // Increase quantity
        userCart.cartItems[existingItemIndex].quantity += product.quantity;
        await userCart.save();
        return NextResponse.json(
          {
            message: "Product quantity increased.",
            success: true,
            cartItems: userCart.cartItems,
          },
          { status: 200 }
        );
      }
    } else {
      // Product not in cart — add it
      userCart.cartItems.push({
        product: productId,
        name: product.name, // Ensure name is included
        quantity: product.quantity,
        size: product.size,
        price: product.price,
        image: product.image,
      });
      await userCart.save();

      return NextResponse.json(
        {
          message: "Product added to cart successfully.",
          success: true,
          cartItems: userCart.cartItems,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("POST /api/user/cart/add Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
