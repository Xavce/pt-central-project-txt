import {SalesInvoicesParamsType,SalesByCustomersParamsType, SearchInvoiceorCustomerByIdType} from "../../types";

export class Invoice{
    static getSalesInvoices = async (paramsInput: SalesInvoicesParamsType) => {
        const params:string = new URLSearchParams(paramsInput as any).toString();

        const endpoint:string = `${import.meta.env.VITE_API_URL}/sales_invoices/?${params}&access_token=${import.meta.env.VITE_API_KEY}`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch sales invoice:', error);
            throw error;
        }
    };


    static getInvoiceById = async(id: SearchInvoiceorCustomerByIdType) => {
        const endpoint:string = `${import.meta.env.VITE_API_URL}/sales_invoices/${id}?access_token=${import.meta.env.VITE_API_KEY}`;

        try {
            const response = await fetch(endpoint)

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Fetch Error:', error);
            throw error; // Propagate the error for the caller to handle
        }
    }
}

export class Customer{
    static getCustomerInvoices = async(paramsInput:SalesByCustomersParamsType) => {
        const params:string = new URLSearchParams(paramsInput as any).toString();

        const endpoint:string = `${import.meta.env.VITE_API_URL}/sales_by_customers/?${params}&access_token=${import.meta.env.VITE_API_KEY}`;

        try{
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        }catch(error){
            console.error('Failed to fetch sales invoice:', error);
            throw error;
        }
    }

    static getCustomerById = async(id:SearchInvoiceorCustomerByIdType) => {
        const endpoint:string = `${import.meta.env.VITE_API_URL}/sales_by_customers/${id}?access_token=${import.meta.env.VITE_API_KEY}`;

        try{
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        }catch(error){
            console.error('Failed to fetch sales invoice:', error);
            throw error;
        }
    }
}




