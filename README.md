# 🏪 Store Traffic Dashboard

A real-time full stack application that tracks customer traffic (in/out) in a store using **Kafka**, **WebSockets**, and a **React frontend**.

## 🔧 Tech Stack

- **Frontend**: React, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js, Socket.IO
- **Streaming**: Apache Kafka (with KafkaJS)

---

## 📁 Folder Structure
Store-Traffic-Dashboard
├── frontend/ # React app
└── backend/ # Express + Kafka producer/consumer

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- **Node.js** (v14 or above)
- **npm**
- **Apache Kafka & Zookeeper** (locally installed)

---

## 🚀 Getting Started

🧪 You’ll need **2 terminals** for the backend (server + producer), and **1 terminal** for the frontend.

### 1. Start Kafka & Zookeeper
1. cd /backend
2 docker-compose up -d

### 2. Backend Setup
1. cd /backend
2. npm install
3. node index.js

### 3. Start Kafka Producer
1. cd /backend/utils/kafka/producer.js
2. node producer.js

### 4. Frontend Setup
1. cd /frontend
2. npm install
3. npm start

This will run the app at: http://localhost:3000

---

## ✅ Features
1. Live Table – Displays real-time customer in/out data using WebSockets
2.History Table – Shows hourly summary for the last 24 hours (via REST API)
3. Kafka Integration – Used for streaming customer activity messages
4. WebSockets – For live updates between backend and frontend
---
