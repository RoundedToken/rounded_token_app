import { configureStore } from '@reduxjs/toolkit';
import theme from './themeSlice';
import input from './inputSlice';
import settings from './settingsSlice';
import auth from './authSlice';
import page from './pageSlice';

export const store = configureStore({
    reducer: {
        theme,
        input,
        settings,
        page,
        auth,
    },
});
