import { configureStore } from "@reduxjs/toolkit";

import simpleArtsReducer from "../slices/simpleArtsSlice";

export default configureStore({
    reducer: {
        simpleArts: simpleArtsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})