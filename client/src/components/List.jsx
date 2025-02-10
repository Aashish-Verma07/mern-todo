
import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { TaskContext } from "../context/TaskContext.jsx";

const List = ({currTask,completed}) => {
 const {handleDelete, handleComplete, handleEditTask } = useContext(TaskContext)
  return (
    <section>
      <div className="p-4">
        <div className="flex justify-between items-center text-3xl">
          <p className={completed ? "text-decoration-line: line-through" : ""}>
            {currTask.title}
          </p>
          <div className="flex justify-between gap-4 text-xl">
            <FaCheck
              onClick={() => {
                handleComplete(currTask._id);
              }}
              className="text-green-600 hover:scale-125 duration-300 active:text-green-700"
            />
            <FaPencilAlt
              onClick={() => {
                handleEditTask(currTask); // Pass the whole task to the handler
              }}
              className="hover:scale-125 duration-300 active:text-gray-700"
            />
            <FaRegTrashAlt
              onClick={() => {
                handleDelete(currTask._id);
              }}
              className="text-red-600 hover:scale-125 duration-300 active:text-red-700"
            />
          </div>
        </div>
        <div className="text-xl">
          <p>{currTask.description}</p>
        </div>
      </div>
    </section>
  );
};

export default List;
