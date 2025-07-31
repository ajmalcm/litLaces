import React from "react";
import Adidas from "@/public/assets/adidasWhite.png";
import Nike from "@/public/assets/nikeWhite.png";
import Puma from "@/public/assets/pumaWhite.png";
import Nb from "@/public/assets/nbWhite.png";
import Crocs from "@/public/assets/crocsWhite.png";
import Image from "next/image";
import Banner1 from "@/public/assets/banner1.jpg";
import Banner2 from "@/public/assets/banner2.jpg";
import Banner3 from "@/public/assets/banner3.jpg";
import Men from "@/public/assets/men.jpg";
import Women from "@/public/assets/women.jpg";
import All from "@/public/assets/all.jpg";
import Gif from "@/public/assets/phoneGif.gif";
import P2 from "@/public/assets/p2.webp";
import P3 from "@/public/assets/p3.webp";
import P4 from "@/public/assets/p4.webp";
import P5 from "@/public/assets/p5.webp";
import P6 from "@/public/assets/p6.webp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";


export  type ProductType = {
    _id:String,
    name: string;
    images: { url: string }[];
    price: number;
    sizes: [{_id:string, size:number,stock:number}];
    // add other fields as needed
  };

export const BrandItems = [
    { name: "adidas", logo: Adidas,link:'/collections/Adidas'},
    { name: "puma", logo: Puma,link:'/collections/Puma'},
    { name: "nike", logo: Nike,link:'/collections/Nike'},
    { name: "nb", logo: Nb,link:'/collections/Vans'},
    { name: "crocs", logo: Crocs,link:'/collections/Crocs'},
  ];

export const ProductsArray =[
  {
    img:P2,productName:"Adidas Samba",price:2899,size:"36 EU or 3.5 UK"
  },
  {
    img:P3,productName:"Adidas Gazelle",price:2899,size:"36 EU or 3.5 UK"
  },
  {
    img:P4,productName:"Adidas campus OOs",price:2899,size:"36 EU or 3.5 UK"
  },{
    img:P5,productName:"Nike Dunks",price:2899,size:"36 EU or 3.5 UK"
  },{
    img:P6,productName:"Adidas Samba",price:2899,size:"36 EU or 3.5 UK"
  },{
    img:P2,productName:"Adidas Samba",price:2899,size:"36 EU or 3.5 UK"
  },
  {
    img:P3,productName:"Adidas Gazelle",price:2899,size:"36 EU or 3.5 UK"
  },
  {
    img:P4,productName:"Adidas campus OOs",price:2899,size:"36 EU or 3.5 UK"
  },{
    img:P5,productName:"Nike Dunks",price:2899,size:"36 EU or 3.5 UK"
  },{
    img:P6,productName:"Adidas Samba",price:2899,size:"36 EU or 3.5 UK"
  },
  {
    img:P2,productName:"Adidas Samba",price:2899,size:"36 EU or 3.5 UK"
  },
  {
    img:P3,productName:"Adidas Gazelle",price:2899,size:"36 EU or 3.5 UK"
  },
  {
    img:P4,productName:"Adidas campus OOs",price:2899,size:"36 EU or 3.5 UK"
  },{
    img:P5,productName:"Nike Dunks",price:2899,size:"36 EU or 3.5 UK"
  },{
    img:P6,productName:"Adidas Samba",price:2899,size:"36 EU or 3.5 UK"
  },
] 

  export const BannerItems=[{image:Men,alt:"img1",text:"Shop Men",link:"Men"},{image:Women,alt:"img2",text:"Shop Women",link:"Women"},{image:All,alt:"img3",text:"Shop All",link:"all"}]
   
export const productImgs=[P2,P3,P4,P5,P6]

export const orders = [
  {
    id: "ORD12345",
    date: "2024-12-01",
    total: "₹2,699",
    status: "Delivered",
    items: [
      {
        name: "VANS OLD SKOOL KNU PEACHES",
        size: "36 EU / 3.5 UK",
        image: P2,
        quantity: 1,
        price:2699
      },
    ],
  },
  {
    id: "ORD12346",
    date: "2024-11-25",
    total: "₹5,398",
    status: "Shipped",
    items: [
      {
        name: "NIKE AIR MAX 270",
        size: "42 EU / 8 UK",
        image: P3,
        quantity: 2,
        price: 2699
      },
    ],
  },
];

export type ProductInput = {
  productId: string ;
  quantity: number;
  size: string;
  price: number;
  image: {
    public_id: string;
    url: string;
  };
};


export const dashLinks=[{icon:AttachMoneyIcon,header:"Total Revenue",content:"$12,361",color:'text-green-500'},{icon:ShoppingCartIcon,header:"Total Orders",content:"431,225",color:'text-blue-500'},{icon:InventoryIcon,header:"All Products",content:"32,441",color:'text-yellow-500'},{icon:PeopleIcon,header:"All Users",content:"1,325,134",color:"text-purple-500"}]

export const NewOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    amount: "₹2,500",
    status: "Delivered",
    image: P2, // Replace with actual image URL
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    amount: "₹3,200",
    status: "Processing",
    image: P3, // Replace with actual image URL
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    amount: "₹1,800",
    status: "Shipped",
    image: P4, // Replace with actual image URL
  },
  {
    id: "ORD-004",
    customer: "Alice Green",
    amount: "₹4,100",
    status: "Delivered",
    image: P5, // Replace with actual image URL
  },
  {
    id: "ORD-005",
    customer: "Chris White",
    amount: "₹2,950",
    status: "Processing",
    image: P6, // Replace with actual image URL
  },
]

export const mockProducts = [
  {
    id: 1,
    name: "Product A",
    price: "500",
    category: "Shoes",
    stock: 20,
    image: P2, // Replace with real image URLs
  },
  {
    id: 2,
    name: "Product B",
    price: "800",
    category: "Sneakers",
    stock: 5,
    image: P3,
  },
  {
    id: 3,
    name: "Product C",
    price: "1,200",
    category: "Boots",
    stock: 15,
    image: P4,
  },
  {
    id: 4,
    name: "Product D",
    price: "900",
    category: "Loafers",
    stock: 12,
    image: P5,
  },
  {
    id: 5,
    name: "Product E",
    price: "1,500",
    category: "Sandals",
    stock: 8,
    image: P5,
  },
  {
    id: 6,
    name: "Product A",
    price: "500",
    category: "Shoes",
    stock: 20,
    image: P2, // Replace with real image URLs
  },
  {
    id: 7,
    name: "Product B",
    price: "800",
    category: "Sneakers",
    stock: 5,
    image: P3,
  },
  {
    id: 8,
    name: "Product C",
    price: "1,200",
    category: "Boots",
    stock: 15,
    image: P4,
  },
  {
    id: 9,
    name: "Product D",
    price: "900",
    category: "Loafers",
    stock: 12,
    image: P5,
  },
  {
    id: 10,
    name: "Product E",
    price: "1,500",
    category: "Sandals",
    stock: 8,
    image: P5,
  },
  {
    id: 11,
    name: "Product A",
    price: "500",
    category: "Shoes",
    stock: 20,
    image: P2, // Replace with real image URLs
  },
  {
    id: 12,
    name: "Product B",
    price: "800",
    category: "Sneakers",
    stock: 5,
    image: P3,
  },
  {
    id: 13,
    name: "Product C",
    price: "1,200",
    category: "Boots",
    stock: 15,
    image: P4,
  },
  {
    id: 14,
    name: "Product D",
    price: "900",
    category: "Loafers",
    stock: 12,
    image: P5,
  },
  {
    id: 15,
    name: "Product E",
    price: "1,500",
    category: "Sandals",
    stock: 8,
    image: P5,
  },
];

 export const mockUsers = [
  {
    id: 1,
    avatar:P2,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    id: 2,
    avatar:P2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
  },
  {
    id: 3,
    avatar:P2,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "User",
  },
  {
    id: 4,
    avatar:P2,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    role: "Moderator",
  },
  {
    id: 5,
    avatar:P2,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    role: "User",
  },
  {
    id: 6,
    avatar:P2,
    name: "Diana Green",
    email: "diana.green@example.com",
    role: "Admin",
  },
  {
    id: 7,
    avatar:P2,
    name: "Edward Harris",
    email: "edward.harris@example.com",
    role: "Moderator",
  },
  {
    id: 8,
    avatar:P2,
    name: "Fiona Lee",
    email: "fiona.lee@example.com",
    role: "User",
  },
  {
    id: 9,
    avatar:P2,
    name: "George Miller",
    email: "george.miller@example.com",
    role: "User",
  },
  {
    id: 10,
    avatar:P2,
    name: "Hannah Wilson",
    email: "hannah.wilson@example.com",
    role: "Admin",
  },
];


export const mockOrders = [
  {
    id: 1,
    customer: "John Doe",
    orderDate: "2025-01-01",
    totalAmount: 2500,
    status: "Delivered",
    items: 5,
  },
  {
    id: 2,
    customer: "Jane Smith",
    orderDate: "2025-01-02",
    totalAmount: 1200,
    status: "Pending",
    items: 2,
  },
  {
    id: 3,
    customer: "Sam Wilson",
    orderDate: "2025-01-03",
    totalAmount: 3500,
    status: "Shipped",
    items: 7,
  },
];



export const ProductsArray2 = [
  {
    name: "Adidas Samba",
    brand: "Adidas",
    category: "Men",
    gender: "unisex",
    sizes: [
      { size: 36, stock: 10 },
      { size: 37, stock: 8 },
      { size: 38, stock: 5 },
    ],
    price: 2899,
    images: [
      { public_id: "adidas_samba_1", url: "https://i.pinimg.com/1200x/3e/6d/22/3e6d2247b5eff705816080c840a3a5e9.jpg" },
      { public_id: "adidas_samba_2", url: "https://i.pinimg.com/1200x/09/c5/d4/09c5d40372ce3ca38953a449f922a8f2.jpg" },
      { public_id: "adidas_samba_3", url: "https://i.pinimg.com/1200x/30/3f/f9/303ff971f57a7dbc37b3b776da383876.jpg" },
      { public_id: "adidas_samba_4", url: "https://i.pinimg.com/736x/32/47/e6/3247e6d6618e8a15dbc18ff54f543af0.jpg" },
    ],
    description: "Classic Adidas Samba sneakers for everyday wear.",
  },
  {
    name: "Nike Dunks",
    brand: "Nike",
    category: "Women",
    gender: "female",
    sizes: [
      { size: 36, stock: 7 },
      { size: 37, stock: 6 },
      { size: 38, stock: 4 },
    ],
    price: 3199,
    images: [
      { public_id: "nike_dunks_1", url: "https://i.pinimg.com/736x/8c/d7/ab/8cd7abb870992659c049735ec46af791.jpg" },
      { public_id: "nike_dunks_2", url: "https://i.pinimg.com/736x/3f/e0/ff/3fe0ff6c30f1cd41977a66b276a664d6.jpg" },
      { public_id: "nike_dunks_3", url: "https://i.pinimg.com/1200x/3e/6d/22/3e6d2247b5eff705816080c840a3a5e9.jpg" },
      { public_id: "nike_dunks_4", url: "https://i.pinimg.com/1200x/09/c5/d4/09c5d40372ce3ca38953a449f922a8f2.jpg" },
    ],
    description: "Nike Dunks, iconic streetwear sneakers.",
  },
  {
    name: "Puma RS-X",
    brand: "Puma",
    category: "Men",
    gender: "male",
    sizes: [
      { size: 39, stock: 12 },
      { size: 40, stock: 9 },
      { size: 41, stock: 3 },
    ],
    price: 2799,
    images: [
      { public_id: "puma_rsx_1", url: "https://i.pinimg.com/1200x/30/3f/f9/303ff971f57a7dbc37b3b776da383876.jpg" },
      { public_id: "puma_rsx_2", url: "https://i.pinimg.com/736x/32/47/e6/3247e6d6618e8a15dbc18ff54f543af0.jpg" },
      { public_id: "puma_rsx_3", url: "https://i.pinimg.com/736x/8c/d7/ab/8cd7abb870992659c049735ec46af791.jpg" },
      { public_id: "puma_rsx_4", url: "https://i.pinimg.com/736x/3f/e0/ff/3fe0ff6c30f1cd41977a66b276a664d6.jpg" },
    ],
    description: "Puma RS-X, bold and comfortable for everyday style.",
  },
  {
    name: "Vans Old Skool",
    brand: "Vans",
    category: "Unisex",
    gender: "unisex",
    sizes: [
      { size: 36, stock: 5 },
      { size: 37, stock: 7 },
      { size: 38, stock: 2 },
    ],
    price: 2499,
    images: [
      { public_id: "vans_oldskool_1", url: "https://i.pinimg.com/736x/32/47/e6/3247e6d6618e8a15dbc18ff54f543af0.jpg" },
      { public_id: "vans_oldskool_2", url: "https://i.pinimg.com/736x/8c/d7/ab/8cd7abb870992659c049735ec46af791.jpg" },
      { public_id: "vans_oldskool_3", url: "https://i.pinimg.com/736x/3f/e0/ff/3fe0ff6c30f1cd41977a66b276a664d6.jpg" },
      { public_id: "vans_oldskool_4", url: "https://i.pinimg.com/1200x/3e/6d/22/3e6d2247b5eff705816080c840a3a5e9.jpg" },
    ],
    description: "Vans Old Skool, classic skate shoes for all.",
  },
  {
    name: "Crocs Classic Clog",
    brand: "Crocs",
    category: "Women",
    gender: "female",
    sizes: [
      { size: 36, stock: 6 },
      { size: 37, stock: 5 },
      { size: 38, stock: 3 },
    ],
    price: 1999,
    images: [
      { public_id: "crocs_clog_1", url: "https://i.pinimg.com/1200x/09/c5/d4/09c5d40372ce3ca38953a449f922a8f2.jpg" },
      { public_id: "crocs_clog_2", url: "https://i.pinimg.com/1200x/30/3f/f9/303ff971f57a7dbc37b3b776da383876.jpg" },
      { public_id: "crocs_clog_3", url: "https://i.pinimg.com/736x/32/47/e6/3247e6d6618e8a15dbc18ff54f543af0.jpg" },
      { public_id: "crocs_clog_4", url: "https://i.pinimg.com/736x/8c/d7/ab/8cd7abb870992659c049735ec46af791.jpg" },
    ],
    description: "Crocs Classic Clog, comfort and style for everyone.",
  },
  {
    name: "Asics Gel-Lyte",
    brand: "Asics",
    category: "Men",
    gender: "male",
    sizes: [
      { size: 40, stock: 8 },
      { size: 41, stock: 6 },
      { size: 42, stock: 4 },
    ],
    price: 3099,
    images: [
      { public_id: "asics_gellyte_1", url: "https://i.pinimg.com/1200x/3e/6d/22/3e6d2247b5eff705816080c840a3a5e9.jpg" },
      { public_id: "asics_gellyte_2", url: "https://i.pinimg.com/736x/3f/e0/ff/3fe0ff6c30f1cd41977a66b276a664d6.jpg" },
      { public_id: "asics_gellyte_3", url: "https://i.pinimg.com/1200x/09/c5/d4/09c5d40372ce3ca38953a449f922a8f2.jpg" },
      { public_id: "asics_gellyte_4", url: "https://i.pinimg.com/736x/32/47/e6/3247e6d6618e8a15dbc18ff54f543af0.jpg" },
    ],
    description: "Asics Gel-Lyte, performance running shoes.",
  },
];
