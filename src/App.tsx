import './App.css'
import {TableWithFilter} from "./components/tableWithFilter.tsx";
import {ConfigProvider, Space, theme} from 'antd';
import logo from '../public/logo.svg'
// import {Customer, Invoice} from "./services/api/jurnal-api.ts";

function App() {

    // Invoice.getInvoiceById(1100605202).then(invoice => {
    //     console.log(invoice)
    // })
    //
    // Invoice.getSalesInvoice({page_size: 5, start_date:'18-10-2024', end_date:'19-10-2024'}).
    //     then((res) => {console.log(res)})

    // Customer.getCustomerInvoice({page_size: 5, start_date:'18-10-2024', end_date:'19-10-2024'}).
    //         then((res) => {console.log(res)})

    // Customer.getCustomerById(74967040).then(invoice => {
    //     console.log(invoice)
    // })

    return (
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#f76060",
                    "colorInfo": "#f76060"
                },
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Space
                style={{display: "block"}}>
                <>
                    <div className="card">
                        <div className={'title'}>
                            <img src={logo} style={{width: '100px', height: '100px'}}/>
                            <h1 style={{textAlign: "center"}}> PT. Central Alam Resource Lestari </h1>
                        </div>
                        <TableWithFilter/>
                    </div>

                </>
            </Space>
        </ConfigProvider>
    )
}

export default App
