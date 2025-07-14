import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const userReducerApi=createApi({
    reducerPath:"user",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/api/"}),
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
    })

})

export const {useLoadUserQuery,useRegisterUserMutation,useLoginUserMutation,useLogoutuserMutation}=userReducerApi