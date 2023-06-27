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
        setArtItem: (state, payload) => {
            const i = state.arts.findIndex(item => item.id === payload.payload.id);
            state.arts.splice(i, 1, payload.payload);
        },
        addArtItem: (state, payload) => {
            state.arts.push(payload.payload);
        },
        deleteArtItem: (state, payload) => {
            const i = state.arts.findIndex(item => item.id === payload.payload.id);
            state.arts.splice(i, 1);
        }
    },
});

export const {
    setArts,
    setArtItem,
    addArtItem,
    deleteArtItem,
} = simpleArtsSlice.actions;

export default simpleArtsSlice.reducer;