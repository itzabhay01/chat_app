# **Chat App**

A real-time chat application designed for seamless and secure communication between users. This project leverages modern web technologies to provide an engaging user experience.

---

## **Features**
- **Real-Time Messaging:** Instant delivery of messages using WebSocket technology.
- **Authentication:** Secure user login and registration.
- **User-Friendly Interface:** Built with a responsive and visually appealing design using Material-UI.
- **Scalable Backend:** Designed to handle multiple users simultaneously using Node.js and Express.
- **WebSocket Integration:** Real-time communication between users using Socket.IO.

---

## **Tech Stack**
- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **WebSocket Library:** Socket.IO
- **Version Control:** Git & GitHub
- **Authentication:** JWT (JSON Web Tokens)
- **Environment Variables:** dotenv

---

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or newer)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance like MongoDB Atlas)
- [Git](https://git-scm.com/)

---

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/itzabhay01/chat_app.git
   cd chat_app
2. **Install dependencies**:

 Navigate to both the backend and frontend directories and install the required dependencies.

For the backend:
```bash
cd backend
npm install
```

For the frontend:
```bash
cd ../frontend
npm install
```
3. **Configure environment variables**:
 Create a .env file in the backend directory with the following configuration:

 ```bash
 MONGO_URL=<Your MongoDB connection string>
PORT=5000
JWT_SECRET=<Your secret key>
```

4. **Run the application**:
 First, start the backend server:
 ```bash
cd backend
npm start
 ```
 Then, start the frontend server:
 ```bash
cd frontend
npm start

 ```


