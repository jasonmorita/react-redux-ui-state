import { combineReducers, createStore } from "redux";
import { uiStateReducer } from "react-redux-ui-state";

const rootReducer = combineReducers({ uiState: uiStateReducer });

export default initialState => {
    return createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
};
