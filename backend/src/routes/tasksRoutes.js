import express, { Router } from 'express';
import { getAllTasks, createTasks, updateTasks, deleteTasks } from '../controllers/tasksControllers.js';

const router = express.Router();

export default router;

router.get("/", getAllTasks);

router.post("/", createTasks);

router.put("/:id", updateTasks);

router.delete("/:id", deleteTasks);