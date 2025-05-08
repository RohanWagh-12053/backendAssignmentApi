# Task Manager RESTful API

A simple backend-only task manager REST API built with Node.js and Express.js.  
It allows users to create, read, update, delete, and filter tasks.  
Includes support for pagination and filtering by title and completion status.

---

## 📦 Getting Started

### ✅ Prerequisites
- Node.js (v14 or higher)

### 📥 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd backend-api
```

2. Install Dependancies:
```bash
npm install
```

3. Start the Server :
```bash
node index.js
```

4. Open your browser or API client (like Postman) and visit:

```bash
http://localhost:3000
```

## 🚀 API Endpoints

### 1. `GET /`
Check if the backend server is running.

**Response:**
```json
"Backend is Running Fine"
```

### 2. `POST /tasks`
Create a new Task

**Request Body :**

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "completed": true  // Optional, defaults to false
}
```

**Response :**
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": true
}
```

### 3. `GET /tasks`

Get all tasks with optional pagination and filtering.

**Query Parameters :**

- `page` : (Optional) Page number (default: 1)

- `limit` : (Optional) Tasks per page (default: all)

- `title` : (Optional) Filter by title (partial match)

- `completed` : (Optional) true/false

<br>

**Example :**

```bash
/tasks?page=1&limit=5&completed=true&title=home
```
<br>

**Response :**
```json
{
  "currentPage": 1,
  "tasksPerPage": 5,
  "totalTasks": 12,
  "totalPages": 3,
  "tasks": [
    {
      "id": 2,
      "title": "Homework",
      "description": "Math exercises",
      "completed": true
    }
  ]
}
```

### 4. `GET /tasks/:id`

Fetch a task by its ID.

**Example URL :**
```
/tasks/1 
```

**Response :**

```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false
}
```

<br>

### 5. `PUT /tasks/:id`
Update a task by ID. Only the fields provided will be updated.

**Request Body (any or all fields) :**
```json
{
  "newTitle": "Updated Title",
  "newDescription": "Updated Description",
  "completed": true
}
```

**Response :**
```json
{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true
}
```
<br>

### 6. `DELETE /tasks/:id`
Delete a task by ID.

**Response :**
```json
{
  "message": "Task Deleted Successfully",
  "deletedTask": {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "completed": false
  }
}
```



