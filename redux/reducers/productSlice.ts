import { createSlice } from "@reduxjs/toolkit";

interface ProductState 
    {
        page: number;
        searchText: string;
    }

    const initialState:ProductState={
        page:0,
        searchText:"",
    }


const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setPage(state, action) {
            state.page = action.payload;
        },
        setSearchText(state, action) {
            state.searchText = action.payload;
        }
    }

})

export const { setPage, setSearchText } = productSlice.actions;

export default productSlice;