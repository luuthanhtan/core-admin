import { combineReducers } from "redux";
import settingsReducer from './settingsReducer';

const appReducer = combineReducers({
    settingsReducer,
});

export default appReducer
