import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    close: localStorage.close === undefined ? false : localStorage.close === 'true',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setClose(state) {
            state.close = !state.close;
            localStorage.close = state.close;
        },
    },
});

export const { setClose } = settingsSlice.actions;

export default settingsSlice.reducer;
