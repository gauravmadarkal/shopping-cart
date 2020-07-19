import React from 'react';
import {  Button, InputNumber } from 'antd';

export const OrdersColumns = [
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
export const ProductColumns = [
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
        render: text => <InputNumber min={1} max={100} value={text}/>
    },
]
export const AllProductColumns = [
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
        key: 'quantity'
    },
]
export const CustomerColumns = [
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