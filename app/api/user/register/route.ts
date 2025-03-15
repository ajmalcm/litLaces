import { connectDB } from "@/lib/db/connection";
import userModel from "@/lib/db/models/user.model";
import bcrypt from "bcryptjs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  await connectDB();
  const {   
    name,
    email,
    password,
    confirmpassword,
  }: {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
  } = await req.json();
    try {
      
      let userExists = await userModel.findOne({ email });
      if (userExists)
        return NextResponse.json(
          { message: "user already exists. please login" },
          { status: 500 }
        );
      if (password !== confirmpassword)
        return NextResponse.json(
          { message: "passwords does not match" },
          { status: 500 }
        );

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        //     avatar:{
        //     public_id:"",
        //     url:""
        // }
      });

      // Set a cookie with expiration
      const response = NextResponse.json(
        { user, message: "user registered successfully!" },
        { status: 201 }
      );
      const cookieOptions = {
        httpOnly: true,
        sameSite:'lax',
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 24 * Number(process.env.COOKIE_EXPIRE),
      };
      const token = await user.getJwtToken();
      response.cookies.set("userToken", token, cookieOptions as object);
      return response;
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "unable to register user" },
        { status: 500 }
      );
    }
  
}