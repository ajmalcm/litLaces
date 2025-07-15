import { connectDB } from "@/lib/db/connection";
import userModel from "@/lib/db/models/user.model";
import { isAuthenticatedUser } from "@/lib/middleware/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const isAuth = await isAuthenticatedUser(req);

        if (!isAuth || typeof isAuth !== "object" || !("id" in isAuth)) {
            return NextResponse.json({ message: "Please login to access user data.",success:false }, { status: 401 });
        }

        const user = await userModel.findById(isAuth.id);
        if (!user) {
            return NextResponse.json({ message: "User not found." ,success:false}, { status: 404 });
        }
        let isAdmin=false;
        user?.role==="admin"?isAdmin=true:isAdmin=false
        return NextResponse.json({ success: true, user, message: "Authenticated User",isAdmin }, { status: 200 });
    } catch (error) {
        console.error("GET /api/user/me Error:", error);
        return NextResponse.json({ message: "Internal Server Error",success:false }, { status: 500 });
    }
}
