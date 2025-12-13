# Tennis Shop - Setup and Running Guide

This is a full-stack web application for an e-commerce tennis shop with user authentication, product browsing, shopping cart, and order management. The backend is PHP with MySQL, and the frontend is React with TypeScript.

## Prerequisites

### System Requirements
- **XAMPP** (Apache + MySQL + PHP) - Download from https://www.apachefriends.org/
- **Node.js** (v16 or higher) - Download from https://nodejs.org/
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Install XAMPP and Start Services

1. Download and install XAMPP from https://www.apachefriends.org/
2. Launch XAMPP Control Panel
3. Start **Apache** and **MySQL** services
4. Verify services are running (should show green "Running" status)

### 2. Create the Database

#### Using phpMyAdmin (GUI):
1. Open phpMyAdmin by navigating to `http://localhost/phpmyadmin/`
2. Create a new database named `tennis_shop`
3. Select the `tennis_shop` database
4. Run the SQL script below to create the required tables

#### SQL Database Schema

Run these SQL commands in phpMyAdmin:

```sql
-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id VARCHAR(255),
    name VARCHAR(255),
    price DECIMAL(10, 2),
    quantity INT,
    image LONGTEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### 3. Deploy Backend Files

1. Navigate to your XAMPP installation directory:
   - **Windows**: `C:\xampp\htdocs\`
   - **Linux/Mac**: `/opt/lampp/htdocs/`

2. Create a folder named `tennis_shop_backend` (or your preferred name)

3. Copy all files from the `backend/` folder into this directory:
   - `db.php`
   - `register.php`
   - `login.php`
   - `logout.php`
   - `user.php`
   - `create_order.php`
   - `get_orders.php`

4. Verify the `db.php` file has the correct database credentials:
   ```php
   $servername = "localhost";
   $username = "root";
   $password = "";  // XAMPP default (empty)
   $dbname = "tennis_shop";
   ```

### 4. Setup Frontend

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify that `vite.config.ts` proxy is configured to point to your backend (default: `http://localhost/tennis_shop_backend`):
   ```typescript
   proxy: {
       '/backend': {
           target: 'http://localhost/tennis_shop_backend',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/backend/, '')
       }
   }
   ```

### 5. Run the Application

#### Start the Frontend (Development):
From the `frontend/` directory, run:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/`

#### Backend Access:
The PHP backend runs automatically through Apache and is accessible at:
- `http://localhost/tennis_shop_backend/user.php`
- `http://localhost/tennis_shop_backend/register.php`
- `http://localhost/tennis_shop_backend/login.php`
- etc.

## API Endpoints

All backend endpoints are located at `http://localhost/tennis_shop_backend/`:

- **POST** `/register.php` - Register a new user
- **POST** `/login.php` - User login (returns session cookie)
- **POST** `/logout.php` - User logout
- **GET** `/user.php` - Get current logged-in user info
- **POST** `/create_order.php` - Create a new order
- **GET** `/get_orders.php` - Retrieve user's orders

## Troubleshooting

### Database Connection Fails
- Ensure MySQL service is running in XAMPP Control Panel
- Verify database name is `tennis_shop`
- Check that credentials in `db.php` match your XAMPP setup

### CORS Errors
- Frontend is configured to allow `http://localhost:5173`
- Ensure backend files have proper CORS headers
- Check that the Vite proxy is correctly configured

### Port Conflicts
- If port 5173 is in use, Vite will use the next available port (shown in terminal)
- Apache typically uses port 80 (ensure it's available)
- MySQL uses port 3306 (ensure it's available)

### Session/Cookie Issues
- Ensure `Access-Control-Allow-Credentials: true` is set in backend headers
- Verify browser allows cross-origin cookies

## Project Structure

```
tennis_shop/
├── backend/              # PHP API files
│   ├── db.php
│   ├── register.php
│   ├── login.php
│   ├── logout.php
│   ├── user.php
│   ├── create_order.php
│   └── get_orders.php
├── frontend/             # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   ├── context/
│   │   └── interfaces/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── SETUP.md              # This file
```

## Notes

- Sessions are managed through PHP session cookies, ensuring secure authentication
- Password hashing uses PHP's `password_hash()` with bcrypt
- All database queries use prepared statements to prevent SQL injection
- Product data is stored in the frontend and can be modified in the source code
- Orders are persisted in the MySQL database and associated with user accounts
