import { configureStore } from "@reduxjs/toolkit";

import ModalSlice from "./features/ModalSlice";

export const store = configureStore({
    reducer: {
        modal:ModalSlice
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;