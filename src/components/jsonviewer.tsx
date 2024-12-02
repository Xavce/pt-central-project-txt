import JsonView from '@uiw/react-json-view';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';

interface JsonDataProps {
    jsonData: object;
}
export const JsonViewerComponent:React.FC<JsonDataProps> = ({jsonData}) => {

    return(
        <JsonView
            displayDataTypes={false}
            style={githubDarkTheme}
            value={jsonData} />
    )
}