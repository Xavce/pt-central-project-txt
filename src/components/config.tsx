import { Button, Modal, notification} from 'antd';
import type { NotificationArgsProps } from 'antd';
import {useEffect, useState, useMemo, createContext} from "react";
import { JsonViewerComponent } from "./jsonviewer.tsx";
import salesInvoicesSample from '../../dummy_data/sales_invoice.json';
import salesByCustomerSample from '../../dummy_data/sales_by_customer.json';
import { HeaderValueComponent} from "./headerValueInput.tsx";
import { Reorder } from "framer-motion";
import diskIcon from "../assets/disk.svg"
import gearIcon from "../assets/gear.svg"
import { v4 as uuidv4} from 'uuid';
import {ExportConfig} from "../types";
import {Parse} from "../services/utils.ts";

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = createContext({ name: 'Default' });

const defaultConfigArray = [{ header: "", value: "", key: uuidv4().toString(), quotation:'' }]
const defaultConfigObject = { header: "", value: "", key: uuidv4().toString(), quotation:'' }

export const ConfigComponent = ({ placement }: { placement: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: "Export Configuration",
            description: <Context.Consumer>{() => `Saved!`}</Context.Consumer>,
            placement,
        });
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);


    // State to hold an array of objects with 'header' and 'value'
    const [headerValueConfig, setHeaderValueConfig] = useState<ExportConfig[]>(defaultConfigArray);

    const addHeaderValue = () => {
        const newConfig = { ...defaultConfigObject, key: uuidv4() };
        const isDuplicate = headerValueConfig.some(item => item.key === newConfig.key);
        if (!isDuplicate) {
            setHeaderValueConfig([...headerValueConfig, newConfig]);
        }
    };


    const updateHeaderValue = (index: number, field: string, newValue: string) => {
        // Update the header or value of the component at the given index
        const updatedComponents:any = [...headerValueConfig];
        updatedComponents[index][field] = newValue;
        setHeaderValueConfig(updatedComponents);
    };

    const saveConfiguration = () => {
        const config = JSON.stringify(headerValueConfig);
        console.log(config)

        switch (placement){
            case 'sales_invoices':
                localStorage.setItem("export-configuration-sales_invoices", config);
                break
            case 'sales_by_customer':
                localStorage.setItem("export-configuration-sales_by_customer", config);
                break
            default: localStorage.setItem("export-configuration", config);

        }

        openNotification('topRight')
        setIsModalOpen(false)
    }

    const deleteRowConfig = (key:number) =>{
        const updatedConfig = headerValueConfig.filter((_:any) => _['key'] != key);
        setHeaderValueConfig(updatedConfig);
    }

    useEffect(() => {
        try {
            const config = localStorage.getItem(`export-configuration-${placement}`);
            if (config) {
                setHeaderValueConfig(JSON.parse(config));
            } else {
                // If no config is found, set an empty or default configuration
                setHeaderValueConfig(defaultConfigArray);
            }
        } catch (e) {
            setHeaderValueConfig(defaultConfigArray);
        }
    }, [placement]);

    useEffect(() => {
        const config = localStorage.getItem(`export-configuration-${placement}`);
        const parsedConfig = JSON.parse(config)
        setHeaderValueConfig(parsedConfig)
    }, [isModalOpen]);

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Button
                disabled={true}
                color="primary"
                size={"large"}
                onClick={() => setIsModalOpen(true)}
                icon={<img src={gearIcon} alt="Config Icon" style={{ width: 16, height: 16 }} />}
            >Export Config</Button>

            <Modal
                title="Export configuration"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
                footer={[
                    <Button
                        key="close"
                        size={"large"}
                        onClick={() => setIsModalOpen(false)}>Close</Button>,

                    <Button
                        key="save"
                        type={"primary"}
                        size={"large"}
                        icon={<img src={diskIcon} alt="Config Icon" style={{ width: 16, height: 16 }} />}
                        onClick={saveConfiguration}>Save</Button>,
                ]}
            >
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '15px', alignItems: "flex-start"}}>
                    <div style={{height: '50vh', overflowY: 'scroll'}}>
                        <h1>Sample Data</h1>
                        <JsonViewerComponent jsonData={placement == 'sales_invoices'
                            ? salesInvoicesSample.sales_invoices[0]
                            : salesByCustomerSample.sales_by_customers.report[0]}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', height: '50vh', overflowY: 'scroll' }}>
                        {
                            <Reorder.Group
                                style={{overflowY: "scroll"}}
                                dragConstraints={{top: 10}}
                                axis="y"
                                onReorder={setHeaderValueConfig}
                                values={headerValueConfig}>
                                {
                                    headerValueConfig &&
                                    headerValueConfig.map((item, index) => (
                                    <HeaderValueComponent
                                        key={item.key}
                                        deleteRow={deleteRowConfig}
                                        item={item}
                                        onQuoteChage={(newQuotation: string) => updateHeaderValue(index, 'quotation', newQuotation)}
                                        onHeaderChange={(newHeader: string) => updateHeaderValue(index, 'header', newHeader)}
                                        onValueChange={(newValue: string) => updateHeaderValue(index, 'value', newValue)}/>
                                ))}
                            </Reorder.Group>

                        }
                        <Button size={"small"} onClick={addHeaderValue}>+</Button>
                    </div>
                </div>
            </Modal>
        </Context.Provider>
    );
};
