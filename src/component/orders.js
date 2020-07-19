import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash'
import * as Columns from '../constants/table-columns'
import * as Strings from '../constants/strings'

var customer = null;
var orders = null;
var orderedProducts = null;
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
    quantityChanged(value) {
        console.log(value)
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
        customer = _.find(this.props.customers, function (customer) {
            if (customer.customerId == id)
                return customer;
        });
        if (customer != null) {
            orders = _.uniqBy(customer.orders, 'orderId');
            orders = _.orderBy(orders, ['orderId'], ['asc']);
        }
    }
    fetchAllProductsOrdered() {
        if (customer != null && orderedProducts === null ) {
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
        console.log(orderedProducts);
    }
    render() {
        // console.log("hi ", this.props.match.params.id);
        var id = this.props.match.params.id;
        // var obj = _.find(this.props.customers, { 'customerId': this.props.match.params.id })
        this.updateCustomers(id);
        this.fetchAllProductsOrdered();
        return (
            <div className="container">
                <div className = "subcontainer">
                    <h5 style={{ textAlign: "left", marginBottom: "20px" }}>{Strings.productsListHeaderText + this.props.match.params.id}</h5>
                    <div className="row">
                        <div className="col-md-12">
                            {console.log("updating")}
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
                                pagination={false} dataSource={orders} onRow={(record, index) => {
                                return {
                                    onClick: (event) => {this.showOrderDetails(event, record.orderId)}
                                }
                            }}/> : <div></div>}
                        </div>
                        <div className="col-md-4">
                            <Table columns={Columns.ProductColumns} pagination={false}
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
export default connect(mapStateToProps)(Orders);