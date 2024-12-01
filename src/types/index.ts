export type ExportToTxtType = {
    FK: {
        KD_JENIS_TRANSAKSI: string,
        FG_PENGGANTI:string,
        NOMOR_FAKTOR: string,
        MASA_PAJAK: string,
        TAHUN_PAJAK: string,
        TANGGAL_FAKTUR: string,
        NPWP: number,
        NAMA: string,
        ALAMAT_LENGKAP: string,
        JUMLAH_DPP: string,
        JUMLAH_PPN: string,
        JUMLAH_PPNBM: number,
        ID_KETERANGAN_TAMBAHAN: string,
        FG_UANG_MUKA: string,
        UANG_MUKA_DPP: string,
        UANG_MUKA_PPN: string,
        UANG_MUKA_PPNBM: string,
        REFERENSI: string,
    },
    OF: {
        KODE_OBJEK: string,
        NAMA_OBJEK: string,
        HARGA_SATUAN: string,
        JUMLAH_BARANG: string,
        HARGA_TOTAL: string,
        DISKON: string,
        DPP: string,
        PPN: string,
        TARIF_PPNBM: string,
        PPNBM: string,
    }
}

//Invoice
export type SalesInvoiceType = {
    page_size: number,
    start_date: string,
    end_date: string,
}

export type SalesInvoiceByIdType = {
    invoice_id: number,
}

//Customer
export type SalesByCustomerType = {
    page_size: number,
    start_date: string,
    end_date: string,
}

export type CustomerType = {
    customer_id: number,
}


