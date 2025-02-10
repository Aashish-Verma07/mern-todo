import { useContext } from "react";
import List from "../components/List";
import { TaskContext } from "../context/TaskContext.jsx";

const HomePage = () => {
  const {
    handleFormSubmit,
    handleInputChange,
    handleLogout,
    task,
    isEditing,
    setFilter,
    filteredTasks,
    filter,

  } = useContext(TaskContext);

  return (
    <>
      <section className="mt-4 mx-4 sm:mx-16 flex flex-col justify-center border py-6 bg-purple-400 rounded-sm">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold mb-4 text-center">Todo-List</h1>
          <button 
          onClick={handleLogout}
          className="active:bg-red-500 mb-4 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 sm:w-auto px-5 py-2.5 text-center">
            Logout
          </button>
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
              className={`text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                filter === "all" ? "bg-pink-700" : ""
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                filter === "completed" ? "bg-pink-700" : ""
              }`}
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
              // handleDelete={handleDelete}
              // handleComplete={handleComplete}
              // handleEditTask={handleEditTask}
            />
          );
        })}
      </section>
    </>
  );
};

export default HomePage;
