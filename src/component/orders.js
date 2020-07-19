import React from 'react';
import { Table, InputNumber } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash'
import * as Columns from '../constants/table-columns'
import * as Strings from '../constants/strings'
import * as ActionTypes from '../actions/action-type'

var customer = null;
var orders = null;
var orderedProducts = null;
var allCustomers = null;
var id = null;
class Orders extends React.Component{
    ProductColumns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: 'Product Id',
            dataIndex: 'productId',
            key: 'productId'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => <InputNumber min={1} max={100} defaultValue={text} onChange={(value) => this.quantityChanged(value, record)}/>
        },
    ]
    constructor(props) {
        super(props);
        this.showOrderDetails = this.showOrderDetails.bind(this);
        this.quantityChanged = this.quantityChanged.bind(this);
        this.state = {
            selectedOrder: null
        }
    }
    quantityChanged(value, record) {
        console.log(value)
        console.log(record)
        const action = {
            type: ActionTypes.UPDATEQUANTITY,
            payload: {
                customerId: id,
                orderId: record.orderId,
                productId: record.productId,
                quantity: value
            }
        }
        this.props.updateQuantity(action);
    }
    showOrderDetails(event, orderId) {
        var products = [];
        _.find(customer.orders, function (order) {
            if (order.orderId == orderId)
                products.push(order);
        })
        // console.log(`${JSON.stringify(products)}`);
        this.setState({
            selectedOrder: products
        })
    }
    updateCustomers(id) {
        customer = _.find(allCustomers, function (customer) {
            if (customer.customerId == id)
                return customer;
        });
        if (customer != null) {
            orders = _.uniqBy(customer.orders, 'orderId');
            orders = _.orderBy(orders, ['orderId'], ['asc']);
        }
    }
    fetchAllProductsOrdered() {
        if (customer != null) {
            orderedProducts = []
            _.find(customer.orders, function (order) {
                if (orderedProducts.length === 0)
                    orderedProducts.push(order)
                else {
                    var index = _.findIndex(orderedProducts, function (o) { return o.productId === order.productId })
                    if (index === -1)
                        orderedProducts.push(order)
                    else {
                        orderedProducts[index].quantity = orderedProducts[index].quantity + order.quantity
                    }
                }
            })
        }
        // console.log(orderedProducts);
    }
    render() {
        // console.log("hi ", this.props.match.params.id);
        orderedProducts = null;
        allCustomers = this.props.customers
        id = this.props.match.params.id;
        id = parseInt(id);
        this.updateCustomers(id);
        this.fetchAllProductsOrdered();
        return (
            <div className="container">
                <div className = "subcontainer">
                    <h5 style={{ textAlign: "left", marginBottom: "20px" }}>{Strings.productsListHeaderText + this.props.match.params.id}</h5>
                    <div className="row">
                        <div className="col-md-12">
                            {orderedProducts ? <Table columns={Columns.AllProductColumns} locale={{emptyText: Strings.emptyTableText}}
                                dataSource={orderedProducts} rowKey="productId" pagination={false} /> : <div></div>}
                        </div>
                    </div>
                </div>
                <div className= "subcontainer">
                    <h5 style={{ textAlign: "left", marginBottom: "20px" }}>{Strings.orderListHeaderText + this.props.match.params.id}</h5>
                    <div className="row">
                        <div className="col-md-8">
                            {customer ? <Table columns={Columns.OrdersColumns} locale={{emptyText: Strings.emptyTableText}}
                                pagination={false} dataSource={orders} rowKey="orderId" onRow={(record, index) => {
                                return {
                                    onClick: (event) => {this.showOrderDetails(event, record.orderId)}
                                }
                            }}/> : <div></div>}
                        </div>
                        <div className="col-md-4">
                            <Table columns={this.ProductColumns} rowKey="productId" pagination={false}
                                locale={{ emptyText: Strings.emptyProductTableText }} dataSource={this.state.selectedOrder} />
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customers: state.customers 
})
const mapDispatchToProps = dispatch => ({
    updateQuantity: action => dispatch(action)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);