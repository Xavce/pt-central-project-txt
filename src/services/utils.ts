import {ExportConfig, ExportOptions} from "../types";


export class ExportToTxt{
    static parseConfig = () => {
        const config:string | null = localStorage.getItem('export-configuration')
        if (config == null) return null;
        const parsedConfig = JSON.parse(config)
        let result:object = {}
        parsedConfig.forEach((item:ExportConfig) => {
            result[item.header] = item.value
        })

        return result
    }
    static saveStringAsTxt = (filename, content) => {
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    static export = (dataObject: object | object[], opt: ExportOptions) => {
        const config:object = this.parseConfig();
        const configHeaders:string[] = Object.keys(config)

        let headersList = ``

        configHeaders.forEach((header:string, index) => {
            if (index == 0) {
                headersList += `"${header}"`
            }
            headersList += ', ' + `"${header}"`
        })

        headersList += `\n`

        headersList += `test`
        console.log(headersList)

        configHeaders.forEach((header:string) => {
            console.log(config[header])
        })




    }
}

export class Parse{
    static currencyStringToNumber = (currencyString:string) => {
        const currencyNumber = currencyString
            .replace("Rp. ", "")
            .replace("Rp", "")
            .replace(/\./g, "")
        return Number(currencyNumber)
    }

    static numberToCurrency = (currencyNumber:number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, // Rupiah typically doesn't use decimals
        }).format(currencyNumber);
    }
}

export class Calculate {


    static grandTotal = (dataSource: object[]) => {
        let grandTotal = 0;

        dataSource.forEach((person:object) => {
            grandTotal = grandTotal + person["total"];
        });

        return Parse.numberToCurrency(grandTotal);
    };
}

