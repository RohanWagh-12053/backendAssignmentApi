const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//storing in memory (array)
let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("Backend is Running Fine");
});

//get all tasks
app.get("/tasks", (req, res) => {
  try {
    // Getting Query Paramenters

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit);
    let { title, completed } = req.query;

    let filteredTasks = [...tasks];

    //1) Filtering by title

    if (title) {
      filteredTasks = filteredTasks.filter((currentTask) =>
        currentTask.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    //2) filtering by Completed or not
    if (completed != undefined) {
      // console.log("Completed = ",completed,typeof completed)
      let isCompleted = completed === "true";

      // console.log("isCompleted = ",isCompleted)
      filteredTasks = filteredTasks.filter(
        (currentTask) => currentTask.completed === isCompleted
      );
    }

    // if limit is not provided then making it equal to the total tasks
    if (!limit) limit = tasks.length;

    //calculating the start and end index
    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;

    //Slicing the tasks array according to start and end Index
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    const result = {
      currentPage: page,
      tasksPerPage: limit,
      totalTasks: filteredTasks.length,
      totalPages: Math.ceil(filteredTasks.length / limit),
      tasks: paginatedTasks,
    };

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get a task by its Id

app.get("/tasks/:id", (req, res) => {
  try {
    //converting the id (string) to id (integer)
    const taskId = parseInt(req.params.id);

    //finding the task by its id
    const task = tasks.find((currentTask) => currentTask.id === taskId);

    //if task with the provided id is not present then throwing error
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json(task); // successful retrieval
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// Create a Task - Post Route

app.post("/tasks", (req, res) => {
  try {
    // extracting the fields from the request body
    const { title, description, completed } = req.body;

    // validating title and description is present or not
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required." });
    }

    // Creating a Task object
    const newTask = {
      id: nextId++, //incrementing the id for uniqueness
      title,
      description,
      //checking the type of the completed key is boolean if yes then assign its value
      //making sure that if completed is not given then by Default the completed is false
      completed: typeof completed === "boolean" ? completed : false,
    };

    tasks.push(newTask); //pushing the newly created task into the tasks Array
    res.status(201).json(newTask); // Successful Creation
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Updating the Task by ID - PUT

app.put("/tasks/:id", (req, res) => {
  try {
    //converting the id (string) to id (integer)
    const taskID = parseInt(req.params.id);
    // console.log("taskID = ", taskID);

    // extracting the fields from the request body
    const { newTitle, newDescription, completed } = req.body;

    //finding the task by the id provided
    const task = tasks.find((currentTask) => currentTask.id === taskID);
    // console.log("task = ", task);

    //if task with the provided id is not present then throwing error
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    //only update the fields which are provided
    if (newTitle) task.title = newTitle;
    if (newDescription) task.description = newDescription;

    if (typeof completed === "boolean") {
      task.completed = completed;
    }

    res.status(200).json(task); //Successful Update
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Deleting a Task by its ID

app.delete("/tasks/:id", (req, res) => {
  try {
    //converting the id (string) to id (integer)
    const taskID = parseInt(req.params.id);

    //finding the task by the id provided
    const task = tasks.find((currentTask) => currentTask.id === taskID);

    //if task with the provided id is not present then throwing error
    if (!task) {
      return res.status(404).json({ error: "Task not Found" });
    }

    // filtering the array excluding the task with the provided id
    tasks = tasks.filter((currentTask) => currentTask.id != taskID);
    // console.log("Tasks Filtered successfully");

    //Successful Deletion
    res.status(200).json({
      message: "Task Deleted Successfully",
      deletedTask: task,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`backend api is running on port http://localhost:${port}`);
});
