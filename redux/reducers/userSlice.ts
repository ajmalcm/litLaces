import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const initialState: UserState = {
    isAuthenticated: false,
    isAdmin: false,
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
    },
});

export const { setAuthenticated, setAdmin } = userSlice.actions;
export default userSlice;