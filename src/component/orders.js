import React from 'react';
import { Table, InputNumber, Button, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash'
import * as Columns from '../constants/table-columns'
import * as Strings from '../constants/strings'
import * as ActionTypes from '../actions/action-type'
import { DownOutlined } from '@ant-design/icons';

var id = null;
class Orders extends React.Component{
    ProductColumns = [
        {
            title: 'Record Id',
            dataIndex: 'entryId',
            key: 'entryId'
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
        },
        {
            title: 'Product Id',
            dataIndex: 'productId',
            key: 'productId'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text, record) => <InputNumber min={1} max={100} defaultValue={text} onChange={(value) => this.quantityChanged(value, record)}/>
        },
    ]
    OrdersColumns = [
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
            render: (text, record) => (<Dropdown overlay={() => this.MenuList(record)}>
                    <Button>
                     {text} <DownOutlined />
                    </Button>
                </Dropdown>)
        }
    ]
    menu = ["READY", "SHIPPED", "DISPATCHED", "OUTFORDILEVERED", "DILEVERED"]
    MenuList(record) {
        return(
            <Menu onClick={(event) => this.handleMenuClick(event, record)}>
                <Menu.Item key="0">
                    {this.menu[0]}
                </Menu.Item>
                <Menu.Item key="1">
                    {this.menu[1]}
                </Menu.Item>
                <Menu.Item key="2">
                    {this.menu[2]}
                </Menu.Item>
                <Menu.Item key="3">
                    {this.menu[3]}
                </Menu.Item>
                <Menu.Item key="4">
                    {this.menu[4]}
                </Menu.Item>
            </Menu>
        )
    }
    
    // onClick={(event) => {this.showOrderDetails(event, record.orderId, null)}}
    constructor(props) {
        super(props);
        this.showOrderDetails = this.showOrderDetails.bind(this);
        this.quantityChanged = this.quantityChanged.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.MenuList = this.MenuList.bind(this);
        this.state = {
            selectedOrder: null
        }
    }
    handleMenuClick(e, record) {
        const action = {
            type: ActionTypes.CHANGESTATUS,
            payload: {
                customerId: id,
                orderId: record.orderId,
                orderStatus: this.menu[e.key]
            }
        }
        this.props.updateQuantity(action);
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
    showOrderDetails(event, orderId, customer) {
        // console.log("clicked",orderId);
        if (customer != null && orderId != null) {
            var products = [];
            _.forEach(customer.orders, function (order) {
                if (order.orderId === orderId) {
                    products.push({
                        orderId: order.orderId,
                        entryId: order.entryId,
                        productId: order.productId,
                        productName: order.productName,
                        quantity: order.quantity
                    });
                }
            })
            // console.log(`${JSON.stringify(products)}`);
            this.setState({
                selectedOrder: products
            })
        }
    }
    updateCustomers(id, allCustomers) {
        let customer = _.find(allCustomers, function (customer) {
            if (customer.customerId === id)
                return customer;
        });
        return customer;
        
    }
    getOrdersForCustomer(customer) {
        if (customer != null) {
            let orders = _.uniqBy(customer.orders, 'orderId');
            orders = _.orderBy(orders, ['orderId'], ['asc']);
            _.forEach(orders, function (order) {
                let date = new Date(order.orderDate);
                order.orderDate = date.toDateString();
            })
            return orders
        }
        return null;
    }
    fetchAllProductsOrdered(customer) {
        if (customer != null) {
            let orderedProducts = []
                _.forEach(customer.orders, function (order) {
                    if (orderedProducts.length === 0) {
                        orderedProducts.push({
                            productId: order.productId,
                            productName: order.productName,
                            quantity: order.quantity
                        })
                    }
                    else {
                        var index = _.findIndex(orderedProducts, function (o) { return o.productId === order.productId })
                        if (index === -1) {
                            orderedProducts.push({
                                productId: order.productId,
                                productName: order.productName,
                                quantity: order.quantity
                            })   
                        }
                        else {
                            const newq = orderedProducts[index].quantity;
                            const presentq = order.quantity;
                            orderedProducts[index].quantity = newq + presentq;
                        }
                    }
                })
            return orderedProducts;
        }
        return null;
    }
    render() {
        const allCustomers = this.props.customers;
        id = this.props.match.params.id;
        id = parseInt(id);
        
        const customer = this.updateCustomers(id, allCustomers);
        const orders = this.getOrdersForCustomer(customer)
        const orderedProducts = this.fetchAllProductsOrdered(customer);
        
        return (
            <div className="container">
                <div className= "subcontainer">
                    <h5 style={{ textAlign: "left", marginBottom: "20px" }}>{Strings.orderListHeaderText + this.props.match.params.id}</h5>
                    <div className="row">
                        <div className="col-md-7">
                            {customer ? <Table columns={this.OrdersColumns} locale={{emptyText: Strings.emptyTableText}}
                                pagination={false} dataSource={orders} rowKey="orderId" onRow={(record, index) => {
                                return {
                                    onClick: (event) => {this.showOrderDetails(event, record.orderId, customer)}
                                }
                            }}/> : <div></div>}
                        </div>
                        <div className="col-md-5">
                            <Table  columns={this.ProductColumns} rowKey="entryId" pagination={false}
                                locale={{ emptyText: Strings.emptyProductTableText }} dataSource={this.state.selectedOrder} />
                        </div>
                    </div>
                </div>
                <div className = "subcontainer">
                    <h5 style={{ textAlign: "left", marginBottom: "20px" }}>{Strings.productsListHeaderText + this.props.match.params.id}</h5>
                    <div className="row">
                        <div className="col-md-12">
                            {orderedProducts ? <Table columns={Columns.AllProductColumns} locale={{emptyText: Strings.emptyTableText}}
                                dataSource={orderedProducts} rowKey="productId" pagination={false} /> : <div></div>}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        customers: state.customers
    }
}
const mapDispatchToProps = dispatch => ({
    updateQuantity: action => dispatch(action),
    changeStatus: action => dispatch(action)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);