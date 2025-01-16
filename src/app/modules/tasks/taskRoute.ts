import { Router } from "express";
import { taskController } from "./taskController";
import validateRequest from "../../utils/validRequest";
import { taskValidation } from "./taskValidation";
import { Auth } from "../../utils/auth";

const taskRoute = Router()

taskRoute.post('/create-task', Auth(), validateRequest(taskValidation), taskController.taskCreate)
taskRoute.get('/tasks', Auth(), taskController.getAllTask)
taskRoute.get('/tasks/:id', Auth(), taskController.getSingleTask)
taskRoute.patch('/tasks/:id', Auth(), taskController.updateSingleTask)
taskRoute.delete('/tasks/:id', Auth(), taskController.deleteSingleTask)

export default taskRoute