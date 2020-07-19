import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
const columns = [
    {
        title: 'Order Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>
    },
    {
        title: 'Order Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Order Date',
        dataIndex: 'date',
        key: 'date'
    }
]
class Orders extends React.Component{
    componentDidMount() {
        
    }
    render() {
        console.log("hi ",this.props.match.params.id);
        return (
            <div className="container">
                <h4 style={{textAlign:"left", marginBottom:"20px"}}>List of orders for customer id: {this.props.match.params.id}</h4>
                <div className="row">
                    <div className="col-md-6">
                        <Table columns={columns}/>
                    </div>
                    <div className="col-md-6">
                        <h1>hii</h1>
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