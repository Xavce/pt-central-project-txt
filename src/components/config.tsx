import { Button, Modal } from "antd";
import gearIcon from "../assets/gear.svg";
import diskIcon from "../assets/disk.svg";
import { useState } from "react";
import { JsonViewerComponent } from "./jsonviewer.tsx";
import data from '../../dummy/sales_invoice.json';
import { HeaderValueComponent } from "./headervalue.tsx";
import { Reorder } from "framer-motion";

export const ConfigComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to hold an array of objects with 'header' and 'value'
    const [headerValueComponents, setHeaderValueComponents] = useState([{ header: "", value: "" }]);

    const addHeaderValue = () => {
        console.log(headerValueComponents);
        // Add a new object with empty 'header' and 'value'
        setHeaderValueComponents([...headerValueComponents, { header: "", value: "" }]);
    };

    const updateHeaderValue = (index: number, field: string, newValue: any) => {
        // Update the header or value of the component at the given index
        const updatedComponents = [...headerValueComponents];
        updatedComponents[index][field] = newValue;
        setHeaderValueComponents(updatedComponents);
    };

    return (
        <>
            <Button
                color="primary"
                size={"large"}
                onClick={() => setIsModalOpen(true)}
                icon={<img src={gearIcon} alt="Config Icon" style={{ width: 16, height: 16 }} />}
            >Export Config</Button>

            <Modal
                title="Vertically centered modal dialog"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
                footer={[
                    <Button size={"large"} onClick={() => setIsModalOpen(false)}>Close</Button>,
                ]}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', alignItems: "flex-start" }}>
                    <JsonViewerComponent jsonData={data.sales_invoices[0]} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                        <Reorder.Group onReorder={setHeaderValueComponents} values={headerValueComponents}>
                            {headerValueComponents.map((item, index) => (
                                <Reorder.Item
                                    key={index} // Use index as the key for each item
                                    value={item}
                                    drag
                                >
                                    <HeaderValueComponent
                                        header={item.header}
                                        value={item.value}
                                        onHeaderChange={(newHeader) => updateHeaderValue(index, 'header', newHeader)}
                                        onValueChange={(newValue) => updateHeaderValue(index, 'value', newValue)}
                                    />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>

                        <Button size={"small"} onClick={addHeaderValue}>+</Button>
                        <Button
                            type={"primary"}
                            icon={<img src={diskIcon} alt="Save Icon" style={{ width: 16, height: 16 }} />}
                            size={"large"}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
