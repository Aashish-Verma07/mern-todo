import todoModel from "../models/todoModel.js";

export const addTodoController = async(req,res)=>{
    const {title,description,completed}=req.body;
   try{
   const newTask = new todoModel({
    title,
    description,
    completed
   })
   await newTask.save();
   res.status(201).send({
    success: true,
    message: "Task created successfully",
    newTask
   })

   }catch(error){
    console.log(error);
    res.status(400).send({
        success: false,
        message: "unable to add task",
        error
    })
   }

}
export const getTodoController = async(req,res)=>{
    try {
        const tasks = await todoModel.find()
        res.status(200).send({
            success: true,
            message: "Tasks retrieved successfully",
            tasks
            })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false, 
            message: "unable to get task",
            error
        })
        
    }
    
}
export const deleteTodoController = async(req,res)=>{
    const {id} = req.body;
    try {
        const task = await todoModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Task deleted successfully",
            task
            })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "unable to delete task",
            error
        })
        
    }
    
}


// update task or mark as completed

export const taskUpdatedController = async(req,res)=>{
    const {id} = req.body;
    try {
        const task = await todoModel.findById(id);

        // validation
        if(!task){
            return res.status(404).send({
                success: false,
                message: "Task not found",
                task
            })
        }
        // Toggle the completed status
        task.completed = !task.completed;

         // Save the updated task
        await task.save();

        res.status(200).send({
            success: true,
            message: "Task marked as completed",
            task
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Unable to mark as completed',
            error 
        })
    }
}

// edit task
export const editTaskController = async(req,res)=>{
    const {title,description,id,completed} =req.body;    
    try {
        const task = await todoModel.findById(id);
        if(!task){
            return res.status(404).send({
                success: false,
                message: "Task not found",
                task
            })
        }
        // Updating the fields that are provided in the request body
        if(title) task.title = title;
        if(description) task.description = description;
        if (completed !== undefined) task.completed = completed;  // If completed is provided, update it

        await task.save();
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
          });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Unable to edit task",
            error
        })
        
    }

}