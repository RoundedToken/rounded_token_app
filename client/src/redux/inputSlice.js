import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    decimalsCount: localStorage.decimalsCount === undefined ? '6' : localStorage.decimalsCount,
    percents: localStorage.percents === undefined ? '0.05' : localStorage.percents,
    percentsId: localStorage.percentsId === undefined ? '4' : localStorage.percentsId,
    decimalsLimit: localStorage.decimalsLimit === undefined ? '1' : localStorage.decimalsLimit,
    float: localStorage.float === undefined ? '' : localStorage.float,
    tableMode: localStorage.tableMode === undefined ? false : localStorage.tableMode === 'true',
    custom: localStorage.custom === undefined ? '' : localStorage.custom,
    limitOptions: localStorage.limitOptions === undefined ? 'in %' : localStorage.limitOptions,
    absoluteLimit: localStorage.absoluteLimit === undefined ? '' : localStorage.absoluteLimit,
    lang: localStorage.lang === undefined ? 'eng' : localStorage.lang,
};

export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setDecimalsCount(state, action) {
            state.decimalsCount = action.payload;
            localStorage.decimalsCount = action.payload;
        },
        setFloat(state, action) {
            state.float = action.payload;
            localStorage.float = action.payload;
        },
        setPercents(state, action) {
            state.percents = action.payload;
            localStorage.percents = action.payload;
        },
        setPercentsId(state, action) {
            state.percentsId = action.payload;
            localStorage.percentsId = action.payload;
        },
        setDecimalsLimit(state, action) {
            state.decimalsLimit = action.payload;
            localStorage.decimalsLimit = state.decimalsLimit;
        },
        setTableMode(state) {
            state.tableMode = !state.tableMode;
            localStorage.tableMode = state.tableMode;
        },
        setCustom(state, action) {
            state.custom = action.payload;
            localStorage.custom = state.custom;
        },
        setLimitOptions(state, action) {
            state.limitOptions = action.payload;
            localStorage.limitOptions = state.limitOptions;
        },
        setAbsoluteLimit(state, action) {
            state.absoluteLimit = action.payload;
            localStorage.absoluteLimit = state.absoluteLimit;
        },
        setLang(state) {
            state.lang = state.lang === 'eng' ? 'rus' : 'eng';

            if (state.limitOptions === 'in %') {
                state.limitOptions = 'в %';
                localStorage.limitOptions = state.limitOptions;
            } else if (state.limitOptions === 'в %') {
                state.limitOptions = 'in %';
                localStorage.limitOptions = state.limitOptions;
            }

            if (state.limitOptions === 'by decimals') {
                state.limitOptions = 'по десятичным';
                localStorage.limitOptions = state.limitOptions;
            } else if (state.limitOptions === 'по десятичным') {
                state.limitOptions = 'by decimals';
                localStorage.limitOptions = state.limitOptions;
            }

            if (state.limitOptions === 'absolute') {
                state.limitOptions = 'абсолютный';
                localStorage.limitOptions = state.limitOptions;
            } else if (state.limitOptions === 'абсолютный') {
                state.limitOptions = 'absolute';
                localStorage.limitOptions = state.limitOptions;
            }

            localStorage.lang = state.lang;
        },
    },
});

export const {
    setDecimalsCount,
    setFloat,
    setPercents,
    setPercentsId,
    setTableMode,
    setCustom,
    setDecimalsLimit,
    setLimitOptions,
    setAbsoluteLimit,
    setLang,
} = inputSlice.actions;

export default inputSlice.reducer;
