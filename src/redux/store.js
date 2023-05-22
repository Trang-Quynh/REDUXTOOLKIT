import {applyMiddleware, createStore} from "redux";
import studentReducer from "./students/studentSlice";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

// export const store = createStore(StudentReducer, applyMiddleware(thunk))
const store = configureStore({reducer:{students: studentReducer}})
export default store;



// Sử dụng khi projetc có nhiều reducer
// const rootReducer = combineReducers({
//     students: studentReducer,
//     classes: classReducer
// });
//
// const store = configureStore({ reducer: rootReducer });
