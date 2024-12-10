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



    static export = (placement: string, dataObject: object[] | object, opt: ExportOptions) => {
        const config = Parse.exportConfig(placement);

        let result = ``;

        // Add headers if required
        if (opt.header) {
            result += `"FK", "KD_JENIS_TRANSAKSI", "FG_PENGGANTI", "NOMOR_FAKTUR", "MASA_PAJAK", "TAHUN_PAJAK", "TANGGAL_FAKTUR", "NPWP", "NAMA_FK", "ALAMAT_LENGKAP", "JUMLAH_DPP", "JUMLAH_PPN", "JUMLAH_PPNBM", "ID_KETERANGAN_TAMBAHAN", "FG_UANG_MUKA", "UANG_MUKA_DPP", "UANG_MUKA_PPN", "UANG_MUKA_PPNBM", "REFERENSI", "LT", "NPWP", "NAMA", "JALAN", "BLOK", "NOMOR", "RT", "RW", "KECAMATAN", "KELURAHAN", "KABUPATEN", "KELURAHAN", "KABUPATEN", "PROPINSI", "KODE_POS", "NOMOR_TELEPON", "OF", "KODE_OBJEK", "NAMA", "HARGA_SATUAN", "JUMLAH_BARANG", "HARGA_TOTAL", "DISKON", "DPP", "PPN", "TARIF_PPNBM", "PPNBM"\n`;
        }

        const evaluateFormula = (item: any, formula: string) => {
            return formula.split('+').map(part => {
                let cellValue: any = item;
                const paths = part.trim().split('.');
                paths.forEach(path => {
                    try {
                        cellValue = cellValue[path];
                    } catch {
                        cellValue = path; // Fallback if path is invalid
                    }
                });
                return cellValue;
            }).join(' '); // Combine parts of the formula
        };

        if (Array.isArray(dataObject)) {
            dataObject.forEach(item => {
                let row = ``;
                config.forEach((configItem, index) => {
                    let cellValue: any;
                    if (configItem.value.includes('+')) {
                        cellValue = evaluateFormula(item['detail_data'], configItem.value);
                    } else {


                        cellValue = item['detail_data'];
                        const paths = configItem.value.split('.');
                        paths.forEach(path => {
                            try {
                                cellValue = cellValue[path];
                            } catch {
                                cellValue = path;
                            }
                        });
                    }

                    const quotation = configItem.quotation;
                    if (quotation === `""`) {
                        cellValue = `"${cellValue}"`;
                    }

                    if (index === 0) {
                        row += cellValue;
                    } else {
                        row += `, ${cellValue}`;
                    }
                });

                const detailed_data = item['detail_data'];

                if (Array.isArray(detailed_data["transaction_lines_attributes"]) && detailed_data["transaction_lines_attributes"].length >= 0) {
                    console.log("more than 1")
                    const listProduct = detailed_data["transaction_lines_attributes"]

                    for (let i = 0; i < detailed_data["transaction_lines_attributes"].length; i++) {
                        row += `, "OF", "${listProduct[i]['product']['id']}", "${listProduct[i]['product']['name'] + " " + listProduct[i]['description']}", "${listProduct[i]['rate']}", "${listProduct[i]["quantity"]}", "${listProduct[i]['amount']}", "${listProduct[i]['discount']}", "${listProduct[i]['amount']}", ${listProduct[i]['amount'] * (Number(listProduct[i]['line_tax']['rate'] / 100))}, "0", "0"`
                    }
                }


                result += row + `\n`;
            });
        } else {
            let row = ``;
            config.forEach((configItem, index) => {
                if (configItem.header === "OF") {
                    return; // Break out of the config loop
                }

                let cellValue: any;
                if (configItem.value.includes('+')) {
                    cellValue = evaluateFormula(dataObject, configItem.value);
                } else {
                    cellValue = dataObject;
                    const paths = configItem.value.split('.');
                    paths.forEach(path => {
                        try {
                            cellValue = cellValue[path];
                        } catch {
                            cellValue = path;
                        }
                    });
                }

                const quotation = configItem.quotation;
                if (quotation === `""`) {
                    cellValue = `"${cellValue}"`;
                }

                if (index === 0) {
                    row += cellValue;
                } else {
                    row += `, ${cellValue}`;
                }
            });

            if (dataObject){

                if (Array.isArray(dataObject["transaction_lines_attributes"]) && dataObject["transaction_lines_attributes"].length >= 0) {
                    const listProduct = dataObject["transaction_lines_attributes"]

                    for (let i = 0; i < dataObject["transaction_lines_attributes"].length; i++) {
                        row += `, "OF", "${listProduct[i]['product']['id']}", "${listProduct[i]['product']['name'] + " " + listProduct[i]['description']}", "${listProduct[i]['rate']}", "${listProduct[i]["quantity"]}", "${listProduct[i]['amount']}", "${listProduct[i]['discount']}", "${listProduct[i]['amount']}", ${listProduct[i]['amount'] * (Number(listProduct[i]['line_tax']['rate'] / 100))}, "0", "0"`
                    }
                }
            }


            result += row;



        }

        if (opt.download) {
            return this.downloadStringAsTxt(
                `${'Invoice ' + Date.now() + '.txt'}`, result
            );
        } else {
            return result;
        }
    };
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

    static exportConfig = (placement: string) => {
        const config: string | null = localStorage.getItem(`export-configuration-${placement}`);
        if (!config) {
            const defaultConfig = [{"header":"FK","value":".FK","key":"963b113f-bcfe-479e-840b-99d9801b98dc","quotation":"\"\""},{"header":"KD_JENIS_TRANSAKSI","value":".01","key":"edea5fdc-80ef-4a97-953e-ffd1eabdb110","quotation":"\"\""},{"header":"FG_PENGGANTI","value":".0","key":"a3c052d9-ca52-4169-aea6-6838d0bfdb91","quotation":"\"\""},{"header":"NOMOR_FAKTUR","value":".","key":"1721eaf6-b58e-4da3-9704-8baeeb4081a1","quotation":"none"},{"header":"MASA_PAJAK","value":".12","key":"aa46c518-5b05-43b1-923d-a18b84fe6bb1","quotation":"\"\""},{"header":"TAHUN_PAJAK","value":".2024","key":"2565ee2b-6eba-4ba6-8fc0-df5ffcbff909","quotation":"\"\""},{"header":"TANGGAL_FAKTUR","value":"transaction_date","key":"06dea0bb-47e3-4511-924f-17277a2a0f07","quotation":"\"\""},{"header":"NPWP","value":"person.tax_no","key":"ab622afc-fc9d-4bcd-be66-1f85532561c5","quotation":"none"},{"header":"NAMA_FK","value":"person.display_name","key":"187c2647-4d7e-4126-866d-9578ff36c3eb","quotation":"\"\""},{"header":"ALAMAT_LENGKAP","value":"address","key":"04908edd-8284-4a13-9a92-100b282c05b5","quotation":"\"\""},{"header":"JUMLAH_DPP","value":"subtotal","key":"dd77a9cc-2474-42b7-9280-fc42b22a2c68","quotation":"\"\""},{"header":"JUMLAH_PPN","value":"tax_amount","key":"abc8ae20-0648-422b-80ab-b4c75ef6c285","quotation":"\"\""},{"header":"JUMLAH_PPNBM","value":".0","key":"305b89ed-2028-410b-a843-acd4c00dbfef","quotation":"none"},{"header":"ID_KETERANGAN_TAMBAHAN","value":".0","key":"d9d0eafa-0815-44f6-9539-4be0b3baab58","quotation":"\"\""},{"header":"FG_UANG_MUKA","value":".0","key":"7bc57b38-340d-4dfb-9f64-45e0f66d2992","quotation":"\"\""},{"header":"UANG_MUKA_DPP","value":".0","key":"083447d9-4d42-4518-bc26-1f547c44f0fd","quotation":"\"\""},{"header":"UANG_MUKA_PPN","value":".0","key":"0236c38a-672e-4184-9cdb-d961d2b08691","quotation":"\"\""},{"header":"UANG_MUKA_PPNBM","value":".0","key":"e149a8c1-8f60-4cab-a141-4fde8da0715a","quotation":"\"\""},{"header":"REFERENSI","value":"transaction_no","key":"38e05328-72f2-4919-b4fb-dee41a28601f","quotation":"\"\""},{"header":"LT","value":".LT","key":"c2a8f575-ed6f-4592-8ff7-8d54f1e4eb2a","quotation":""},{"header":"NPWP","value":".","key":"a033b83a-d483-4d27-8830-0b221c703695","quotation":"none"},{"header":"NAMA","value":".","key":"c43205cc-327e-4de0-9176-741bb3c0e520","quotation":"none"},{"header":"JALAN","value":".","key":"4698aef5-b822-43fd-995d-0acd5bb679c3","quotation":"none"},{"header":"BLOK","value":".","key":"28fcc692-e2a8-4986-8544-16e23bb2e692","quotation":"none"},{"header":"NOMOR","value":".","key":"3effd3a2-f933-4588-8acc-2e5f26b5d89d","quotation":"none"},{"header":"RT","value":".","key":"82c72f11-da5f-4fa5-8b89-71c2ccdfb842","quotation":"none"},{"header":"RW","value":".","key":"716205fb-7291-4ffa-88ce-b3973a5f11dd","quotation":""},{"header":"KECAMATAN","value":".","key":"809248f3-25ad-4149-ac1b-087695e6d75a","quotation":""},{"header":"KELURAHAN","value":".","key":"43adf3a4-7c08-4256-9271-2ac543e37caa","quotation":""},{"header":"KABUPATEN","value":".","key":"aa467b34-8241-48d0-ae7b-604c5548367a","quotation":""},{"header":"KELURAHAN","value":".","key":"1bd43ce1-19d5-4bed-8183-0a9f055ad8d6","quotation":""},{"header":"KABUPATEN","value":".","key":"0afe1b25-4746-419e-8625-342a20ab00b7","quotation":""},{"header":"PROPINSI","value":".","key":"fed963fa-d7f0-44e8-ab19-d8812ff347fc","quotation":""},{"header":"KODE_POS","value":".","key":"468cc84a-09c1-486f-82ae-c60be33a0738","quotation":""},{"header":"NOMOR_TELEPON","value":".","key":"3e4f5490-5137-4cd0-b70e-125509020183","quotation":""}]
            const stringi = JSON.stringify(defaultConfig)
            localStorage.setItem(`export-configuration-${placement}`, stringi)
            const newConfig: string = localStorage.getItem(`export-configuration-${placement}`);
            const parsedNewConfig = JSON.parse(newConfig);
            return parsedNewConfig
        }

        const parsedConfig = JSON.parse(config);
        return parsedConfig

    }

    // static exportConfig = (placement: string) => {
    //
    //
    //     const config: string | null = localStorage.getItem(`export-configuration-${placement}`);
    //     const parsedConfig = JSON.parse(config);
    //     return parsedConfig
    //
    // }

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

