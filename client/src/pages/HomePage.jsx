

import { useEffect, useState } from "react";
import List from "../components/List";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = ({url}) => {
  // const url = "http://localhost:4000";
  const newUrl = url 
  const [todos, setTodos] = useState([]);
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
        const response = await axios.put(`${newUrl}/api/v1/todo/edit`, {
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
        const response = await axios.post(`${newUrl}/api/v1/todo/add`, task);
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
      const response = await axios.post(`${newUrl}/api/v1/todo/delete`, { id });
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
      const response = await axios.put(`${newUrl}/api/v1/todo/updated`, { id });
      if (response.data.success) {
        setTodos(todos.map((todo) => (todo._id === id ? response.data.task : todo)));
        toast.success("Marked as Completed");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch tasks
  const fetchData = async () => {
    try {
      const response = await axios.get(`${newUrl}/api/v1/todo/get`);
      setTodos(response.data.tasks);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="mt-4 mx-4 sm:mx-16 flex flex-col justify-center border py-6 bg-purple-400 rounded-sm">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">Todo-List</h1>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col lg:flex-row justify-center gap-4 items-center border-b-2 border-white text-xl p-4"
          >
            <div className="flex flex-col justify-center">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                placeholder="title"
                className="w-full sm:w-96 px-2 py-3 outline-none"
                required
                name="title"
                value={task.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                placeholder="description"
                className="w-full sm:w-96 px-2 py-3 outline-none"
                required
                name="description"
                value={task.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center items-center mb-3 lg:mt-11">
              <button
                type="submit"
                className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {isEditing ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
          <div className="flex justify-start gap-4 p-4">
            <button
              onClick={() => setFilter("all")}
              className={`text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center ${filter === "all" ? "bg-pink-700" : ""}`}
            >
              Todo
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center ${filter === "completed" ? "bg-pink-700" : ""}`}
            >
              Completed
            </button>
          </div>
        </div>

        {filteredTasks.map((currElem) => {
          return (
            <List
              key={currElem._id}
              currTask={currElem}
              completed={currElem.completed}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              handleEditTask={handleEditTask}
            />
          );
        })}
      </section>
    </>
  );
};

export default HomePage;
