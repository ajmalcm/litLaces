import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { set } from 'mongoose';

interface UserState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    name:string;
    cart:Array<{
        product: string;
        quantity: number;
        size: string;
        price: number;
        name: string;
        image: {
            public_id: string;
            url: string;
        };
    }>
}

const initialState: UserState = {
    isAuthenticated: false,
    isAdmin: false,
    name: '',
    cart:[]
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        setAdmin(state, action: PayloadAction<boolean>) {
            state.isAdmin = action.payload;
        },
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setCart(state,action:PayloadAction<UserState['cart']>) {
            state.cart = action.payload;
        }
    },
});

export const { setAuthenticated, setAdmin ,setName,setCart} = userSlice.actions;
export default userSlice;