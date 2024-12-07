import { Radio } from 'antd';
import {Select} from 'antd';
import React from "react";

interface SelectRadioProps {
    placement: string; // Include this in props
    setPlacement: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectRadioComponent:React.FC<SelectRadioProps> = ({placement, setPlacement}) => {

    return(
        <>
            <Radio.Group
                value={placement}
                defaultValue={"sales_invoices"}
                size={"large"}
                onChange={(e) => setPlacement(e.target.value)}
            >
                <Radio.Button value="sales_invoices">Sales Invoices</Radio.Button>
                <Radio.Button value="sales_by_customer">Sales By Customer</Radio.Button>
            </Radio.Group>
        </>
    )

}

interface SelectOptionGroupProps {
    option: string; // Include this in props
    setOption: React.Dispatch<React.SetStateAction<string>>;
    placement: string;
}

export const SelectOptionGroupComponent:React.FC<SelectOptionGroupProps> = ({placement, option, setOption}) => {

    return(
        <Select
            defaultValue={option}
            style={{ width: 100 }}
            onChange={(e) => {
                e ? setOption(e) : setOption('');
            }}
            size={"large"}
            options={[
                {
                    label: <span>{placement}</span>,
                    title: 'Invoices',
                    options: [
                        { label: <span>Id</span>, value: 'id' },
                        { label: <span>Name</span>, value: 'name' },
                    ],
                },
            ]}
        />
    )
}