import React from 'react';
import './App.css';
import customerData from './assets/data.json';
import * as ActionType from './actions/action-type'
import Home from './component/home';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import * as Strings from './constants/strings'

const { Footer } = Layout;

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Home/>
        <Footer style={{ textAlign: 'center' }}><h1>{Strings.appHeading}</h1></Footer>
      </div>
    );
  }
}
// const mapStateToProps = () => {
  
// }
const mapStateToProps = state => ({
  customers: state.customers 
})
export default connect(mapStateToProps)(App);
