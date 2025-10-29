import mongoose, { Schema, Document } from "mongoose";

interface Banner extends Document {
  heroL?: {
    public_id: string;
    url: string;
  }; // Video URL for large screens
  heroSM?: {
    public_id: string;
    url: string;
  }; // Video URL for small screens
  banner1:{
    public_id: string;
    url: string;
  };
  banner2:{
    public_id: string;
    url: string;
  };
  banner3:{
    public_id: string;
    url: string;
  };
  // active: boolean;
  createdAt: Date;
}

const BannerSchema = new Schema<Banner>(
  {
    heroL: {
      public_id: String,
      url: String,
    }, // URL of large screen hero video or image or gif
    heroSM: {
      public_id: String,
      url: String,
    }, // URL of small screen hero video or image or gif
    banner1:{
      type:{
        public_id:String,
        url:String,
      },
    },
    banner2:{   
      type:{
        public_id:String,
        url:String,
      },
    },
    banner3:{
      type:{
        public_id:String,
        url:String,
      },
    }
    // active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Banner ||
  mongoose.model<Banner>("Banner", BannerSchema);
