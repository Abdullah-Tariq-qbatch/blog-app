/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import api from '../fetchData';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Use compose from redux
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(api))));
export default store;
