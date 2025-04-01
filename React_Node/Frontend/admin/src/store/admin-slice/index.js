import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    isAdminAuthenticated: false,
    isLoading: false,
    admin: null,
};

const adminSlice = createSlice({

    name: "admin",
    initialState,
    reducers: {
        setadmin: (state, action) => {
            state.admin =action.payload;
            state.isAdminAuthenticated = true;
        },
        logoutAdmin: (state) => {
            state.admin = null;
            state.isAdminAuthenticated = false;
        },
    },
});

export const { setadmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;