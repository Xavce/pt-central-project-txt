import { Input } from 'antd';
import React from "react";

const { Search } = Input;

interface InputComponentProps {
    isLoading: boolean;
    isOption: string; // Include this in props
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const InputComponent : React.FC<InputComponentProps> = ({isOption, isLoading, setInputValue })  => {

    const handleOnchange = (e) => {
        console.log(typeof (isOption));
        switch (isOption){
            case "Id":
                console.log("id")
                break

            case 'Name':
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
                placeholder={`Search ${isOption}`}
                loading={isLoading}
                disabled={!isOption}
                enterButton />
        </>
    )
}