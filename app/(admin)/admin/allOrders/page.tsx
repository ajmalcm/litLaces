"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, useMediaQuery, Chip } from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import {
  useGetAdminAllOrdersQuery,
  useDeleteOrderMutation,
} from "@/redux/services/userReducers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AllOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { data } = useGetAdminAllOrdersQuery("");
  const [deleteOrderMutation] = useDeleteOrderMutation();
  console.log(data);
  const navigate = useRouter();

  useEffect(() => {
    if (Array.isArray(data)) {
      setOrders(data);
    }
  }, [data]);

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width:600px)");

  // Delete Handler
  const handleDelete = async (id: string) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    const { data, error } = await deleteOrderMutation(id);
   
      // toast.loading("Deleting order...");
    if (data?.success) {
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.success(data.message);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = (error.data as { message: string })?.message;
        toast.error(errorMessage);
      }
    }
  
  };

  // DataGrid Columns
  const columns = [
    { field: "_id", headerName: "Order ID", width: 200 },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      renderCell: (params: any) => params?.row?.user?.name ?? "N/A", // ✅ safe check
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      width: 180,
      renderCell: (params: any) =>
        params?.row?.createdAt
          ? new Date(params.row.createdAt).toLocaleString()
          : "N/A", // ✅ safe check
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      renderCell: (params: any) => `₹${params.row?.totalAmount ?? 0}`, // ✅ use row
    },
    {
      field: "items",
      headerName: "Items",
      width: 100,
      renderCell: (params: any) => params?.row?.orderItems?.length ?? 0, // ✅ safe check
    },
    {
      field: "deliveryStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params: any) => (
        <Chip
          label={params.row?.deliveryStatus ?? "Unknown"} // ✅ safe check
          color={
            params.row?.deliveryStatus === "Delivered"
              ? "success"
              : params.row?.deliveryStatus === "Pending"
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
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              navigate.push(`/admin/allOrders/${params?.row?._id}`)
            } // ✅ fixed
          >
            <Visibility />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row?._id)} // ✅ fixed
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
          getRowId={(row) => row._id} // ✅ no need to map id manually
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
              color: "#ccc",
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
