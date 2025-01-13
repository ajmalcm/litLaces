"use client";

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { mockOrders } from "@/utils/temp";

const AllOrders = () => {
  const [orders, setOrders] = useState(mockOrders);

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width:600px)");

  // Delete Handler
  const handleDelete = (id:any) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "Order ID", width: 80 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "orderDate", headerName: "Order Date", width: 150 },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      renderCell: (params:any) => `₹${params.value}`,
    },
    { field: "items", headerName: "Items", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params:any) => (
        <Chip
          label={params.value}
          color={
            params.value === "Delivered"
              ? "success"
              : params.value === "Pending"
              ? "warning"
              : "primary"
          }
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 100 : 180,
      sortable: false,
      renderCell: (params:any) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => alert(`View Order ${params.row.id}`)}
          >
            <Visibility />
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
        All Orders
      </Typography>

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
          rows={orders}
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
              color: "#ccc", // Icon color
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "rgb(31 41 55)",
            },
            backgroundColor: "rgb(17 24 39)",
          }}
        />
      </Box>
    </Box>
  );
};

export default AllOrders;
