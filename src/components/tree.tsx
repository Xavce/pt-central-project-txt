import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import data from "../../dummy/sales_invoice.json"

console.log(data.sales_invoices[0].transaction_lines_attributes[])

export const TreeComponent = ( ) => {

    return (
        <Tree
            style={{padding:'20px'}}
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            treeData={treeData}
        />
    );
}