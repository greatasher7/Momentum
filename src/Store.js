import {configureStore, createSlice} from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const user = createSlice({
    name: "userReducer",
    initialState: "",
    reducers: {
        add: (state, action) => {
            return action.payload;
        },
        remove: (state, action) => {
            
        }
    }
});

const persistConfig = {
    key: 'root',
    storage
  };

const persistedReducer = persistReducer(persistConfig, user)

const userStore = configureStore({ reducer: persistedReducer.reducer });

export const { add, remove } = user.actions;

export default userStore;