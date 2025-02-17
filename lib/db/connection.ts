import mongoose from "mongoose";

const MONGO_DB_URI=process.env.MONGO_DB_URI as string;

if(!MONGO_DB_URI)
{
    throw new Error("missing Mongo DB URI")
}

interface MongooseCache{
    conn:typeof mongoose | null,
    promise:Promise<typeof mongoose> | null
}

let cached:MongooseCache = (global as any).mongoose || {conn:null,promise:null}

export async function connectDB():Promise<typeof mongoose>{
if(cached.conn)
    return cached.conn
if(!cached.promise)
{
    cached.promise=mongoose.connect(MONGO_DB_URI,{
        bufferCommands:false
    })
}

cached.conn=await cached.promise;
(global as any).mongoose=cached;

console.log("Connected to MONGO_DB")
return cached.conn
}