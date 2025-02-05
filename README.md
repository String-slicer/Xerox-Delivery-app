# Printify: A Blockchain-Powered Web App

## Overview
Printify is a blockchain-powered web application designed to revolutionize the Xerox document delivery system. It ensures secure, decentralized, and efficient document handling between customers, Xerox stores, and delivery agents. The platform leverages blockchain technology for document storage and verification, providing transparency and security.

## Features

### 1. Customer Features
- Upload documents for printing.
- Select a preferred Xerox store for printing services.
- Track order status in real-time.
- Secure document storage using **IPFS (InterPlanetary File System)**.
- Authentication via **JWT (JSON Web Token)**.

### 2. Xerox Store Features
- Manage customer orders and printing requests.
- Access secure documents stored on blockchain IPFS.
- Update order statuses to keep customers informed.
- Manage delivery agent assignments.

### 3. Delivery Agent Features
- View assigned delivery requests.
- Access encrypted document delivery details.
- Mark orders as delivered.
- Authenticate via secure login.

## Tech Stack

### Frontend
- **React.js** (with Vite for optimized development)
- **Tailwind CSS** (for responsive and sleek UI design)
- **Leaflet.js** (for map service integration to track stores and deliveries)

### Backend
- **Node.js** and **Express.js** (for handling API requests)
- **MongoDB** (for database management)
- **JWT Authentication** (for secure user authentication)
- **Cloudinary** (for user profile picture storage)

### Blockchain Integration
- **IPFS** (for decentralized document storage)
- **Smart Contracts** (to ensure document security and access control)

## Installation Guide

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (latest version recommended)
- MongoDB (local or cloud-based database)
- Metamask (for blockchain interactions, if required)

### Steps to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/printify.git
   cd printify
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   IPFS_GATEWAY=your_ipfs_gateway_url
   ```

4. Start the backend server:
   ```sh
   npm run server
   ```

5. Navigate to the frontend directory and install dependencies:
   ```sh
   cd client
   npm install
   ```

6. Start the frontend:
   ```sh
   npm run dev
   ```

## Future Enhancements
- Implement a **rating system** for Xerox stores.
- AI-powered **document enhancement** before printing.
- Multi-language support for a broader audience.

## Contributing
We welcome contributions! Feel free to fork this repository, make changes, and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any queries or collaborations, reach out to **Harish Gupta** at [harishgupta6301@gmail.com](mailto:harishgupta6301@gmail.com).
