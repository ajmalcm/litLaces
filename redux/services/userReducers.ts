import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const userReducerApi=createApi({
    reducerPath:"user",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/api/"}),
    endpoints:(builder)=>({
        loadUser:builder.query({query:()=>"user/me"})
    })

})

export const {useLoadUserQuery}=userReducerApi