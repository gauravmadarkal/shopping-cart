import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash'
const OrdersColumns = [
    {
        title: 'Order Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>
    },
    {
        title: 'Order Id',
        dataIndex: 'orderId',
        key: 'orderId'
    },
    {
        title: 'Order Date',
        dataIndex: 'orderDate',
        key: 'orderDate'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => <Button>{text}</Button>
    }
]
const ProductColumns = [
    {
        title: 'Product Id',
        dataIndex: 'productId',
        key: 'productId'
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity'
    },
]
var customer = null;
var orders = null;
class Orders extends React.Component{
    constructor(props) {
        super(props);
        this.showOrderDetails = this.showOrderDetails.bind(this);
        this.state = {
            selectedOrder: null
        }
    }
    componentDidMount() {
        
    }
    showOrderDetails(event, orderId) {
        var products = [];
        _.find(customer.orders, function (order) {
            if (order.orderId == orderId)
                products.push(order);
        })
        console.log(`${JSON.stringify(products)}`);
        this.setState({
            selectedOrder: products
        })
    }
    render() {
        console.log("hi ", this.props.match.params.id);
        var id = this.props.match.params.id;
        // var obj = _.find(this.props.customers, { 'customerId': this.props.match.params.id })
        customer = _.find(this.props.customers, function (customer) {
            if (customer.customerId == id)
                return customer;
        });
        if (customer != null) {
            orders = _.uniqBy(customer.orders, 'orderId');
            orders = _.orderBy(orders, ['orderId'], ['asc']);
        }
        return (
            <div className="container">
                <h4 style={{textAlign:"left", marginBottom:"20px"}}>List of orders for customer id: {this.props.match.params.id}</h4>
                <div className="row">
                    <div className="col-md-8">
                        {customer ? <Table columns={OrdersColumns} dataSource={orders} onRow={(record, index) => {
                            return {
                                onClick: (event) => {this.showOrderDetails(event, record.orderId)}
                            }
                        }}/> : <div></div>}
                    </div>
                    <div className="col-md-4">
                        <Table columns={ProductColumns} dataSource={this.state.selectedOrder}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customers: state.customers 
})
export default connect(mapStateToProps)(Orders);