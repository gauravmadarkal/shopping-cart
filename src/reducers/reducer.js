import * as ActionType from '../actions/action-type'
/**
 * default reducers for the app
 * @param {*} state current state of the redux-store
 * @param {*} action specifies the kind of action to perform on the store 
 */
export default function reducer(state, action) {
    console.log(action.type);
    switch (action.type) {
        /**
         * changes the state of a particular order
         * based on the passed customerid, orderid to orderStatus
         */
        case ActionType.CHANGESTATUS:
            return Object.assign({}, state, {
                customers: state.customers.map(customer => {
                    if (customer.customerId !== action.payload.customerId) {
                        return customer;
                    }
                    return Object.assign({}, customer, {
                        orders: customer.orders.map(order => {
                            if (order.orderId !== action.payload.orderId) {
                                return order;
                            }
                            return Object.assign({}, order, {
                                status: action.payload.orderStatus
                            })
                        })
                    })
                })
            })
        /**
         * called when the quantity of a product is increased
         */
        case ActionType.UPDATEQUANTITY:
            return Object.assign({}, state, {
                customers: state.customers.map(customer => {
                    if (customer.customerId !== action.payload.customerId) {
                        return customer;
                    }
                    return Object.assign({}, customer, {
                        orders: customer.orders.map(order => {
                            if (order.orderId !== action.payload.orderId || order.productId !== action.payload.productId) {
                                return order;
                            }
                            return Object.assign({}, order, {
                                quantity: action.payload.quantity
                            })
                        })
                    })
                })
            })
        /**
         * adds an item to customer's order summary
         * enhancement feature
         */
        case ActionType.ADDITEM:
            return Object.assign({}, state, {
                customers: state.customers.map(customer => {
                    if (customer.customerId !== action.payload.customerId) {
                        return customer;
                    }
                    return Object.assign({}, customer, {
                        orders: customer.orders.concat(action.payload.order)
                    })
                })     
            })
        /**
         * adds a customer to the list of customers present
         * takes a customer object as input
         * enhancement feature
         */
        case ActionType.ADDCUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload.customer]
            }
        default:
            return state;
    }
}