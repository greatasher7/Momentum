import { combineReducers } from "redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';

const reducer = createSlice({
    name: "userReducer",
    initialState: {
        name: "", 
        todos: [],
    },
    reducers: {
        addName: (state, action) => {
            return {...state, name: action.payload};
        },
        removeName: () => {
            return {name: "", todos: []}
        },
        addTodo: (state, action) => {   
            return {...state, todos: [...state.todos, {id: Date.now(), text: action.payload}]}
        },
        removeTodo: (state, action) => {
            return {...state, todos: state.todos.filter(todo => todo.id !== parseInt(action.payload))}
        },
    }
});

const reducers = combineReducers({
    Reducer: reducer.reducer,
});

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const userStore = configureStore({ 
    reducer: persistedReducer,
    middleware: [thunk],
});

export const { addName, removeName, addTodo, removeTodo } = reducer.actions;

export default userStore;