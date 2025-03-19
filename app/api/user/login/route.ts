import { connectDB } from "@/lib/db/connection";
import { NextResponse } from "next/server";
import userModel from "@/lib/db/models/user.model";




//register
export async function POST(req: Request) {
  try {
    await connectDB();
      const { email, password }:{email:string; password:string} = await req.json();
      if (!email || !password)
        return NextResponse.json(
          { message: "Please enter email and password" },
          { status: 401 }
        );

      const user = await userModel.findOne({ email }).select("+password");
      if (!user)
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 404 }
        );

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 404 }
        );
      }
      const response = NextResponse.json(
        { user, message: "logged-in successfully!",success:true },
        { status: 200 }
      );
      const cookieOptions = {
        httpOnly: true,
        sameSite:'lax',
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 24 * Number(process.env.COOKIE_EXPIRE),
      };
      const token = await user.getJwtToken();
      response.cookies.set("userToken", token, cookieOptions as Object);
      return response;
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Unable to login.",success:false },
        { status: 500 }
      );
    }
}

