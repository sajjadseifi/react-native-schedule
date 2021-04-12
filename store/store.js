import React from 'react';
import AuthReducer from "./reducer/auth";
import SechudelReducer from "./reducer/sechudel";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  auth: AuthReducer,
  schedules: SechudelReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const Store = ({ children }) => <Provider store={store}>{children}</Provider>;


export default Store;