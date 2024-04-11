import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";

import { productReducer } from "./productReducer";

import { composeWithDevTools } from "@redux-devtools/extension"
import { thunk } from 'redux-thunk'

const action = {
    type: "",
    payload: "?"
}

const rootReducer = combineReducers({
    product: productReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))