import {ExportConfig, ExportOptions} from "../types";
import dayjs from 'dayjs';
import type {Dayjs} from 'dayjs';

export class ExportToTxt{

    static downloadStringAsTxt = (filename, content) => {
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }



    static export = (placement:string, dataObject: object[] | object, opt: ExportOptions) => {
        const config:object = Parse.exportConfig(placement);
        const configHeaders:string[] = Object.keys(config)
        const configQuotation:string = config['quotation']

        console.log(config)
        console.log(configQuotation)
        let result = ``

        if (opt.header) {
            configHeaders.forEach((header: string, index) => {
                if (index == 0) {
                    result += `"${header}"`

                }else {
                    result += ', ' + `"${header}"`
                }
            })
            result += `\n`
        }

        result += ``

        if (Array.isArray(dataObject)) {
            dataObject.forEach((item:object) => {
                let itemResult:any = ''

                configHeaders.forEach((header:string) => {
                    let headerResult:any = item['detail_data']
                    console.log(headerResult)
                    const paths:[] = config[header][0].split('.')
                    const quotation = config[header][1]

                    paths.forEach((path) => {
                        try{
                            headerResult = headerResult[path]
                        }catch{
                            headerResult = path
                        }
                    })
                    if (quotation == `""`){
                        headerResult = `"${headerResult}"`
                    }

                    itemResult += headerResult + ', '
                })
                result += itemResult + `\n`
            })
        } else {
            let itemResult:any = ''

            configHeaders.forEach((header:string) => {
                let headerResult:any = dataObject
                const paths:[] = config[header][0].split('.')
                const quotation = config[header][1]

                paths.forEach((path) => {
                    try{
                        headerResult = headerResult[path]
                    }catch{
                        headerResult = path
                    }
                })

                if (quotation == `""`){
                    headerResult = `"${headerResult}"`
                }

                itemResult += headerResult + ', '
            })
            result += itemResult
        }

        if (opt.download) {
            return this.downloadStringAsTxt(
                `${'Invoice ' + Date.now() + '.txt'}`, result)
        }else {
            return result
        }

    }
}

export class Parse{
    static jsonPath = (item:object, stringPath:string) => {
        let result:any = item
        const paths:[] = stringPath.split('.')

        paths.forEach((path) => {
            try{
                result = result[path]
            }catch{
                result = path
            }
        })

        return result
    }

    static currencyStringToNumber = (currencyString?: string): number => {
        if (!currencyString || typeof currencyString !== 'string') {
            console.warn('Invalid currency string:', currencyString);
            return 0; // Return 0 for invalid inputs
        }

        const currencyNumber = currencyString
            .replace("Rp. ", "")
            .replace("Rp", "")
            .replace(/\./g, "");

        return Number(currencyNumber) || 0; // Ensure it returns a number
    };


    static numberToCurrency = (currencyNumber:number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, // Rupiah typically doesn't use decimals
        }).format(currencyNumber);
    }

    static exportConfig = (placement:string) => {
        const config:string | null = localStorage.getItem(`export-configuration-${placement}`)
        if (config == null) return null;
        const parsedConfig = JSON.parse(config)
        console.log(parsedConfig)
        let result:object = {}
        parsedConfig.forEach((item:ExportConfig) => {
            result[item.header] = [item.value, item.quotation]
        })

        return result
    }
}

export class Calculate {
    static dayJsDate = (dayAgo: number): Dayjs[] => {
        const now = dayjs();
        const pastDate = now.subtract(dayAgo, 'day');
        return [pastDate, now];
    };

    static date = (dayAgo: number) => {
        const date = new Date();

        // Subtract the specified number of days
        date.setDate(date.getDate() - dayAgo);

        const day: number = date.getDate() + 1;
        const month: number = date.getMonth() + 1; // Add 1 to month to make it 1-based
        const year: number = date.getFullYear();

        const currentAndNowDate: string[] = [`${day - dayAgo}-${month}-${year}`, `${day}-${month}-${year}`];
        return currentAndNowDate;
    }

    static grandTotal = (dataSource: object[]) => {
        let grandTotal = 0;

        dataSource.forEach((person:object) => {
            grandTotal = grandTotal + person["total"];
        });

        return Parse.numberToCurrency(grandTotal);
    };
}

