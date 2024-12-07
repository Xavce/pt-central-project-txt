
//Invoice
export type SalesInvoicesParamsType = {
    page?: number
    page_size?: number,
    start_date: string,
    end_date: string,
}

export type SearchInvoiceorCustomerByIdType = {
    invoice_id: number,
}

//Customer
export type SalesByCustomersParamsType = {
    start_date: string,
    end_date: string,
}

export type ExportConfig = {
    header: string,
    value: string,
    key: string,
    quotation: string,
}

export type ExportOptions = {
    header: boolean
    download: boolean //only return object
}

export type DataType = {
    id: number;
    name: string;
    total: number;
    key: string | number;
    detail_data: object;
}