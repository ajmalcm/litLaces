import { connectDB } from "@/lib/db/connection";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        return NextResponse.json({message:"SomeHow hitting first nxt.js api request"},{status:200})
    }
    catch(error){
        return NextResponse.json({error:"Unbale to fetch data"},{status:500})
    }
}