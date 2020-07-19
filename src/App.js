import React from 'react';
import './App.css';
import customerData from './assets/data.json';
import store  from './index'
import * as ActionType from './actions/action-type'
import Home from './component/home';
import { Layout } from 'antd';
import { connect } from 'react-redux';

const { Footer } = Layout;

class App extends React.Component {
  componentDidMount() {
    var data = customerData.customers;
    this.props.dispatch({
        type: ActionType.ADD_DATA,
        payload: data
    })
  }
  render() {
    return (
      <div className="App">
        <Home/>
        <Footer style={{ textAlign: 'center' }}><h1>Customer Details portal</h1></Footer>
      </div>
    );
  }
}
// const mapStateToProps = () => {
  
// }
export default connect()(App);
