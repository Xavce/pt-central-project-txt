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
                size={"large"}
                onChange={(e) => setPlacement(e.target.value)}
            >
                <Radio.Button value="invoices">Invoices</Radio.Button>
                <Radio.Button value="customers">Customers</Radio.Button>
            </Radio.Group>
        </>
    )

}

interface SelectOptionGroupProps {
    isOption: string; // Include this in props
    setIsOption: React.Dispatch<React.SetStateAction<string>>;
    placement: string;
}

export const SelectOptionGroupComponent:React.FC<SelectOptionGroupProps> = ({placement, isOption, setIsOption}) => {
    return(
        <Select
            defaultValue={isOption}
            style={{ width: 100 }}
            onChange={(e) => {
                e ? setIsOption(e) : setIsOption('');
            }}
            size={"large"}
            options={[
                {
                    label: <span>{placement}</span>,
                    title: 'Invoices',
                    options: [
                        { label: <span>Id</span>, value: 'Id' },
                        { label: <span>Name</span>, value: 'Name' },
                    ],
                },
            ]}
        />
    )
}