import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
}

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,select:false },
    avatar: { public_id:{
      type:String,
      // required:true
      default:""
  },
  url:{
      type:String,
      // required:true
      default:""
  } },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);


UserSchema.methods.comparePassword=async function(enteredPassword : string){
return await bcrypt.compare(enteredPassword,this.password);
}

UserSchema.methods.getJwtToken = function () {
  const expiresIn:string = process.env.JWT_EXPIRE || "5d"; // Ensure the default value
 // @ts-ignore
  const token = jwt.sign(
      { id: this._id },
      process.env.JWT_SECRET as string,
      { expiresIn: expiresIn }
  );

  return token;
};

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
