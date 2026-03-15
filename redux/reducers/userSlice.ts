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
    }>,
    bannerData?: {
        heroL?: {
            public_id: string;
            url: string;
        };
        heroSM?: {
            public_id: string;
            url: string;
        };
        banner1?: {
            public_id: string;
            url: string;
        };
        banner2?: {
            public_id: string;
            url: string;
        };
        banner3?: {
            public_id: string;
            url: string;
        };
    }
}

const initialState: UserState = {
    isAuthenticated: false,
    isAdmin: false,
    name: '',
    cart: [],
    bannerData: ((): UserState['bannerData'] => {
        const empty = {
            heroL: { public_id: '', url: '' },
            heroSM: { public_id: '', url: '' },
            banner1: { public_id: '', url: '' },
            banner2: { public_id: '', url: '' },
            banner3: { public_id: '', url: '' },
        } as UserState['bannerData'];

        try {
            if (typeof window === 'undefined') return empty;
            const raw = localStorage.getItem('bannerData');
            if (!raw) return empty;
            const parsed = JSON.parse(raw);
            return parsed ?? empty;
        } catch (e) {
            return empty;
        }
    })()
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
        },
        setBannerData(state, action: PayloadAction<UserState['bannerData']>) {
            state.bannerData = action.payload;
        }
    },
});

export const { setAuthenticated, setAdmin ,setName,setCart,setBannerData} = userSlice.actions;
export default userSlice;