import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Logged out successfully" });
    // Remove the cookie by setting it to expire in the past
    response.cookies.set("userToken", "", { expires: new Date(0), path: "/" });
    return response;
}