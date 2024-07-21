## Project Backend

This is a backend project built with Express.js, MySQL, CORS, dotenv, Sequelize, Sequelize-CLI, and Cloudinary.

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

   Silahkan masukkan port sesuai yang diinginkan. Dan masukkan nama database yang telah kamu buat dan masukkan username dan password. Dan jangan lupa setelah mendaftar di Cloudinary masukkan cloud name, api key, dan api secret di akun Cloudinarymu.  

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
    


  

   
