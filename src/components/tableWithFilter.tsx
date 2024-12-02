import {DateRangeComponent} from "./datepicker.tsx";
import {InputComponent} from "./input.tsx";
import {TableComponent} from "./table.tsx";
import {SelectRadioComponent, SelectOptionGroupComponent} from "./select.tsx";
import React, {useEffect, useState} from "react";
import {ConfigComponent} from "./config.tsx";


export const TableWithFilter = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //SelectOption
    const [placement, setPlacement] = useState<string>('invoices');

    //SearchOption
    const [isOption, setIsOption] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <>
            <div>
                <div className="table-filter">
                    <DateRangeComponent
                        isLoading={isLoading}/>
                    <div id={"select-option"}>
                        <SelectRadioComponent
                            placement={placement}
                            setPlacement={setPlacement}/>
                    </div>
                    <div id={"search-option"} style={{display:'flex', gap:'10px'}}>
                        <SelectOptionGroupComponent
                            placement={placement}
                            isOption={isOption}
                            setIsOption={setIsOption}/>
                        <InputComponent
                            setInputValue={setInputValue}
                            isOption={isOption}
                            isLoading={isLoading}/>
                    </div>
                    <div>
                        <ConfigComponent/>
                    </div>
                </div>
                <TableComponent
                    setIsLoading={setIsLoading}
                    inputValue={inputValue}
                    isLoading={isLoading}/>
            </div>

        </>
    )
}