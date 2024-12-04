import JsonView from '@uiw/react-json-view';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import React from "react"

interface JsonDataProps {
    jsonData: object;
}
export const JsonViewerComponent:React.FC<JsonDataProps> = React.memo(({jsonData}) => {

    return(
        <JsonView
            displayDataTypes={false}
            style={githubDarkTheme}
            value={jsonData} />
    )
})