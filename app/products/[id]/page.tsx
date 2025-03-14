"use client";
import React from "react";
import { useParams } from "next/navigation";
import EmailSection from "@/components/EmailSection";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { productImgs, ProductsArray } from "@/utils/temp";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { experimentalStyled as styled } from "@mui/material/styles";
import CarouselComponent from "@/components/Carousel";
import ShippingAccordion from "@/components/ShippingAccordion";

const page = () => {
  const { id } = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));


  return (
    <div>
      {/* top */}
      <div className="flex flex-col lg:flex-row text-white px-4 py-4 md:px-28 md:py-8 justify-center md:items-center gap-2 md:gap-16">
        <div className="md:flex-[0.6]">
          <CarouselComponent product={productImgs} />
        </div>
        {/* topright */}
        <div className="flex flex-col gap-4 md:gap-2 cursor-pointer">
          <p className="text-[10px] tracking-widest text-slate-300 font-mono">LIT LACES</p>
          <p className="text-3xl md:text-4xl  font-sans font-extrabold">Nike airmax 90 Travis Scott</p>
          <p className="text-white font-sans flex gap-4 text-md">
            <s className="text-slate-300 font-extralight">Rs. 2,899.00</s> Rs. 2,599.00
          </p>
          <p className="text-[12px] tracking-widest text-slate-300 font-mono"><u>Shipping</u> calculated at checkout.</p>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-slate-300 font-mono font-bold">SIZE</p>
            <select className="bg-black py-3 px-4 rounded-lg border-[1px] border-gray-400 text-sm md:max-w-[200px]">
              <option>41 EU or 7 UK</option>
              <option>42 EU or 8 UK</option>
              <option>43 EU or 9 UK</option>
              <option>44 EU or 10 UK</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-slate-300 font-mono font-bold">QUANTITY</p>
            <div className="flex border-[1px] border-gray-400 max-w-fit p-2 rounded-xl">
            <p>-</p>
            <input type='text' defaultValue={1} className="bg-black text-center max-w-[100px] border-none outline-none"></input>
            <p>+</p>
            </div>
          </div>
          <button className="p-3 border-[1px] border-gray-400 font-mono rounded-xl bg-white text-black font-bold">Add to cart</button>
          <button className="p-3 border-[1px] border-gray-400 font-mono rounded-md bg-green-500 font-bold">ORDER ON WHATSAPP</button>
          <ShippingAccordion/>
        </div>
      </div>
      {/* mid */}
      <div className="text-white px-4 py-4 md:px-16 md:py-8 flex flex-col gap-3">
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: "100%", md: "90%", margin: "0 auto" },
          }}
        >
          <Grid columns={12}>
            <h4 className="text-2xl md:text-3xl font-mono font-bold  pb-4 md:pb-8 capitalize">
              People Also Like
            </h4>
          </Grid>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {ProductsArray.slice(0, 4).map((item, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
                <Item>
                  <Link href={`/products/${item.productName}`}>
                    <ProductCard
                      src={item.img}
                      alt={index}
                      price={item.price}
                      productName={item.productName}
                    />
                  </Link>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      {/* bottom */}
      <div className="flex justify-center items-center text-white mx-5 border-t-[1px] border-[#434343]">
        <EmailSection />
      </div>
    </div>
  );
};

export default page;
