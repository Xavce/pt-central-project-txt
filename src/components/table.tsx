import React, {useEffect, useState} from 'react';
import {Input, Table} from 'antd';
import type { TableColumnsType } from 'antd';
import { Button, Modal, theme, Popover, Checkbox } from 'antd';
import downloadFileIcon from '../assets/download-file.svg'
import eyeIcon from '../assets/eye.svg'
import infoIcon from '../assets/information.svg'
import {Parse, Calculate, ExportToTxt} from "../services/utils.ts"
import {JsonViewerComponent} from "./jsonviewer.tsx";
import TxtViewer from "./txtViewer.tsx";
import {DataType} from "../types";


const {useToken} = theme


interface InputComponentProps {
    isLoading: boolean;
    inputValue: string
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    dataSource: object[]
    pageSize: number
    pageLength: number
    placement: string
    option: string
    isSlice7: boolean
}

export const TableComponent : React.FC<InputComponentProps> = ({isSlice7, setInputValue, option, placement, pageLength, dataSource, inputValue, isLoading, setIsLoading, setPageSize, pageSize, setPage }) => {
    const { token } = useToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [detailedRowData, setDetailedRowData] = useState({})

    const [exportSelectedRow, setExportSelectedRow] = useState<object[]>([])

    let columns: TableColumnsType<DataType> = [];

    const handleExportRowUpdate = (rowData: object, value: boolean) => {
        if (value) {
            // Add the row to the array if it's not already present
            setExportSelectedRow(prevState => [...prevState, rowData]);
        } else {
            // Remove the row from the array by filtering it out
            setExportSelectedRow(prevState => prevState.filter(row => row !== rowData));
        }

    };


    const updateFakturNumToLocal = (id, nomor_faktur) => {
        let list_nomor_faktur = JSON.parse(localStorage.getItem("list_nomor_faktur")) || {};

        // Update the invoice number in the local storage object
        list_nomor_faktur[id] = nomor_faktur;
        localStorage.setItem("list_nomor_faktur", JSON.stringify(list_nomor_faktur));
    };

    const getFakturNumFromLocal = (id) => {
        const list_nomor_faktur = JSON.parse(localStorage.getItem("list_nomor_faktur")) || {};

        // Return the invoice number or an empty string if it doesn't exist
        return list_nomor_faktur[id] || '';
    };

    switch (placement){
        case 'sales_invoices':
            columns = [
                {
                    title: ' Transaction Date',
                    width: 50,
                    dataIndex: 'date',
                    key: 'date',
                    fixed: 'left',
                    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                    sortDirections: ["ascend",'descend'],
                },
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
                    dataIndex: "total",
                    key: 'total',
                    fixed: 'left',
                    sorter: (a, b) => a.total - b.total,
                    render: (value:string) => Parse.numberToCurrency(value),
                    sortDirections: ["ascend",'descend'],
                },
                {
                    title: 'Transaction No.',
                    dataIndex: 'id',
                    key: '1',
                    sorter: (a, b) => a.id - b.id,
                    width: 50,
                },
                {
                    title:'Nomor Faktur',
                    key:'no_faktur',
                    width:50,
                    render: (_, record) =>
                        <Input
                            placeholder="Nomor Faktur"
                            defaultValue={getFakturNumFromLocal(_['id'])}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                updateFakturNumToLocal(_['id'], newValue);
                            }}
                        />
                },
                {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 30,
                    render: (_,record) =>
                        <div style={{ display: 'flex', gap: '10px', justifyContent:'right' }}>
                            <Checkbox
                                style={{transform: 'scale(2)', marginRight: '10px'}}
                                onChange={(e) => handleExportRowUpdate(_, e.target.checked)}
                            />
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
                                    onClick={() => handlePreviewClick(_)}
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
                                    onClick={() => {ExportToTxt.export(placement, _, {
                                        slice7: isSlice7,
                                        header: true,
                                        download: true})}}
                                />
                            </Popover>
                        </div>
                },
            ];
            break

        case 'sales_by_customer':
            columns = [
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
                    render: (value:string | number) => Parse.numberToCurrency(value),
                    sortDirections: ["ascend",'descend'],
                },
                {
                    title: 'Customer Id',
                    dataIndex: 'id',
                    key: '1',
                    sorter: (a, b) => a.id - b.id,
                    width: 50,
                },
            ];
            break
    }

    const handleInputChange = (searchTerm: string) => {
        if (searchTerm !== '') {
            if (option === 'name') {
                const filteredItems = dataSource.filter((data) =>
                    String(data['name']).toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredDataSource(filteredItems);

            } else if (option === 'id') {
                const filteredItems = dataSource.filter((data) =>
                    String(data['id']).toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredDataSource(filteredItems);
            }
        } else {
            setFilteredDataSource([]);
        }
    };

    const handleExportAll = () => {
        if (exportSelectedRow.length != 0) {
            ExportToTxt.export(placement, exportSelectedRow, {
                slice7:isSlice7,
                header: true,
                download:true
            })
        }
    }

    useEffect(() => {
        handleInputChange(inputValue);
    }, [inputValue]);

    const handlePreviewClick = (rowData: object) => {
        setSelectedRowData(rowData)

        const exportedText = ExportToTxt.export(placement, rowData, {
            slice7:isSlice7,
            header: true,
            download: false
        });

        setDetailedRowData(exportedText)
        setIsModalOpen(true)
    }

    useEffect(() => {
        setInputValue('')
    }, [option, placement])


    return (
        <>
            <Table<DataType>
                loading={isLoading}
                columns={columns}
                pagination={{
                    defaultPageSize:pageSize,
                    showSizeChanger:true,
                    total: pageLength,
                    onChange: (page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }
                }}
                dataSource={inputValue != '' ? filteredDataSource: dataSource}
                scroll={{x: 500}}
                showSorterTooltip={{target: 'sorter-icon'}}
                summary={() => (
                    <Table.Summary fixed="bottom">
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}>
                                <b style={{color: token.colorPrimary}}>
                                    Row Count: {inputValue != '' ? filteredDataSource.length: dataSource.length}
                                </b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3} colSpan={3}>
                                <b style={{color: token.colorPrimary}}>
                                    {
                                       Calculate.grandTotal(inputValue != '' ? filteredDataSource: dataSource)
                                    }
                                </b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={6} align={'right'}>
                                {
                                    placement == "sales_invoices" &&
                                    <Button
                                        onClick={handleExportAll}
                                        color="primary"
                                        variant="solid">
                                        Export all {exportSelectedRow.length}
                                    </Button>
                                }

                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                // antd site header height
                sticky={{offsetHeader: 64}}
            />
            <Modal
                title="Preview"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                style={{padding: '50px 0'}}
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
                <div style={{display: 'flex'}}>
                    <JsonViewerComponent
                        jsonData={selectedRowData}/>
                    <TxtViewer textString={detailedRowData}></TxtViewer>
                </div>
            </Modal>
        </>

    );
};

