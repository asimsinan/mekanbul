import { configureStore } from "@reduxjs/toolkit";
import venueReducer from "./reducer";
const store=configureStore({reducer:venueReducer});
export default store;
