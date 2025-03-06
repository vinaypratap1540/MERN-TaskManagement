import { Task } from "../models/task.model.js";

export const createTasks = async(req,res)=>{
   try {
    const {title,description,dueDate} = req.body;
    if(!title || !description || !dueDate){
     return res.status(400).json({
         success:false,
         message:"All Fields are required"
     })
    }
    const task = await Task.create({
     title,
     description,
     dueDate,
     creator: req.id
     })
     return res.status(201).json({
         task,
         message:"Task is created successfully"
     })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:"Failed to create task"
    })
   }
}

export const getCreatedTask = async(req,res)=>{
    try {
        const userId = req.id;
        const tasks = await Task.find({creator:userId})
        if(tasks.length === 0){
            return res.status(400).json({
                success:false,
                tasks:[],
                message:"tasks not found"
            })
        }
        return res.status(201).json({
            success:true,
            tasks,
            message:"Tasks found successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch task"
        })
    }
}
export const updateTaskCompletion = async(req,res)=>{
    try {
        const {taskId} = req.params
        const task = await Task.findById(taskId)
        if(!task){
          return res.status(404).json({
                success: false,
                message: "Task not found",
             });
        }
        task.complete=!task.complete;
        await task.save()
        return res.status(200).json({
            success: true,
            task,
            message: `Task marked as ${task.complete ? "Completed" : "Incomplete"}`,
         });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to update task",
         });
    }
}

export const deleteTaskById = async(req,res)=>{
   try {
    const {taskId} = req.params;
    const task = await Task.findById(taskId);
    if(!task){
     return res.status(404).json({
         success: false,
         message: "Task not found",
     });
    }
    if (!task.complete) {
     return res.status(400).json({
         success: false,
         message: "Cannot delete an incomplete task",
     });
    }
    await Task.findByIdAndDelete(task)
    return res.status(200).json({
     success: true,
     message: "Task deleted successfully",
    });
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        success: false,
        message: "Failed to Delete task",
     });
   }
}