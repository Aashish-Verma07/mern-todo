import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

export const TaskContext = createContext(null);

const TaskContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn,setLoggedIn] = useState(false)
  const [todos, setTodos] = useState([]);
  const url = "http://localhost:4000"
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Track whether we are editing or adding a task
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited
  const [filter, setFilter] = useState("all"); // Track the filter state ("all" or "completed")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // Add or Edit task
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update task
        const response = await axios.put(`${url}/api/v1/todo/edit`, {
          id: editingTaskId,
          title: task.title,
          description: task.description,
          completed: task.completed,
        });
        if (response.data.success) {
          setTodos(
            todos.map((todo) =>
              todo._id === editingTaskId ? response.data.task : todo
            )
          );
          toast.success("Task updated successfully");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Add new task
        const response = await axios.post(`${url}/api/v1/todo/add`, task);
        if (response.data.success) {
          setTodos([...todos, response.data.newTask]);
          toast.success("Task added successfully");
        } else {
          toast.error(response.data.message);
        }
      }
      setTask({ title: "", description: "" }); // Clear form fields
      setIsEditing(false); // Reset editing mode
      setEditingTaskId(null); // Reset editing task ID
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${url}/api/v1/todo/delete`, { id });
      if (response.data.success) {
        setTodos(todos.filter((todo) => todo._id !== id));
        toast.success("Task deleted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete task");
    }
  };

  // Mark as complete
  const handleComplete = async (id) => {
    try {
      const response = await axios.put(`${url}/api/v1/todo/updated`, { id });
      if (response.data.success) {
        setTodos(
          todos.map((todo) => (todo._id === id ? response.data.task : todo))
        );
        toast.success("Marked as Completed");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle edit task
  const handleEditTask = (taskToEdit) => {
    setTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
      completed: taskToEdit.completed,
    });
    setIsEditing(true);
    setEditingTaskId(taskToEdit._id); // Set the task ID to be updated
  };

  // Filter tasks based on the selected filter
  const filteredTasks = todos.filter((task) => {
    if (filter === "completed") {
      return task.completed; // Show only completed tasks
    }
    return true; // Show all tasks if filter is 'all'
  });

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("UsersDetails");
    navigate("/"); // Redirect to home after logout
    // console.log("hehe")
  };

  // Fetch tasks
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/todo/get`);
      setTodos(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const contextValue = {
    url,
    handleFormSubmit,
    handleInputChange,
    task,
    isEditing,
    filter,
    setFilter,
    filteredTasks,
    handleDelete, 
    handleComplete,
    handleEditTask,
    handleLogout,
    loggedIn,
    setLoggedIn


  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
export default TaskContextProvider;
