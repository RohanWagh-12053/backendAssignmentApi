# Approach and Algorithm Choices

## 1. Introduction

### Purpose: 
The purpose of this project is to build a backend RESTful API for managing tasks (to-do items) using Node.js and Express.js. The API supports CRUD operations (Create, Read, Update, Delete) and includes features like **pagination and filtering** based on title and completion status.

## 2. Project Structure

The project consists of the following components:

```
backend-api/
│
├── index.js        # Main server file containing the API routes.
├── README.md       # Documentation file explaining the API .
├── REPORT.md       # This file, explaining the approach and algorithm choices.
└── package.json    # Dependencies and project metadata.

```

## 3. Approach and Algorithm Choices

### 3.1: Backend Framework and API Design

The project is built using **Express.js** for the backend because of its simplicity and flexibility in building RESTful APIs. The API allows the user to perform CRUD operations for managing tasks.


### 3.2: CRUD Operations

The API supports the following operations:

- **Create (POST /tasks):**

    Creates a new task with a title, description, and completion status.

   ```bash
  app.post("/tasks", (req, res) => { ... });
   ```   
- **Read (GET /tasks and GET /tasks/:id):**

    Fetches tasks either in a list or by a specific ID.

   ```bash
     app.get("/tasks", (req, res) => { ... });
     app.get("/tasks/:id", (req, res) => { ... });
   ```  


- **Update (PUT /tasks/:id):**

    Updates the task title, description, or completion status based on the ID.

   ```bash
   app.put("/tasks/:id", (req, res) => { ... });
   ```  

- **Delete (DELETE /tasks/:id):**

    Deletes a task based on its ID.

   ```bash
   app.delete("/tasks/:id", (req, res) => { ... });
   ```  

## 4. Approach for Pagination and Filtering

### 4.1: Pagination

Pagination is implemented on the GET /tasks route to handle large datasets. The following query parameters can be used:

- `page`: Specifies the page number (default is 1).

- `limit`: Specifies the number of tasks per page.


**Example Request :**
```bash
 GET /tasks?page=2&limit=5
```

**Pagination Logic :**

```js
let page = parseInt(req.query.page) || 1;
let limit = parseInt(req.query.limit);
let startIndex = (page - 1) * limit;
let endIndex = startIndex + limit;
const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

```


### 4.2: Filtering

Filtering is applied by title and completed query parameters.

- `title`: Filters tasks that contain the provided string in their title (case-insensitive).

- `completed`: Filters tasks based on their completion status (either true or false).


**Example Request :**

```bash
GET /tasks?title=study&completed=true
```
**Filtering Logic :**

```js
if (title) {
  filteredTasks = filteredTasks.filter(currentTask => currentTask.title.toLowerCase().includes(title.toLowerCase()));
}

if (completed != undefined) {
  let isCompleted = completed === "true";
  filteredTasks = filteredTasks.filter(currentTask => currentTask.completed === isCompleted);
}

```

<br>

## 5. Error Handling and Validation
Error handling is implemented for common cases such as:

- Missing required fields (e.g., title, description).

- Non-existent tasks when updating or deleting.

- Internal server errors during API execution.

**Example Error Response :**

```js
if (!title || !description) {
  return res.status(400).json({ error: "Title and description are required." });
}
```
<br>

## 6. Algorithm Choices

### 6.1: Task Retrieval

Tasks are filtered based on the user's query (title and completed status). Pagination is applied by slicing the filtered tasks based on the page and limit.

```js
const filteredTasks = tasks.filter( ... );
const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
```

### 6.2: Task Updates
When updating a task, only the fields that are provided are updated. This allows partial updates without overwriting existing data.

```js
if (newTitle) task.title = newTitle;
if (newDescription) task.description = newDescription;
```

### 6.3: Task Deletion
The task is removed from the array by filtering out the task with the matching ID.

```js
tasks = tasks.filter((currentTask) => currentTask.id !== taskID);
```
## 7. Future Improvements
The project can be extended further by:

- Integrating a database like MongoDB for persistent storage.

- Adding authentication (e.g., JWT tokens) to secure certain routes.

- Improving logging and error handling for better monitoring and debugging.

<br>

## 8. Conclusion
This project provides a functional backend API for managing tasks with the ability to paginate and filter task lists based on title and completion status. It is a scalable foundation that can be extended with additional features like authentication or persistent storage.




