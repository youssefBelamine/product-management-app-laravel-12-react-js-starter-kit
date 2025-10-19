# 🛍️ Product Management App

A modern and elegant **Product Management System** built with **Laravel 12**, **Inertia.js**, **React**, **TypeScript**, and **Shadcn UI**.  
This app allows you to manage your products efficiently — add, edit, delete, upload images, and control stock — all in one clean and interactive dashboard.

---

## 🚀 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/Inertia.js-7C3AED?style=for-the-badge&logo=inertia&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
</p>

---

## ✨ Features

- 🧩 Add, edit, and delete products  
- 🖼️ Upload and preview product images  
- 📦 Manage stock and price  
- 💬 Display validation and success messages  
- ⚡ Built with Inertia.js for seamless SPA experience  
- 🎨 Styled with Shadcn UI + TailwindCSS  
- 📱 Responsive and clean UI  

---

## ⚙️ Installation Guide

Follow these steps to set up and run the project locally 👇

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/product-management.git
cd product-management
```

### 2️⃣ Install Backend Dependencies

```bash
composer install
```

### 3️⃣ Install Frontend Dependencies

```bash
npm install
```

### 4️⃣ Configure Environment
Copy the example environment file and configure your database:

```bash
cp .env.example .env
```

Then edit `.env` to match your local setup:

```bash
DB_CONNECTION=mysql
DB_DATABASE=product_db
DB_USERNAME=root
DB_PASSWORD=
```

### 5️⃣ Generate App Key

```bash
php artisan key:generate
```

### 5️⃣ Generate App Key

```bash
php artisan key:generate
```

### 6️⃣ Run Migrations and Seeders

```bash
php artisan migrate --seed
```
This will create all necessary tables and seed sample data.

### 7️⃣ Run the Development Servers
Start Laravel’s backend and Vite’s frontend in two separate terminals:

```bash
php artisan serve
```
```bash
npm run dev
```

### 5️⃣ Generate App Key

```bash
php artisan key:generate
```

Then open (http://localhost:8000) 🎉

### 🧱 Project Structure
`
product-management/
│
├── app/
│   └── Http/
│       ├── Controllers/
│       └── Requests/
│
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   ├── Components/
│   │   └── Layouts/
│   └── views/
│
├── public/
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── web.php
└── README.md
`
