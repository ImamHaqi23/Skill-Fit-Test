# Dashboard RT Management

Selamat datang di Dashboard RT Management! Proyek ini menyediakan aplikasi dashboard yang dibangun dengan React.js untuk Frontend Dan Express.js untuk Backend.

## Project Backend

### Teknologi yang digunakan

- Node.js
- Express.js
- MySQL
- CORS
- dotenv
- Sequelize
- Sequelize-CLI
- Cloudinary
  
### Prasyarat

Sebelum memulai, pastikan Anda telah memenuhi persyaratan berikut:

- Node.js dan npm terinstal di komputer/laptop Anda. Anda dapat mengunduhnya dari [nodejs.org](https://nodejs.org/).
- MySQL database terinstal dan berjalan.
- Memiliki akun Cloudinary untuk layanan unggah gambar.

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/ImamHaqi23/Skill-Fit-Test

2. **Arahkan ke direktori proyek**

   ```sh
   cd rt-management-be

3. **Install the dependencies**

   ```sh
   npm install
   
4. **Buat sebuah file .env di direktori root proyek dan tambahkan variabel lingkungan berikut ini:**

   Silahkan masukkan port sesuai yang diinginkan. Dan masukkan nama database yang telah kamu buat dan masukkan username dan password (jika menggunakannya). Dan jangan lupa setelah mendaftar di Cloudinary masukkan cloud name, api key, dan api secret di akun Cloudinarymu.  

   ```sh
   PORT= your-port (Contoh : 4000)
   DB_USERNAME = your-database-username (Contoh : root)
   DB_PASSWORD = your-database-password (Contoh : admin#1234)
   DB_HOST = your-database-host (Contoh : 127.0.0.1)
   DB_DATABASE = your-database-name (Contoh : my-database)
   DB_DIALECT = mysql 
   CLOUDINARY_CLOUD_NAME = your-cloudinary-name (Contoh : my-img)
   CLOUDINARY_API_KEY = your-cloudinary-api-key (Contoh : 252985098783284)
   CLOUDINARY_API_SECRET = your-cloudinary-api-secret (Contoh : pUi8t4vc3kROmlyF4mIRPzKhJHy)

5. **Jalankan database migrations**

   ```sh
   npx sequelize-cli db:migrate

6. **Jalankan Programnya**

   ```sh
   npm run dev

## Project Front End

### Teknologi yang digunakan

- React.js
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- ui.shadcn
  
### Prasyarat

Sebelum memulai, pastikan Anda telah memenuhi persyaratan berikut:

- Node.js dan npm terinstal di komputer/laptop Anda. Anda dapat mengunduhnya dari [nodejs.org](https://nodejs.org/).

### Installation

1. **Arahkan ke direktori proyek**

   ```sh
   cd .. (untuk pindah ke direktori utama, dimana sebelumnya Anda berada di folder rt-management-be)
   cd rt-management-fe

2. **Install the dependencies**

   ```sh
   npm install
   
3. **Buat sebuah file .env di direktori root proyek dan tambahkan variabel lingkungan berikut ini:**

   Silahkan masukkan API sesuai apa yang telah anda buat  

   ```sh
   VITE_API_BASE_URL = your-api-base-url (Contoh: http://localhost:4000)

4. **Jalankan Programnya**

   ```sh
   npm run dev
