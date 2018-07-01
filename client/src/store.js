import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import indexReducer from './reducers/index';

const middleware = [thunk];
const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    indexReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware)
    ));


export default store;