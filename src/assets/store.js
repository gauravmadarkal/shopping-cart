import { createStore } from 'redux';
import reducer from '../reducers/reducer'

/**
 * initially the store only contains an empty array of customers
 */
const initialState = { "customers": [] }

const store = createStore(reducer,initialState);

export default store;