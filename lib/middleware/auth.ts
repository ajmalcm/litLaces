import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("userToken")?.value;

        if (!token) {
            return false; 
        }
        
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const decodedData = jwt.verify(token, JWT_SECRET) as { id: string };

        return decodedData;
    } catch (error) {
        console.error("Authentication Error:", error);
        return false; 
    }
};
