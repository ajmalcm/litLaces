"use client";

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { mockUsers } from "@/utils/temp";
import Image from "next/image";

const AllUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

  // Responsive breakpoint
  const isMobile = useMediaQuery("(max-width:600px)");

  // Filter Logic
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Delete Handler
  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  // DataGrid Columns
  const columns = [
    {
        field: "avatar",
        headerName: "Avatar",
        width: 80,
        renderCell: (params: any) => (
          <Image
            src={params.value}
            alt={params.row.name}
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ),
        sortable: false,
      },
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params: any) => (
        <span style={{ color: params.value === "Admin" ? "green" : "blue" }}>
          {params.value}
        </span>
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
            size="small"
            sx={{
              color: "#007BFF", // Blue color for Edit
              "&:hover": { color: "#0056b3" }, // Darker blue on hover
            }}
            onClick={() => alert(`Edit User ${params.row.id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#0056b3", // Blue color for Delete
              "&:hover": { color: "#004080" }, // Darker blue on hover
            }}
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
        All Users
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "#1a1a1a",
            color: "white",
            width: "100%",
            "& .MuiInputBase-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
            "& .MuiOutlinedInput-notchedOutline:hover": { borderColor: "#555" },
          }}
          InputLabelProps={{
            style: { color: "#ccc" },
          }}
        />
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
          rows={filteredUsers}
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
            "& .MuiSvgIcon-root": {
              color: "#ccc",
            },
            "& .MuiSvgIcon-root:hover": {
              color: "#fff",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "rgb(31 41 55)",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            overflow: "scroll",
            backgroundColor: "rgb(17 24 39)",
          }}
        />
      </Box>
    </Box>
  );
};

export default AllUsers;
