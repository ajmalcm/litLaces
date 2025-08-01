
"use client"
import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { CartItem } from '@/components/CartItem';
import { ProductsArray } from '@/utils/temp';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ProductCard from '@/components/ProductCard';
import { experimentalStyled as styled } from "@mui/material/styles";
import { useSelector } from 'react-redux';

const CartPage = () => {

  const {cart}=useSelector((state: any) => state.auth);

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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Your cart</h1>
          <Link href="/" className="text-gray-400 hover:underline">
            Continue shopping
          </Link>
        </div>

        {/* Cart Item */}
        {
          cart?.map((product:any,index:number)=>(
                      // <Link href={`/products/${product._id}`} key={index}>
                      <CartItem key={index} img={product.image} name={product.name} price={product.price} size={product.size} quantity={product.quantity} productId={product?.product}/>
                      // </Link>
                    ))
        }

        {/* Total Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center text-lg font-bold py-4 border-t border-gray-600">
            <span>Estimated total</span>
            <span>Rs. 2,699.00</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Taxes, discounts and shipping calculated at checkout.
          </p>
          <Button
            variant="contained"
            fullWidth
            className="mt-6 bg-gray-100 text-black hover:bg-gray-300"
          >
            <Link href="/checkout">
            Check out
            </Link>
          </Button>
        </div>
      </div>
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
          <Grid columns={12} className='flex justify-center'>
            <Link href='/collections/ShopAll' className='text-white font-mono font-bold items-center text-center p-2 rounded-xl mt-4'>
            Shop More ...
            </Link>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default CartPage;
