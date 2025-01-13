"use client";

import React, { useState } from "react";
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
import { mockProducts } from "@/utils/temp";
import Image from "next/image";

const AllProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width:600px)");

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || product.category === category)
    );
  });

  // Delete Handler
  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  // DataGrid Columns
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: isMobile ? 80 : 100,
      renderCell: (params: any) => (
        <Image
          src={params.value}
          alt={params.row.name}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
      sortable: false,
    },
    { field: "id", headerName: "ID", width: 80 },
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
      renderCell: (params: any) =>
        params.value > 10 ? (
          <span style={{ color: "green" }}>{params.value} in stock</span>
        ) : (
          <span style={{ color: "red" }}>{params.value} left</span>
        ),
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
            onClick={() => alert(`Edit Product ${params.row.id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

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
      {/* Header */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "white", py: 2 }}
      >
        All Products
      </Typography>

      {/* Filters */}
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
            <MenuItem value="Shoes">Shoes</MenuItem>
            <MenuItem value="Sneakers">Sneakers</MenuItem>
            <MenuItem value="Boots">Boots</MenuItem>
            <MenuItem value="Loafers">Loafers</MenuItem>
            <MenuItem value="Sandals">Sandals</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid */}
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
          rows={filteredProducts}
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
              color: "#ccc", // Sort and menu icon color
            },
            "& .MuiSvgIcon-root:hover": {
              color: "#ccc", // Hover state for sort and menu icons
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
