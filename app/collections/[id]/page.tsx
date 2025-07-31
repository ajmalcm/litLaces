"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductCard from "@/components/ProductCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { useGetProductsQuery } from "@/redux/services/userReducers";
import CollectionSkeletonLoader from "@/components/loaders/CollectionSkeletonLoader";

const page = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState({ gte: 0, lte: 10000 });
  const [priceInputFilter, setPriceInputFilter] = useState({ gte: 0, lte: 10000 });
  const [productsArray, setProductsArray] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { gte, lte } = priceInputFilter;
  const { data, error, isLoading } = useGetProductsQuery({
    id,
    keyword: "",
    gte:priceFilter.gte,
    lte:priceFilter.lte,
    page,
  });
  console.log("Data from API:", data);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const PriceFilterHandler=()=>{
    setIsDropdownOpen(false);
    setPriceFilter({ gte: priceInputFilter.gte, lte: priceInputFilter.lte });
  }

  const handlePriceFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setPriceInputFilter((prev) => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : 0,
    }));
  };

  
  useEffect(() => {
    if (data && data?.sneakers) {
      setProductsArray(data?.sneakers);
      console.log("Products Array:", data?.sneakers);
    }
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [data, error, productsArray]);
  
  
  
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
  
  return isLoading ? (
    <CollectionSkeletonLoader />
  ) : (
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
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 text-white border border-gray-700 rounded-md hover:bg-gray-800 transition-all"
                >
                  PRICE
                  <KeyboardArrowDownIcon />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-72 bg-[#0a0a0a] text-white rounded-lg shadow-xl border border-[#333] p-4">
                    {/* Price Info and Reset */}
                    <div className="flex justify-between items-center border-b border-[#3c3b3b] pb-3 mb-3">
                      <p className="text-sm font-light text-[#e1e1e1]">
                        The Highest Price is Rs. 4,200.00
                      </p>
                      <button
                        onClick={() => {
                          setPriceFilter({ gte: 0, lte: 10000 })
                          setIsDropdownOpen(false)}}
                        className="text-sm underline text-[#e1e1e1] hover:text-white"
                      >
                        Reset
                      </button>
                    </div>

                    {/* Input Fields */}
                    <div className="flex gap-4 mb-4">
                      <input
                        name="gte"
                        value={gte}
                        onChange={handlePriceFilterChange}
                        placeholder="From"
                        className="w-full px-3 py-2 text-sm bg-black border border-gray-600 rounded placeholder-gray-400"
                      />
                      <input
                        name="lte"
                        value={lte}
                        onChange={handlePriceFilterChange}
                        placeholder="To"
                        className="w-full px-3 py-2 text-sm bg-black border border-gray-600 rounded placeholder-gray-400"
                      />
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={PriceFilterHandler}
                        className="px-4 py-2 text-sm bg-[#3c3b3b] rounded hover:bg-[#4c4c4c] transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
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
          {productsArray.map((item: any, index: any) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
              <Item>
                <Link href={`/products/${item._id}`}>
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
