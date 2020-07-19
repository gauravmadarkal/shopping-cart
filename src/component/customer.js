import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import * as Columns from '../constants/table-columns'

var customers = null;
class Customer extends React.Component{
   render() {
        console.log("hi ");   
        customers = this.props.customers;
        if (customers != null) {
            console.log("hi customer",customers);   
        }
        return (
            customers? <Table columns={Columns.CustomerColumns} dataSource={customers} pagination={false}></Table> : <div></div>
        )
    }
}


const mapStateToProps = state => ({
    customers: state.customers 
})
export default connect(mapStateToProps)(Customer);