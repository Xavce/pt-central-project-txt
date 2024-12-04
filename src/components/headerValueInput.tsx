import {Button, Input} from "antd";
import grip from '../assets/grip.svg'
import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow.ts";


export const HeaderValueComponent = ({deleteRow, item, onHeaderChange, onValueChange }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    return (
        <>
            <Reorder.Item
                key={item.key}
                id={item.key}
                value={item}
                style={{y, boxShadow, display: "flex", gap: "10px", marginBottom: "10px"}}>
                <Button
                    onClick={() => deleteRow(item.key)}
                    style={{color: "gray"}}
                    type="text"
                    size={'large'}>x</Button>
                <img
                    className={'grip-img'}
                    src={grip}
                    draggable={"false"}
                    style={{width: '10px', aspectRatio: "1:1"}}/>
                <Input
                    placeholder="Header"
                    size={"large"}
                    value={item.header} // Set value to header prop
                    onChange={(e) => onHeaderChange(e.target.value)} // Call onHeaderChange when header changes
                />
                <Input
                    onKeyDown={(e) => console.log(e)}
                    placeholder="Value"
                    size={"large"}
                    value={item.value} // Set value to value prop
                    onChange={(e) => onValueChange(e.target.value)} // Call onValueChange when value changes
                />

            </Reorder.Item>
        </>
    );
};


interface Props {
    item: object;
    index:number;
}

export const Item = ({ item, index }: Props) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    return (
        <Reorder.Item value={item} id={String(index)} style={{ boxShadow, y }}>
            <Input></Input>
            <Input></Input>
        </Reorder.Item>
    );
};
