import { connectDB } from "@/lib/db/connection";
import { NextResponse } from "next/server";
import userModel  from "@/lib/db/models/user.model";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
    try {
        await connectDB();

        // Access query parameters
        const url = new URL(req.url);
        const query = url.searchParams;

        // Example: Get a specific query parameter
        const exampleParam = query.get('example');

        return NextResponse.json({ message: "SomeHow hitting first nxt.js api request", exampleParam }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Unable to fetch data" }, { status: 500 });
    }
}

export async function POST(req:Request){
    try{
        await connectDB();
        const { name, email, password, confirmpassword }: { name: string; email: string; password: string; confirmpassword: string } = await req.json();
        let userExists=await userModel.findOne({email})
        if(userExists)
            return NextResponse.json({message:"user already exists. please login"},{status:500});
        if(password!==confirmpassword)
            return NextResponse.json({message:"passwords does not match"},{status:500});

        const hashedPassword=await bcrypt.hash(password,10)
        
        const user=await userModel.create({name,email,password:hashedPassword,
        //     avatar:{
        //     public_id:"",
        //     url:""
        // }
    })

        // Set a cookie with expiration
        const response = NextResponse.json({ user, message: "user registered successfully!" }, { status: 201 });
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * Number(process.env.COOKIE_EXPIRE)// 1 week in seconds
        };
        const token=await user.getJwtToken()
        response.cookies.set('userToken', token, cookieOptions);
        return response;

    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({error:"unable to register user"},{status:500})
    }
}

