import { Router } from "express";
import { taskController } from "./taskController";
import validateRequest from "../../utils/validRequest";
import { taskValidation } from "./taskValidation";
import { Auth } from "../../utils/auth";

const taskRoute = Router()

taskRoute.post('/create-task', Auth(), validateRequest(taskValidation), taskController.taskCreate)

export default taskRoute