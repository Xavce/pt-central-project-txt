import {DatePicker} from 'antd';
import type { Dayjs } from 'dayjs';
import type { NoUndefinedRangeValueType } from 'rc-picker/lib/PickerInput/RangePicker';
import {Calculate} from "../services/utils.ts";

const {RangePicker} = DatePicker;

interface InputComponentProps {
    setDateRange: React.Dispatch<React.SetStateAction<string[]>>;
}
export const DateRangeComponent:  React.FC<InputComponentProps> = ({setDateRange }) => {

    function onSelectDate(dates: NoUndefinedRangeValueType<Dayjs> | null, dateString: [string, string]) {
        setDateRange(dateString);
    }

    return (
        <div style={{display:'inline-flex', gap: '10px'}}>
            <RangePicker
                size={"large"}
                defaultValue={Calculate.dayJsDate(1)}
                placement="topLeft"
                onChange={onSelectDate}
            />
        </div>
    );
};
