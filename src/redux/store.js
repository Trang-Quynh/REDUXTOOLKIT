import {applyMiddleware, createStore} from "redux";
import {StudentReducer} from "./reducer";
import thunk from "redux-thunk";

export const store = createStore(StudentReducer, applyMiddleware(thunk))