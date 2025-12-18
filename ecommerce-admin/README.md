# E-Commerce Admin Dashboard

A modern, full-featured admin dashboard for managing e-commerce products. Built with Next.js 16, TypeScript, Prisma, and PostgreSQL, featuring a complete CRUD interface with image upload capabilities and data visualization.

## 📋 Project Overview

This is a comprehensive admin dashboard application that allows you to manage your e-commerce product inventory. The application provides an intuitive interface for creating, reading, updating, and deleting products, along with visual analytics to track your inventory.

## ✨ Features

### Product Management (CRUD Operations)
- **Create Products**: Add new products with name, description, price, stock, and images
- **Read Products**: View all products in a searchable, sortable table
- **Update Products**: Edit existing product information
- **Delete Products**: Remove products with confirmation dialog

### Advanced Features
- **Product Search**: Real-time search functionality across product ID, name, description, price, and stock
- **Image Upload**: Upload product images with validation (PNG, JPG, JPEG, WEBP, max 5MB)
- **Cloudinary Integration**: Secure cloud-based image storage and management
- **Data Visualization**: Interactive bar charts showing product stock levels
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Form Validation**: Client-side and server-side validation using Zod schemas
- **Error Handling**: Comprehensive error handling with user-friendly messages

### User Experience
- **Real-time Updates**: Instant UI updates after operations
- **Loading States**: Visual feedback during async operations
- **Success Messages**: Clear confirmation messages after successful operations
- **Delete Confirmation**: Prevents accidental deletions with modal confirmation

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.10** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **React Hook Form 7.68.0** - Form state management
- **Zod 4.2.1** - Schema validation
- **Recharts 3.6.0** - Data visualization library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma 7.2.0** - Next-generation ORM
- **PostgreSQL** - Relational database
- **Prisma Adapter PG** - PostgreSQL adapter for Prisma 7

### Services & Tools
- **Cloudinary 2.8.0** - Cloud-based image management
- **PostCSS 8.5.6** - CSS processing
- **ESLint** - Code linting

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Cloudinary Account** (for image storage)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-admin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the `ecommerce-admin` directory and copy the contents from `sample.env`:

```bash
cp ../sample.env .env
```

Then, update the `.env` file with your actual credentials:

```env
DATABASE_URL="postgresql://postgre_username:password@localhost:5432/ecommerce"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

#### Environment Variables Explained:

- **DATABASE_URL**: PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database_name`
  - Replace `postgre_username` with your PostgreSQL username
  - Replace `password` with your PostgreSQL password
  - Replace `localhost:5432` if your database is hosted elsewhere
  - Replace `ecommerce` with your database name (or create a new database with this name)

- **CLOUDINARY_CLOUD_NAME**: Your Cloudinary cloud name
  - Get this from your [Cloudinary Dashboard](https://cloudinary.com/console)

- **CLOUDINARY_API_KEY**: Your Cloudinary API key
  - Found in your Cloudinary Dashboard under Account Details

- **CLOUDINARY_API_SECRET**: Your Cloudinary API secret
  - Found in your Cloudinary Dashboard under Account Details

### 4. Set Up PostgreSQL Database

1. Create a new PostgreSQL database:

```sql
CREATE DATABASE ecommerce;
```

2. Or use your preferred PostgreSQL client to create the database.

### 5. Set Up Prisma

1. Generate Prisma Client:

```bash
npx prisma generate
```

2. Run database migrations:

```bash
npx prisma migrate dev
```

This will create the `Product` table in your PostgreSQL database with the following schema:
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (String)
- `price` (Float)
- `stock` (Integer)
- `imageUrl` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 7. Access the Dashboard

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to access the admin dashboard.

## 📁 Project Structure

```
ecommerce-admin/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── prisma.config.ts      # Prisma configuration
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── products/     # Product CRUD endpoints
│   │   │   └── upload/       # Image upload endpoint
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── create/       # Create product page
│   │   │   ├── edit/[id]/    # Edit product page
│   │   │   └── page.tsx      # Main dashboard page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ProductTable.tsx  # Product table with search
│   │   ├── ProductForm.tsx   # Create product form
│   │   ├── ProductFormEdit.tsx # Edit product form
│   │   └── ProductBarCharts*.tsx # Chart components
│   ├── lib/                  # Utility libraries
│   │   ├── prisma.ts         # Prisma client instance
│   │   └── cloudinary.ts     # Cloudinary configuration
│   └── schema/               # Zod validation schemas
│       └── product.schema.ts
├── .env                      # Environment variables (create this)
├── sample.env                # Environment variables template
├── package.json
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get a single product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product

### Upload
- `POST /api/upload` - Upload an image to Cloudinary

## 🎨 Features in Detail

### Product Table
- Displays all products in a responsive table
- Shows Product ID (truncated), Name, Description, Price, Stock, and Image
- Real-time search across all fields
- Edit and Delete actions for each product

### Product Form
- Validated input fields with error messages
- File upload with drag-and-drop interface
- Image preview after upload
- File type and size validation
- Success/error feedback

### Data Visualization
- Bar charts showing product stock levels
- Interactive charts with tooltips
- Responsive chart sizing


**Happy Coding! 🚀**
