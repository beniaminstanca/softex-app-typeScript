import { configureStore } from "@reduxjs/toolkit";
import offerReducer from "./date-oferta";
import authReducer from "./auth";

const store = configureStore({
  reducer: { auth: authReducer, oferta: offerReducer},
});

export default store;
