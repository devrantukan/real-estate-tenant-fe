# Real Estate Tenant Panel Frontend

This is the frontend application for the Real Estate Tenant Panel, a modern web application for managing real estate properties, tenants, and office operations. Built with Next.js, it offers a responsive and dynamic user interface.

## Overview

The Real Estate Tenant Panel Frontend interacts with the backend services to allow users to view property listings, manage their subscriptions, and communicate with real estate agents. It leverages Server-Side Rendering (SSR) and modern UI components for seamless performance.

## Technologies and Packages Used

### Core Framework
- **Next.js** (`^14.2.3`): The React framework for production.
- **React** (`^18`): Library for building user interfaces.
- **TypeScript**: Static type checking.

### Authentication & Database
- **@kinde-oss/kinde-auth-nextjs**: Authentication solution.
- **@supabase/supabase-js**: Supabase client for database and storage interaction.
- **@prisma/client**: ORM for type-safe database access.
- **Axios**: Promise-based HTTP client.

### UI Components & Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **NextUI** (`@nextui-org/*`): Beautiful, fast, and modern React UI library.
- **Radix UI** (`@radix-ui/*`): Unstyled, accessible UI primitives.
- **Framer Motion**: Motion library for React.
- **Lucide React**, **Heroicons**, **Phosphor Icons**, **Remixicon**: Icon sets.
- **Embla Carousel**: Carousel component.

### Form Management & Validation
- **React Hook Form**: Performant, flexible, and extensible forms.
- **Zod**: TypeScript-first schema declaration and validation library.
- **@hookform/resolvers**: Validation resolvers for React Hook Form.

### Maps & Location
- **@react-google-maps/api**: React components for Google Maps.
- **Google Map React**: Google Map library.
- **Google Maps React Markers**: Markers for Google Maps.

### Search
- **Typesense**: Fast, typo-tolerant search engine.
- **React InstantSearch DOM**: Search UI components.

### Payment Processing
- **Stripe**: Payment processing platform.
- **@stripe/react-stripe-js**: Stripe.js and Elements wrappers for React.

### Utilities
- **Nodemailer**: Send emails from Node.js.
- **Sharp**: High-performance image processing.
- **Slugify**: URL slug generation.
- **Validator**: String validation and sanitization.
- **React Toastify**: Toast notifications.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/devrantukan/real-estate-tenant-fe.git
    cd real-estate-tenant-fe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and configure the necessary keys as per the backend requirements (see `.env.example`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

   Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Search Engine Setup (Typesense)

This project uses Typesense for fast, typo-tolerant search. It is configured to run in a Docker container.

### Configuration
The following environment variables are required in `.env` (already configured in `docker-compose.yml`):
- `NEXT_PUBLIC_TYPESENSE_API_KEY`: The API key for Typesense (securely managed).
- `NEXT_PUBLIC_TYPESENSE_HOST`: Host for client-side access (default: `localhost`).
- `TYPESENSE_HOST`: Host for server-side access (default: `typesense`).

### Data Indexing
To populate the search index with data from your database, run the initialization script inside the frontend container:

```bash
docker exec real-estate-tenant-fe node src/utils/initializeTypesense.js
```

This script will:
1. Delete any existing 'posts' collection.
2. Create a new collection with the correct schema.
3. Seed it with all 'PUBLISHED' properties from the PostgreSQL database.

## Running with Docker

You can run the application using Docker and Docker Compose for a consistent environment.

1.  **Ensure you have a `.env` file** configured with the required environment variables.
2.  **Build and start the container:**
    ```bash
    docker-compose up --build -d
    ```
3.  **Access the application:**
    Open [http://localhost:3001](http://localhost:3001) in your browser.

4.  **Stopping the container:**
    ```bash
    docker-compose down
    ```


## Project Structure

-   `/src/app`: App Router pages and layouts.
-   `/src/components`: Reusable UI components.
-   `/src/lib`: Utility functions and library configurations (Prisma, Supabase, etc.).
-   `/prisma`: Database schema and migrations.
