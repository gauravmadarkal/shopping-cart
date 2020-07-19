import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
const data = [
    {
        key: '1',
        name: 'John Brown',
        id: 32,
        orders: 'View Orders'
    },
    {
        key: '2',
        name: 'Jim Green',
        id: 42,
        orders: 'View Orders'
    },
    {
        key: '3',
        name: 'Joe Black',
        id: 32,
        orders: 'View Orders'
    }
];
const columns = [
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Customer Id',
        dataIndex: 'customerId',
        key: 'customerId',
    },
    {
        title: 'View Orders',
        dataIndex: 'vorders',
        key: 'vorders',
        render: (text,  record) => <a href={'/customer/' + record.customerId}>Orders</a>
    }
]
var customers = null;
class Customer extends React.Component{
 
    constructor(props) {
        // props = props;
        super(props)
    }
    componentDidMount() {
        
    }
    render() {
        console.log("hi ");   
        customers = this.props.customers;
        if (customers != null) {
            console.log("hi customer",customers);   
        }
        return (
            customers? <Table columns={columns} dataSource={customers}></Table> : <div></div>
        )
    }
}


const mapStateToProps = state => ({
    customers: state.customers 
})
export default connect(mapStateToProps)(Customer);