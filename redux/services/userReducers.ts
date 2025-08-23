import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userReducerApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["User", "Product", "Cart", "Order", "Admin"], // ✅ declare tags
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: () => "user/me",
      providesTags: ["User"], // ✅ provides user data
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "user/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"], // ✅ refresh user after register
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"], // ✅ refresh after login
    }),

    logoutuser: builder.mutation({
      query: () => "user/logout",
      invalidatesTags: ["User", "Cart", "Order"], // ✅ clear all user-related caches
    }),

    getProducts: builder.query({
      query: ({ id = "", keyword = "", page = 1, gte = 0, lte = 10000 }) => {
        let url = `products`;
        if (id) url += `/${id}`;
        const param = [];
        if (keyword) param.push(`keyword=${encodeURIComponent(keyword)}`);
        if (gte || lte) {
          param.push(`gte=${gte}`);
          param.push(`lte=${lte}`);
        }
        if (page) param.push(`page=${page}`);
        if (param.length > 0) url += `?${param.join("&")}`;
        return url;
      },
      providesTags: ["Product"], // ✅ cache by tag
    }),

    getProductDetails: builder.query({
      query: (id) => `products/details/${id}`,
      providesTags: ["Product"],
    }),

    getCart: builder.query({
      query: () => "user/cart",
      providesTags: ["Cart"],
    }),

    addToOrIncreaseCart: builder.mutation({
      query: ({ action, product }) => ({
        url: "user/cart/add",
        method: "POST",
        body: { action, product },
      }),
      invalidatesTags: ["Cart"], // ✅ refetch cart
    }),

    removeFromOrDecreaseCart: builder.mutation({
      query: ({ productId, action, size }) => ({
        url: "user/cart/remove",
        method: "POST",
        body: { productId, action, size },
      }),
      invalidatesTags: ["Cart"], // ✅ refetch cart
    }),

    orderPayment: builder.mutation({
      query: ({ amount }) => ({
        url: "user/order/payment",
        method: "POST",
        body: { amount },
      }),
    }),

    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "user/order/createOrder",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order", "Cart"], // ✅ refresh orders & cart
    }),

    getMyOrders: builder.query({
      query: () => "user/order/myOrders",
      providesTags: ["Order"],
    }),

    getOrderDetails: builder.query({
      query: ({ id }) => `user/order/orderDetails/${id}`,
      providesTags: ["Order"],
    }),

    getAdminAllProducts: builder.query({
      query: () => "admin/allProducts",
      providesTags: ["Admin", "Product"],
    }),

    getAdminAllUsers: builder.query({
      query: () => "admin/allUsers",
      providesTags: ["Admin", "User"],
    }),

    getAdminAllOrders: builder.query({
      query: () => "admin/allOrders",
      providesTags: ["Admin", "Order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `admin/allOrders/update/${id}`,
        body: { status },
        method: "POST",
      }),
      invalidatesTags: ["Order", "Admin"], // ✅ refresh orders after update
    }),

    getUserDetails: builder.query({
      query: (id) => `admin/allUsers/${id}`,
      providesTags: ["User", "Admin"],
    }),

    updateUser:builder.mutation({
      query:({id,name,email,phone,role})=>({
        url:"admin/allUsers/update",
        method:"POST",
        body:{id,name,email,phone,role}
      }),
      invalidatesTags:["User","Admin"] // ✅ refresh users after update
    })
  }),
});

export const {
  useLoadUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutuserMutation,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetAdminAllProductsQuery,
  useGetAdminAllUsersQuery,
  useGetCartQuery,
  useAddToOrIncreaseCartMutation,
  useRemoveFromOrDecreaseCartMutation,
  useOrderPaymentMutation,
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetAdminAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userReducerApi;
