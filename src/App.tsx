import './App.css'
import {DateRangeComponent} from "./components/datepicker.tsx";
import {TableComponent} from "./components/table.tsx";
import {ConfigProvider, Space, theme} from 'antd';

function App() {
    return (
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#8800ff",
                    "colorInfo": "#8800ff"
                },
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Space
                style={{display: "block"}}>
                <>
                    <h1> PT.Central </h1>
                    <div className="card">
                        <DateRangeComponent></DateRangeComponent>
                        <div style={{margin:'20px'}}></div>
                        <TableComponent></TableComponent>
                    </div>
                </>
            </Space>
        </ConfigProvider>
    )
}

export default App
