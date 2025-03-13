import { configureStore } from "@reduxjs/toolkit";
import { userReducerApi } from "./services/userReducers";
import userSlice from "./reducers/userSlice";


export const store=configureStore({
    reducer:{
        [userReducerApi.reducerPath]:userReducerApi.reducer,
        [userSlice.name]:userSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(userReducerApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;