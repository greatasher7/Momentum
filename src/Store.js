import {configureStore, createSlice} from "@reduxjs/toolkit";

const user = createSlice({
    name: "userReducer",
    initialState: "",
    reducers: {
        add: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
        remove: (state, action) => {

        }
    }
});

const userStore = configureStore({ reducer: user.reducer });

export const { add, remove } = user.actions;

export default userStore;