import mongoose,{Schema,Document} from "mongoose";

interface Brand extends Document{
    name:string,
    logo?:string,
    craetedAt:Date
}

const BrandSchema =new Schema<Brand>({
    name:{type:String,required:true,unique:true},
    logo:{type:String}
},
{timestamps:true}
)

export default mongoose.models.Brand || mongoose.model<Brand>("Brand",BrandSchema);