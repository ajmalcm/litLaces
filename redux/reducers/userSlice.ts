import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    name:string
}

const initialState: UserState = {
    isAuthenticated: false,
    isAdmin: false,
    name: '',
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
        }
    },
});

export const { setAuthenticated, setAdmin ,setName} = userSlice.actions;
export default userSlice;