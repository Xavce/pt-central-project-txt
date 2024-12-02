import { Input } from "antd";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";


export const HeaderValueComponent = ({ header, value, onHeaderChange, onValueChange }) => {
    const y = useMotionValue(0);
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={value}
            id={header}
            style={{  y }}

            dragListener={false}
            dragControls={dragControls}
        >
            <div style={{display: "flex", gap: "10px", marginBottom: "10px"}}>
                <Input
                    placeholder="Header"
                    size={"large"}
                    value={value} // Set value to header prop
                    onChange={(e) => onHeaderChange(e.target.value)} // Call onHeaderChange when header changes
                />
                <Input
                    placeholder="Value"
                    size={"large"}
                    value={value} // Set value to value prop
                    onChange={(e) => onValueChange(e.target.value)} // Call onValueChange when value changes
                />
            </div>
        </Reorder.Item>
    );
};
