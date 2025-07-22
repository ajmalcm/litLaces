import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const userReducerApi=createApi({
    reducerPath:"user",
    baseQuery:fetchBaseQuery({baseUrl:"https://lit-laces.vercel.app",credentials:"include"}),
    endpoints:(builder)=>({
        loadUser:builder.query({
            query:()=>"user/me",
            keepUnusedDataFor:0, // disables caching
        }),
        registerUser:builder.mutation({query:(userData)=>({
            url:"user/register",
            method:"POST",
            body:userData,
            keepUnusedDataFor:0, // disables caching
        })}),
        loginUser:builder.mutation({query:(credentials)=>({
            url:"user/login",
            method:"POST",
            body:credentials,
            keepUnusedDataFor:0, // disables caching
        })}),
        logoutuser:builder.mutation({query:()=>"user/logout"}),
        getProducts:builder.query({
            query:({id="",keyword="",page=1})=>{
                let url=`products`;
                if(id) url+=`/${id}`;
                const param=[];
                if(keyword) param.push(`keyword=${encodeURIComponent(keyword)}`);
                if(page) param.push(`page=${page}`);
                if(param.length>0) url+=`?${param.join("&")}`;
                return url;
            },
        }),
        getProductDetails:builder.query({
            query:(id)=>`products/details/${id}`,
            keepUnusedDataFor:0, // disables caching
        })
    })

})

export const {useLoadUserQuery,useRegisterUserMutation,useLoginUserMutation,useLogoutuserMutation,useGetProductsQuery,useGetProductDetailsQuery}=userReducerApi