"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { ProductsArray } from "@/utils/temp";
import ProductCard from "@/components/ProductCard";
import { alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useGetProductsQuery } from "@/redux/services/userReducers";
import { set } from "mongoose";
import CollectionSkeletonLoader from "@/components/loaders/CollectionSkeletonLoader";

const page = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const {data,error,isLoading}=useGetProductsQuery({id,keyword:"",page});
  console.log("Data from API:", data);
  const [productsArray,setProductsArray] = useState([]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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

  useEffect(()=>{
    if(data && data?.sneakers)
    {
      setProductsArray(data?.sneakers);
      console.log("Products Array:", data?.sneakers);
    }
    if(error)
    {
      console.error("Error fetching products:", error);
    }
  },[data,error,productsArray]);

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: "#FFF",
      backgroundColor:"#0a0a0a",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return isLoading ? <CollectionSkeletonLoader/>: (
    <div className="text-white px-4 py-4 md:px-16 md:py-8 flex flex-col gap-3">
      <Box
        sx={{ flexGrow: 1, width: { xs: "100%", md: "90%", margin: "0 auto" } }}
      >
        <Grid columns={12}>
          <h2 className="md:text-4xl text-3xl font-mono font-bold  pb-4 md:pb-8 capitalize">
            {id}
          </h2>
        </Grid>
        <Grid columns={12} sx={{ mb: { xs: "10px", md: "30px" } }}>
          <div className="flex justify-between items-center">
          <div className="text-white flex gap-4 items-center">
            <p className="font-extralight tracking-widest">Filter: </p>
            <div>
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                // variant="contained"
                sx={{ color: "white" }}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                PRICE
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem disableRipple className="flex flex-col gap-4 items-center justify-center">
                <div className="flex gap-8 py-4 border-b-[0.5px] border-[#3c3b3b]">
                  <p className="font-light font-mono tracking-wide text-sm text-[#e1e1e1]">The Highest Price is Rs. 4,200.00</p>
                  <p className="font-light font-mono tracking-wide text-sm text-[#e1e1e1] underline">Reset</p>
                </div>

                <div className="flex gap-12 text-white bg-black filter-box">
                <TextField id="outlined-basic" label="From" variant="outlined" focused style={{color:"white"}}/>
                <TextField id="outlined-basic" label="To" variant="outlined" focused/>
                </div>
                <Button onClick={handleClose} className="bg-[#3c3b3b] text-white self-end">Apply</Button>
                </MenuItem>
              </StyledMenu>
            </div>
          </div>
          <div className="font-extralight tracking-widest">
            {`${data?.totalCount} Products`}
          </div>
          </div>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {productsArray.map((item:any , index:any) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
              <Item>
                <Link href={`/products/${item.name}`}>
                <ProductCard
                  src={item.images[0].url}
                  alt={index}
                  price={item.price}
                  productName={item.name}
                />
                </Link>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack
        spacing={4}
        className="pagination"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
          count={Math.ceil(data?.totalCount / 10) || 1}
          page={page}
          onChange={handleChange}
          variant="outlined"
          size="medium"
          shape="rounded"
          color="secondary"
        />
      </Stack>
    </div>
  );
};

export default page;
