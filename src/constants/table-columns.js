import React from 'react';
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