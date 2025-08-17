"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useGetAdminAllProductsQuery } from "@/redux/services/userReducers";

type ProductType = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  gender: string;
  sizes: {
    _id: string;
    size: number;
    stock: number;
  }[];
  price: number;
  images: {
    _id: string;
    public_id: string;
    url: string;
  }[];
  description: string;
};

const AllProducts = () => {
  const { data = [], isLoading, error } = useGetAdminAllProductsQuery("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (
      Array.isArray(data) &&
      (products.length !== data.length ||
        products.some((p, i) => p._id !== data[i]._id))
    ) {
      setProducts(data);
    }
  }, [data]);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || product.category === category)
    );
  }, [products, search, category]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((product) => product._id !== id));
    }
  };

  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: isMobile ? 80 : 100,
      renderCell: (params: any) => (
        <img
          src={params.value && params.value[0]?.url}
          alt={params.row.name}
          width={50}
          height={50}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
      sortable: false,
    },
    { field: "_id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params: any) => `₹${params.value}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
      renderCell: (params: any) => {
        // Calculate total stock from sizes
        const totalStock = params.row.sizes.reduce(
          (sum: number, s: any) => sum + s.stock,
          0
        );
        return totalStock > 10 ? (
          <span style={{ color: "green" }}>{totalStock} in stock</span>
        ) : (
          <span style={{ color: "red" }}>{totalStock} left</span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 100 : 180,
      sortable: false,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => alert(`Edit Product ${params.row._id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error loading products.</Typography>;

  return (
    <Box
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        flex: 1,
        overflow: "scroll",
        maxWidth: "100vw",
      }}
    >
      {/* <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "white", py: 2 }}
      >
        All Products
      </Typography> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "#1a1a1a",
            color: "white",
            flex: 1,
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
            "& .MuiOutlinedInput-notchedOutline:hover": { borderColor: "#555" },
          }}
          InputLabelProps={{
            style: { color: "#ccc" },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: "#ccc" }}>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              backgroundColor: "#1a1a1a",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
              "& .MuiOutlinedInput-notchedOutline:hover": {
                borderColor: "#555",
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Men">Men</MenuItem>
            <MenuItem value="Women">Women</MenuItem>
            <MenuItem value="Unisex">Unisex</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          height: 500,
          backgroundColor: "#1a1a1a",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <DataGrid
          rows={filteredProducts.map((p) => ({ ...p, id: p._id }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            color: "white",
            border: "none",
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "rgb(17 24 39)",
              color: "#ccc",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "rgb(17 24 39)",
              color: "#ccc",
            },
            "& .MuiButton-outlined": {
              borderColor: "#444",
              color: "#fff",
            },
            "& .MuiButton-outlined:hover": {
              borderColor: "#fff",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiSvgIcon-root": {
              color: "#ccc",
            },
            "& .MuiSvgIcon-root:hover": {
              color: "#ccc",
            },
            " & .MuiDataGrid-row": {
              backgroundColor: "rgb(31 41 55)",
            },
            overflow: "scroll",
            backgroundColor: "rgb(17 24 39)",
          }}
        />
      </Box>
    </Box>
  );
};

export default AllProducts;
