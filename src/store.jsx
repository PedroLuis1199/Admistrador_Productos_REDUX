import { applyMiddleware } from "redux";
import { compose } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import reducer from "./reducers";

//creacion del store

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), 
        //react dev tolls
        //codigo para que la app funcion con reac dev tols y sin react dev tols
        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?

            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;
