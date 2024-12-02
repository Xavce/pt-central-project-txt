import React, {useEffect, useState} from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { Button, Modal, theme, Popover } from 'antd';
import downloadFileIcon from '../assets/download-file.svg'
import eyeIcon from '../assets/eye.svg'
import infoIcon from '../assets/information.svg'
import data from "../../dummy/sales_invoice.json"
import {Parse, Calculate} from "../services/utils.ts"
import {JsonViewerComponent} from "./jsonviewer.tsx";

const {useToken} = theme

interface InputComponentProps {
    isLoading: boolean;
    inputValue: string
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableComponent : React.FC<InputComponentProps> = ({ inputValue, isLoading, setIsLoading }) => {
    const { token } = useToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>([]);
    const [selectedRowData, setSelectedRowData] = useState({});


    interface DataType {
        name: string;
        total: number;
        transaction_no: number;
        detail_data: object;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Display Name',
            width: 50,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["ascend",'descend'],
        },
        {
            title: 'Total',
            width: 50,
            dataIndex: 'total',
            key: 'total',
            fixed: 'left',
            sorter: (a, b) => a.total - b.total,
            render: (value:number) => Parse.numberToCurrency(value),
            sortDirections: ["ascend",'descend'],
        },
        {
            title: 'Transaction No.',
            dataIndex: 'transaction_no',
            key: '1',
            sorter: (a, b) => a.transaction_no - b.transaction_no,
            width: 50,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 20,
            render: (_,record) =>
                <div style={{ display: 'flex', gap: '10px', justifyContent:'right' }}>
                    <Popover
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={infoIcon} alt="Info" style={{ width: '16px', height: '16px' }} />
                                <span>Preview Invoice</span>
                            </div>
                        }
                        trigger="hover"
                        placement="bottomRight">
                        <Button
                            color="primary"
                            variant="outlined"
                            icon={<img src={eyeIcon} alt="Preview Icon" style={{ width: 16, height: 16 }} />}
                            onClick={() => {
                                console.log(_['detailed_data'])
                                setSelectedRowData(record)
                                setIsModalOpen(true)
                            }}
                        />
                    </Popover>
                    <Popover
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={infoIcon} alt="Info" style={{ width: '16px', height: '16px' }} />
                                <span>Export to TXT</span>
                            </div>
                        }
                        trigger="hover" placement="bottomRight">
                        <Button
                            style={{
                                color:token.colorPrimary
                            }}
                            color="primary"
                            variant="solid"
                            icon={<img src={downloadFileIcon} alt="Download Icon" style={{ width: 16, height: 16 }} />}
                        />
                    </Popover>
                </div>
        },
    ];


    const getDataSource = () => {
        return data["sales_invoices"].map<DataType>((i) => ({
            key: i['id'],
            name: i['person']['display_name'], // Dynamic name
            total: Parse.currencyStringToNumber(i['original_amount_currency_format']), // Static value
            transaction_no: i['id'], // Dynamic transaction number
            detail_data: i
        }))

    };

    const handleInputChange =  (searchTerm: string) => {
        if (searchTerm !== '') {
            const filteredItems = dataSource.filter((data) =>
                data.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDataSource(filteredItems);
        } else {
            setFilteredDataSource([]);
        }
    };

    useEffect(() => {
        if (inputValue !== '') {
            handleInputChange(inputValue);
        } else {
            setDataSource(getDataSource());
        }

    }, [inputValue]);


    return (
        <>
            <Table<DataType>
                loading={isLoading}
                columns={columns}
                pagination={{
                    showSizeChanger:true,
                    total: inputValue != '' ? filteredDataSource.length: dataSource.length,
                    onChange: (page, pageSize) => console.log(page, pageSize)
                }}
                dataSource={inputValue != '' ? filteredDataSource: dataSource}
                scroll={{x: 500}}
                showSorterTooltip={{target: 'sorter-icon'}}
                summary={() => (
                    <Table.Summary fixed="bottom">
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} >
                                <b style={{color: token.colorPrimary}}>
                                    Row Count: {inputValue != '' ? filteredDataSource.length: dataSource.length}
                                </b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={2}>
                                <b style={{color: token.colorPrimary}}>
                                    {
                                       Calculate.grandTotal(inputValue != '' ? filteredDataSource: dataSource)
                                    }
                                </b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3} align={'right'}>
                                <Button
                                    color="primary"
                                    variant="solid">
                                    Export all
                                </Button>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                // antd site header height
                sticky={{offsetHeader: 64}}
            />
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
                footer={[
                    <Button
                        style={{position: "sticky"}}
                        key="close"
                        onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>,
                ]}
            >
                <JsonViewerComponent
                    jsonData={selectedRowData}/>
            </Modal>
        </>

    );
};

