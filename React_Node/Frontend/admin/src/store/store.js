import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin-slice";

const store = configureStore({

    reducer : {

        admin: adminReducer,
    },
});

export default store;