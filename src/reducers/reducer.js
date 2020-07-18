import * as ActionType from '../actions/action-type'
/**
 * default reducers for the app
 * @param {*} state current state of the redux-store
 * @param {*} action specifies the kind of action to perform on the store 
 */
export default function reducer(state, action) {
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
         * adds an item to customer's order summary
         * triggered when user increases the quantity of an added product
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
         */
        case ActionType.ADDCUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload.customer]
            }
        /**
         * called when application starts, data is loaded from data.json file present in assets
         */
        case ActionType.ADD_DATA:
            return {
                ...state,
                "customers": action.payload
            }
        default:
            return state;
    }
}