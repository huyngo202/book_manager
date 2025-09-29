import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.log("loi get all tasks")
        res.status(500).json({ message: "loi he thong" });
    }
};

export const createTasks = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "ten cong viec khong duoc de trong" });
        }
        const newTask = new Task({ title });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.log("loi create tasks")
        res.status(500).json({ message: "loi he thong" });
    }
};

export const updateTasks = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, status, completedAt },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "khong tim thay cong viec" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log("loi update tasks")
        res.status(500).json({ message: "loi he thong" });
    }
};

export const deleteTasks = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "khong tim thay cong viec" });
        }
        res.status(200).json({ message: "xoa cong viec thanh cong" });
    } catch (error) {
        console.log("loi delete tasks")
        res.status(500).json({ message: "loi he thong" });
    }
};