import { RequestHandler } from "express"
import { taskServices } from "./taskSerivices"
import httpStatus from 'http-status-codes'
import catchAsync from "../../utils/catchAsync"

const taskCreate: RequestHandler = catchAsync(async (req, res) => {
    const result = await taskServices.taskCreateIntoDb(req.body)
    res.send({
        status: httpStatus.CREATED,
        success: true,
        message: 'Task created Successfully!',
        data: result
    })
})
export const taskController = {
    taskCreate
}