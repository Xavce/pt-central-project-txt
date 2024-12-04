import { Button, Modal, notification} from 'antd';
import type { NotificationArgsProps } from 'antd';
import {useEffect, useState, useMemo, createContext} from "react";
import { JsonViewerComponent } from "./jsonviewer.tsx";
import data from '../../dummy/sales_invoice.json';
import { HeaderValueComponent} from "./headerValueInput.tsx";
import { Reorder } from "framer-motion";
import diskIcon from "../assets/disk.svg"
import gearIcon from "../assets/gear.svg"
import { v4 as uuidv4} from 'uuid';
import {ExportToTxt} from "../services/utils.ts"
import {ExportConfig} from "../types";

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = createContext({ name: 'Default' });

export const ConfigComponent = () => {
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
    const [headerValueConfig, setHeaderValueConfig] = useState<ExportConfig[]>(
        [{ header: "", value: "", key:uuidv4().toString()}]);

    const addHeaderValue = () => {
        setHeaderValueConfig([
            ...headerValueConfig,
            { header: "", value: "", key:uuidv4().toString() }
        ]);
    };

    const updateHeaderValue = (index: number, field: string, newValue: string) => {
        // Update the header or value of the component at the given index
        const updatedComponents:any = [...headerValueConfig];
        updatedComponents[index][field] = newValue;
        setHeaderValueConfig(updatedComponents);
    };
    
    const saveConfiguration = () => {
        const config = JSON.stringify(headerValueConfig);

        localStorage.setItem("export-configuration", config);
        openNotification('topRight')
    }

    const deleteRowConfig = (key:number) =>{
        const updatedConfig = headerValueConfig.filter((_:any) => _['key'] != key);
        setHeaderValueConfig(updatedConfig);
    }

    useEffect(() => {
        const config:string = localStorage.getItem("export-configuration");
        console.log(ExportToTxt.export())
        setHeaderValueConfig(JSON.parse(config))
    }, []);

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Button
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
                        <JsonViewerComponent jsonData={data.sales_invoices[0]}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', height: '50vh', overflowY: 'scroll' }}>
                        {
                            <Reorder.Group
                                style={{overflowY: "scroll"}}
                                dragConstraints={{top: 10}}
                                axis="y"
                                onReorder={setHeaderValueConfig}
                                values={headerValueConfig}>
                                {headerValueConfig.map((item, index) => (
                                    <HeaderValueComponent
                                        key={item.key}
                                        deleteRow={deleteRowConfig}
                                        item={item}
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
