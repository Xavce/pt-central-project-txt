// import axios from "axios";
//
//
// const fetchApi = async (endpoint: string) => {
//     try {
//         const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
//
//         const response = await fetch(url, {
//
//             headers: {
//                 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
//                 'Content-Type': 'application/json'
//             },
//         }).then(response => response.json()).then((r) => console.log(r))
//
//         return response; // Return only the response data if that's all you need
//     } catch (error) {
//         console.error('API Fetch Error:', error);
//         throw error; // Propagate the error for the caller to handle
//     }
// };


export class Invoice{
    // static getSalesInvoice = async(params: salesInvoiceType) => {
    //     const endpoint:string = ""
    //
    // }

    static getInvoiceById = async(id: number) => {
        const url = `/api/v1/sales_invoices/${id}`;


        try {
            const response = await fetch(url + `?access_token=${import.meta.env.VITE_API_KEY}`)
                .then(response => response.json())
                .then((c) => {
                    return (c)
                })

            return response; // Return only the response data if that's all you need
        } catch (error) {
            console.error('API Fetch Error:', error);
            throw error; // Propagate the error for the caller to handle
        }
    }
}

//
// export class Customer{
//     static getCustomerLists = async() => {
//         const endpoint:string = ""
//
//     }
//
//     static getCustomerById = async() => {
//         const endpoint:string = ""
//
//     }
//
//     static getSalesByCustomers = (page_size: number, end_date: string, start_date:string) => {
//         const endpoint:string = ""
//
//     }
//
// }
//
//
// Invoice.getInvoiceById(24218).then((res) => console.log(res))


console.log(import.meta.env.VITE_API_KEY)