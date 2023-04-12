import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    color: localStorage.theme === undefined ? 'dark' : localStorage.theme,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.color = state.color === 'dark' ? 'light' : 'dark';
            localStorage.theme = state.color;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
