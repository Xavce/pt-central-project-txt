# Convert To Txt | PT.Central
Terdapat beberapa panduan dibawah ini untuk dapat mengoperasikan aplikasi ini.
Mohon untuk di baca.

## Untuk bisa menjalankan aplikasi ini dibutuhkan 3 tahapan:
1. Lakukan git clone terhadap repository ini:
    ```bash
    git clone https://github.com/Xavce/pt-central-project-txt.git
    ```
2. Kemudian, install dependency yang dibutuhkan:
   ```powershell
   npm install
   ```
3. Ubah file ".env.example" ke ".env", kemudian masukkan api key 'jurnal.id' ke dalam variable VITE_API_KEY.

# Interfaces
Beberapa panduan untuk mengenal terhadap fitur-fitur dalam aplikasi ini 👇
### Date
    Digunakan saat ingin mengambil sebuah data dalam rentang waktu 
    ![image](https://github.com/user-attachments/assets/23280af7-4b18-4f6b-990f-7645e3902365)

### Sales Invoices/Sales By Customer
    - Sales Invoices = Digunakan untuk merangkup data invoice penjualan pada rentang waktu yang sudah ditentukan oleh Date.
    - Sales By Customer = DIgunakan untuk merangkup data penjualan terhadap customer pada rentang waktu yang sudah ditentukan oleh Date.
    ![image](https://github.com/user-attachments/assets/fbd09553-2ab8-4898-b638-23caf62875f4)

### Search Name/Id
    - Digunakan saat ingin mencari sebuh nama/id(invoice/customer) dalam tabel.
    ![image](https://github.com/user-attachments/assets/c9f06c9b-e578-4e90-9dab-1e13a82c8ec1)

## Tabel
    Tabel berisikan data-data yang berasal dari Sales Invoice/Sales By Customer
    ### Page Size
    Menunjukkan berapa data yang ingin di munculkan di dalam tabel.
    ![image](https://github.com/user-attachments/assets/ee6165e8-7548-4e4b-bc15-0ac371970132)
    
    ### Preview
    Preview berisikan data detail dan data hasil export.
    ![image](https://github.com/user-attachments/assets/68732d56-b77c-4beb-8c2c-ab11a97dd2c1)
    Data dibagian kiri menunjukkan data secara detail dalam bentuk .json, dan data dibagian menunjukkan hasil yang akan di export.  
    ![image](https://github.com/user-attachments/assets/c9e91f63-b358-44fc-abf3-e78c62e4577a)
    
    ### Export
    Export data per row dalam bentuk .txt
    ![image](https://github.com/user-attachments/assets/e16d8064-d64d-42e3-a576-0e6191667744)

    ### Export all
    Export semua data yang berada didalam tabel(kecuali pagination)
    ![image](https://github.com/user-attachments/assets/7c6e3a4f-ff33-4c9d-bbd5-4f568511c979)

    ### Export Config
    Digunakan untuk mengkonfigurasi data apa saya yang ingin di masukkan ke dalam .txt
    ![image](https://github.com/user-attachments/assets/ae011219-e3b6-4f83-8298-97e97d6d0942)



    
    
