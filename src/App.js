import React from 'react';
import logo from './logo.svg';
import './App.css';
import customerData from './assets/data.json';
import store from './assets/store'
import * as ActionType from './actions/action-type'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var data = customerData.customers;
    store.dispatch({
        type: ActionType.ADD_DATA,
        payload: data
    })
  }
  render() {
    return (
      <div className="App">
        Hello
      </div>
    );
  }
}

export default App;
