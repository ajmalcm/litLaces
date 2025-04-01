import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set('userToken', '', { httpOnly: true, path: '/', expires: new Date(0) });
    return response;
}