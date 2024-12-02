import {DatePicker, Button} from 'antd';
import {useState} from 'react';
import type { Dayjs } from 'dayjs';
import type { NoUndefinedRangeValueType } from 'rc-picker/lib/PickerInput/RangePicker';

const {RangePicker} = DatePicker;

interface InputComponentProps {
    isLoading: boolean;
}
export const DateRangeComponent:  React.FC<InputComponentProps> = ({ isLoading }) => {
    const [dateStr, setDateStr] = useState<string[] | null>(null);

    function onSelectDate(dates: NoUndefinedRangeValueType<Dayjs> | null, dateString: [string, string]) {
        setDateStr(dateString);
        console.log('Selected Date Range:', dateString);
    }

    return (
        <div style={{display:'inline-flex', gap: '10px'}}>
            <RangePicker
                size={"large"}
                placement="topLeft"
                onChange={onSelectDate}
            />
            <Button size={"large"} loading={isLoading}>Search</Button>
        </div>
    );
};
