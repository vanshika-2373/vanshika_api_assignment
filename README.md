# 🌐 Global Trend – API Integration (Node.js Backend)

This is a backend-only Node.js project which fetches data from the public JSONPlaceholder REST API using Axios, processes the response through services & controllers, caches results, and exposes clean REST endpoints using Express.

---

## ⭐ Features
✔ Backend only  
✔ External API consumption  
✔ Uses Axios HTTP client  
✔ Clean Express routing  
✔ Service layer logic  
✔ Data filtering  
✔ Cache support  
✔ Error handling  

---

## 🧠 Skills Used
- REST API handling
- Express routing
- Calling external APIs
- Controller-service architecture
- Caching logic
- Async handling
- JSON response formatting

---

## 🛠 Tech Stack
- Node.js
- Express.js
- Axios

---

##  Folder Structure
src
├── apiClient ← axios instance setup
├── cache ← caching logic
├── controllers ← route controllers
├── routes ← express routes
├── services ← axios + data functions
├── utils ← helper utilities
└── index.js ← server entry file



---

## 🔗 API Endpoints

### 🔹 Get All Posts

Returns filtered posts from external API.

Example response:
```json
{
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "sample title",
      "body": "text here..."
    }
  ]
}


GET /posts/:id
{
  "data": {
    "id": 3,
    "title": "title",
    "body": "sample content"
  }
}



▶️ How To Run

Install packages

npm install

Start dev server

npm run dev