import { combineReducers } from "redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';

const user = createSlice({
    name: "userReducer",
    initialState: {name: ""},
    reducers: {
        add: (state, action) => {
            return {name: action.payload};
        },
        remove: (state, action) => {
            
        }
    }
});

const reducers = combineReducers({
    nameReducer: user.reducer,
})

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers)

const userStore = configureStore({ 
    reducer: persistedReducer,
    middleware: [thunk],
});

export const { add, remove } = user.actions;

export default userStore;