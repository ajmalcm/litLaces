import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const userReducerApi=createApi({
    reducerPath:"user",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/api/"}),
    endpoints:(builder)=>({
        loadUser:builder.query({query:()=>"user/me"}),
        registerUser:builder.mutation({query:(userData)=>({
            url:"user/register",
            method:"POST",
            body:userData,
        })}),
        loginUser:builder.mutation({query:(credentials)=>({
            url:"user/login",
            method:"POST",
            body:credentials
        })})
    })

})

export const {useLoadUserQuery,useRegisterUserMutation,useLoginUserMutation}=userReducerApi