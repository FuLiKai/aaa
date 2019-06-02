import * as reducers from './reducer';
import rootSaga from './saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';

const reducer = combineReducers(reducers);
const saga = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(saga)
);

saga.run(rootSaga);

export default store;