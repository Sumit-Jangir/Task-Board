import mongoose from 'mongoose';  
import taskSchema from '../Model/taskSchema.js';
import listSchema from '../Model/listSchema.js';  

export const createTask = async (req, res) => {
    const { name, listId } = req.body;
    try {
        const list = await listSchema.findById(listId);
        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }

        const task = await taskSchema.create({ name, listId });

        res.status(200).json(task);  
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getTasksForList = async (req, res) => {
    const { listId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(listId)) {
            return res.status(400).json({ error: "Invalid listId" });
        }

        const tasks = await taskSchema.find({ listId });

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks." });
    }
};

export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { listId } = req.body;
  
    console.log("jh");
    try {
        
      const task = await taskSchema.findById(taskId);
      task.listId = listId; 
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  