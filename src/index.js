import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import reducer from './reducers/reducer'
import { Provider } from 'react-redux';
import { createStore} from 'redux'
/**
 * initially the store only contains an empty array of customers
 */
const initialState = { "customers": [] }

const store = createStore(reducer,initialState);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export default store;
