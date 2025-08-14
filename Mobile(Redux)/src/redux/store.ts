import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "@features/Mobile/mobile.slice";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
