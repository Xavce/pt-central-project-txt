import {DateRangeComponent} from "./datepicker.tsx";
import {InputComponent} from "./input.tsx";
import {TableComponent} from "./table.tsx";
import {SelectRadioComponent, SelectOptionGroupComponent} from "./select.tsx";
import {useEffect, useState} from "react";
import {Invoice, Customer} from "../services/api/jurnal-api.ts";
import {Calculate, Parse} from "../services/utils.ts";
import {DataType} from "../types";
import { Switch, InputNumber } from 'antd';


const date = Calculate.date(1)

export const TableWithFilter = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    //DataSource
    const [dataSource, setDataSource] = useState<DataType[]>([])

    //DateRange
    const [dateRange, setDateRange] = useState<string[]>(date)

    //SelectPlacement
    const [placement, setPlacement] = useState<string>('sales_invoices');

    //PageSize
    const [pageSize, setPageSize] = useState<number>(20);

    //Page
    const [page, setPage] = useState<number>(1);

    const [pageLength, setPageLength] = useState<number>(0)

    //PlacementPaths
    const placementPaths = {
        "sales_invoices": 'sales_invoices',
        "sales_by_customers": 'sales_by_customers.report',
    }

    const [isSlice7, setIsSlice7] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)

        switch (placement){
            case 'sales_invoices':
                Invoice.getSalesInvoices({page: page, page_size: pageSize, start_date: dateRange[0], end_date: dateRange[1]})
                    .then((res) => {
                        setPageLength(res.total_count)

                        const result:DataType[] = (Parse.jsonPath(res ,placementPaths.sales_invoices) as any[]).map<DataType>((item, index) => ({
                            id: item.transaction_no,
                            name: item.person.display_name,
                            total: Parse.currencyStringToNumber(item.original_amount_currency_format),
                            key: item.id || index, // Use a unique field or fallback to the index
                            detail_data: {...item}
                        }));

                        setDataSource(result)

                    })
                    .finally(() =>
                        setIsLoading(false)
                    )
                break

            case 'sales_by_customer':
                Customer.getCustomerInvoices({start_date: dateRange[0], end_date: dateRange[1]})
                    .then((res) => {
                        const result:DataType[] = (Parse.jsonPath(res ,placementPaths.sales_by_customers) as any[]).map<DataType>((item, index) => ({
                            id: item.customer.id,
                            name: item.customer.name,
                            total: Parse.currencyStringToNumber(item.customer.subtotal),
                            key: item.id || index, // Use a unique field or fallback to the index
                            detail_data: {...item}
                        }));

                        setPageLength(result.length)

                        setDataSource(result)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })

                break

        }


    }, [dateRange,pageSize,page, placement]);


    //SearchOption
    const [option, setOption] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <>
            <div>
                <div className="table-filter">
                    <DateRangeComponent
                        setDateRange={setDateRange}/>
                    <div id={"select-option"}>
                        <SelectRadioComponent
                            placement={placement}
                            setPlacement={setPlacement}/>
                    </div>
                    <div id={"search-option"} style={{display:'flex', gap:'10px'}}>
                        <SelectOptionGroupComponent
                            placement={placement}
                            option={option}
                            setOption={setOption}/>
                        <InputComponent
                            setInputValue={setInputValue}
                            option={option}
                            isLoading={isLoading}/>
                    </div>
                    <div style={{display: 'inline-flex', alignItems: 'center', gap: '15px'}}>
                        <Switch size="default"
                                value={isSlice7}
                                onChange={(e) => setIsSlice7(e)}
                                checkedChildren="Disable Slice 7"
                                unCheckedChildren="Slice 7"
                                defaultChecked />
                    </div>
                </div>
                <TableComponent
                    isSlice7={isSlice7}
                    setInputValue={setInputValue}
                    option={option}
                    placement={placement}
                    pageLength={pageLength}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    dataSource={dataSource}
                    setIsLoading={setIsLoading}
                    inputValue={inputValue}
                    isLoading={isLoading}/>
            </div>

        </>
    )
}