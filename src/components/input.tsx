import { Input } from 'antd';
import React from "react";

const { Search } = Input;

interface InputComponentProps {
    isLoading: boolean;
    option: string; // Include this in props
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const InputComponent : React.FC<InputComponentProps> = ({option, isLoading, setInputValue })  => {

    const handleOnchange = (e) => {
        switch (option){
            case "id":
                setInputValue(e.target.value)
                break

            case 'name':
                setInputValue(e.target.value)
                break
        }
    }

    return (
        <>
            <Search
                size={"large"}
                style={{width:'300px'}}
                onChange={handleOnchange}
                placeholder={`Search ${option}`}
                loading={isLoading}
                disabled={!option}
                enterButton />
        </>
    )
}