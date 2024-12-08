# PT.Central | Convert To TXT

Aplikasi ini memungkinkan Anda untuk mengelola data penjualan dengan mudah dan mengekspornya dalam format `.txt`.

## 🚀 Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi:

1. Clone repository ini:
    ```bash
    git clone https://github.com/Xavce/pt-central-project-txt.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Ubah file `.env.example` menjadi `.env` dan tambahkan API key dari `jurnal.id` ke variabel `VITE_API_KEY`.

---

## 🔍 Fitur Utama

### 1. **Date**
Digunakan untuk memilih rentang waktu data yang akan diambil.  
![Date](https://github.com/user-attachments/assets/23280af7-4b18-4f6b-990f-7645e3902365)

### 2. **Sales Features**
- **Sales Invoices**  
  Menampilkan ringkasan data invoice penjualan berdasarkan rentang waktu.  
  ![Sales Invoices](https://github.com/user-attachments/assets/fbd09553-2ab8-4898-b638-23caf62875f4)
  
- **Sales By Customer**  
  Menampilkan ringkasan data penjualan per pelanggan berdasarkan rentang waktu.  
  ![Sales By Customer](https://github.com/user-attachments/assets/fbd09553-2ab8-4898-b638-23caf62875f4)

### 3. **Search Name/ID**
Mencari nama atau ID tertentu (Invoice atau Customer) di dalam tabel.  
![Search Name/ID](https://github.com/user-attachments/assets/c9f06c9b-e578-4e90-9dab-1e13a82c8ec1)

---

## 🗂️ Tabel Data

### 1. **Page Size**
Mengatur jumlah baris data yang ditampilkan per halaman pada tabel.  
![Page Size](https://github.com/user-attachments/assets/ee6165e8-7548-4e4b-bc15-0ac371970132)

### 2. **Preview**
Menampilkan data dalam dua format:  
- **Kiri**: Detail data dalam format `.json`.  
- **Kanan**: Pratinjau data yang akan di-export.  
![Preview](https://github.com/user-attachments/assets/68732d56-b77c-4beb-8c2c-ab11a97dd2c1)

### 3. **Export Options**
- **Export per Row**  
  Mengekspor data per baris dalam format `.txt`.  
  ![Export per Row](https://github.com/user-attachments/assets/e16d8064-d64d-42e3-a576-0e6191667744)
  
- **Export All**  
  Mengekspor semua data dalam tabel (kecuali data yang tersembunyi karena pagination).  
  ![Export All](https://github.com/user-attachments/assets/7c6e3a4f-ff33-4c9d-bbd5-4f568511c979)

### 4. **Export Config**
Mengatur kolom data yang akan dimasukkan ke dalam file `.txt`.  
![Export Config](https://github.com/user-attachments/assets/ae011219-e3b6-4f83-8298-97e97d6d0942)

---

## 📋 Panduan Singkat

1. Pilih rentang waktu dengan fitur **Date**.
2. Gunakan **Sales Invoices** atau **Sales By Customer** untuk menampilkan data yang sesuai.
3. Gunakan **Search Name/ID** untuk mencari data tertentu.
4. Pratinjau data dengan fitur **Preview**.
5. Konfigurasi data dengan **Export Config**.
6. Ekspor data dengan **Export per Row** atau **Export All**.

---

Untuk pertanyaan atau masalah, silakan buka [Issues](https://github.com/Xavce/pt-central-project-txt/issues). 😊
