import express from "express";
import {
  addTodoController,
  getTodoController,
  deleteTodoController,
  taskUpdatedController,
  editTaskController,
} from "../controllers/todoController.js";

const router = express.Router();

//routes

// addtodo || method POST
router.post("/add", addTodoController);

// gettodo || method POST
router.get("/get", getTodoController);

// deletetodo || method POST
router.post("/delete", deleteTodoController);

// update or mark as ccompleted || method PUT
router.put("/updated", taskUpdatedController);

// edit task || method PUT
router.put("/edit", editTaskController);

export default router;
