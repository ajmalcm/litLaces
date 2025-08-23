"use client";

import React, { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useGetAdminAllUsersQuery } from "@/redux/services/userReducers";
import UpdateUserData from "@/components/UpdateUserData";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const AllUsers = () => {
  const { data = [], isLoading, error } = useGetAdminAllUsersQuery("");
  const [search, setSearch] = useState("");
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userId,setUserId]=useState<string>("");
  const isMobile = useMediaQuery("(max-width:600px)");

  // Filter out deleted users
  const filteredUsers = useMemo(() => {
    return data
      .filter((user: UserType) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((user: UserType) => !deletedIds.includes(user._id))
      .map((user: UserType) => ({ ...user, id: user._id }));
  }, [data, search, deletedIds]);

  // Delete Handler
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setDeletedIds((prev) => [...prev, id]);
    }
  };

  // DataGrid Columns
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params: any) => (
        <img
          src={
            params.value?.url ||
            "https://i.pinimg.com/1200x/0e/fb/61/0efb6114dea714848e0bb9fdfae651aa.jpg"
          }
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
    { field: "_id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params: any) => (
        <span style={{ color: params.value === "admin" ? "green" : "blue" }}>
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
              color: "#007BFF",
              "&:hover": { color: "#0056b3" },
            }}
            onClick={() => {  setShowModal(true); setUserId(params.row.id)}}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#0056b3",
              "&:hover": { color: "#004080" },
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading users.</Typography>;

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
        All Users
      </Typography> */}
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
      {
        showModal &&
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full h-full'>

          <UpdateUserData showModal={showModal} setShowModal={setShowModal} id={userId}/>
        </div>
      }
    </Box>
  );
};

export default AllUsers;
