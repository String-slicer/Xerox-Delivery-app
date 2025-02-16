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
- **Payments via Razorpay** for seamless online transactions.

### 2. Xerox Store Features
- Manage customer orders and printing requests.
- Access secure documents stored on blockchain IPFS.
- Update order statuses to keep customers informed.
- Manage delivery agent assignments.
- Accept payments through **Razorpay integration**.

### 3. Delivery Agent Features
- View assigned delivery requests.
- Access encrypted document delivery details.
- Mark orders as delivered.
- Authenticate via secure login.

### 4. Real-Time Communication
- Integrated **Socket.io** for real-time order status updates and communication between users.

### 5. Blockchain Integration
- **Smart Contract deployed on Sepolia Testnet** for secure and transparent transactions.
- **Truffle** used for smart contract development, migration, and testing.

### 6. Location Tracking
- **Leaflet.js** integrated for interactive maps to track Xerox stores and delivery agents.

## Tech Stack

### Frontend
- **React.js** (with Vite for optimized development)
- **Tailwind CSS** (for responsive and sleek UI design)
- **Leaflet.js** (for map service integration to track stores and deliveries)
- **Socket.io** (for real-time updates and notifications)
- **Pinata API** (for IPFS-based document storage)

### Backend
- **Node.js** and **Express.js** (for handling API requests)
- **MongoDB** (for database management)
- **JWT Authentication** (for secure user authentication)
- **Cloudinary** (for user profile picture storage)
- **Razorpay** (for payment processing)
- **Node Mailer** (for Email verification)

### Blockchain Integration
- **IPFS** (for decentralized document storage)
- **Smart Contracts** (deployed on **Sepolia Testnet**) to ensure document security and access control
- **Truffle** (for smart contract development and testing)

## Installation Guide

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (latest version recommended)
- MongoDB (local or cloud-based database)
- Metamask (for blockchain interactions, if required)
- Truffle (for managing smart contracts)
- Ganache (for local blockchain testing)

### Steps to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/String-slicer/Xerox-Delivery-app.git
   cd Xerox-Delivery-app
   ```

2. Navigate to the backend directory:
   ```sh
   cd backend
   ```

3. Install backend dependencies:
   ```sh
   npm install
   ```

4. Set up environment variables for the backend in `backend/.env`:
   ```env
   MAIL_HOST=
   MAIL_USER=
   MAIL_PASS=
   JWT_SECRET=Harish
   MONGODB_URL=
   PORT=4000
   RPC_URL=http://127.0.0.1:7545
   PRIVATE_KEY=0xdd141c823a4175124ee9a30ac28fdca50f4ca196a12a682262368d201731a09f
   INFURA_PROJECT_ID=314d2e9b187b42c581d581c9711194c8
   MNEMONIC=
   CONTRACT_ADDRESS=0x1ab7d354f4ef4ae7ead5082168a63ecabb5ff107
   CLOUD_NAME=
   API_KEY=
   API_SECRET=
   RAZORPAY_KEY=
   RAZORPAY_SECRET=
   ```

5. Start the backend server:
   ```sh
   npm start
   ```

6. Deploy Smart Contracts (Optional - If making blockchain modifications):
   ```sh
   truffle migrate --network sepolia
   ```

7. Open a new terminal and navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

8. Install frontend dependencies:
   ```sh
   npm install
   ```

9. Set up environment variables for the frontend in `frontend/.env`:
   ```env
   VITE_BACKEND_URL=your_backend_api_url
   VITE_RAZORPAY_KEY=your_razorpay_key_id
   VITE_PINATA_SECRET_KEY=your_pinata_secret_key
   VITE_PINATA_API_KEY=your_pinata_api_key
   ```

10. Start the frontend:
    ```sh
    npm run dev
    ```

## Future Enhancements
- Implement a **rating system** for Xerox stores.
- AI-powered **document enhancement** before printing.
- Multi-language support for a broader audience.
- **Progressive Web App (PWA) integration** for offline functionality and better user experience.
- **Enhanced Smart Contracts** to enable more secure and transparent transactions.
- **Automated Order Allocation** using AI for efficient order distribution.

## Contact
For any queries or collaborations, reach out to **Harish Gupta** at [harishgupta6301@gmail.com](mailto:harishgupta6301@gmail.com).
