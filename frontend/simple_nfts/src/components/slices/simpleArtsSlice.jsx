import { createSlice } from "@reduxjs/toolkit";

export const simpleArtsSlice = createSlice({
    name: 'simpleArts',
    initialState: {
        arts: [],
    },
    reducers: {
        setArts: (state, payload) => {
            state.arts = payload.payload;
        },
    },
});

export const {
    setArts,
} = simpleArtsSlice.actions;

export default simpleArtsSlice.reducer;