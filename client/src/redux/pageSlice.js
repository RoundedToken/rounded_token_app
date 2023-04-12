import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: localStorage.page ? localStorage.page : '',
};

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
            localStorage.page = state.page;
        },
    },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
