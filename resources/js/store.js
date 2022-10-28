import { createStore, combineReducers } from "redux";
import appReducer from "./redux/reducers";

const store = createStore(
    appReducer
);

export default store;
