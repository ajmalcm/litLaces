import { Order } from "@/lib/db/models/order.model";
import { connectDB } from "@/lib/db/connection";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name _id") // only fetch username and _id from User
      .exec();
    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json([], { status: 500 });
  }
};
