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


export const BrandItems = [
    { name: "adidas", logo: Adidas,link:'/collections/adidas'},
    { name: "puma", logo: Puma,link:'/collections/puma'},
    { name: "nike", logo: Nike,link:'/collections/nike'},
    { name: "nb", logo: Nb,link:'/collections/nb'},
    { name: "crocs", logo: Crocs,link:'/collections/crocs'},
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

  export const BannerItems=[{image:Banner3,alt:"img1",text:"Shop Men",link:"shopMen"},{image:Banner1,alt:"img2",text:"Shop Women",link:"ShopWomen"},{image:Banner2,alt:"img3",text:"Shop All",link:"ShopAll"}]
   
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
