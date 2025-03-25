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

const getAllTask: RequestHandler = catchAsync(async (req, res) => {
    const {email} = req.user
    const { priority = "all" } = req.query
    const result = await taskServices.getAllTaskFromDb(email, priority as string)
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'All task retrive Successfully!',
        data: result
    })
})

const getSingleTask: RequestHandler = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await taskServices.getSignleTaskFromDb(id)
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'Single task retrive Successfully!',
        data: result
    })
})

const updateSingleTask: RequestHandler = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await taskServices.updateSignleTaskFromDb(id, req.body)
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'Task updated Successfully!',
        data: result
    })
})

const deleteSingleTask: RequestHandler = catchAsync(async (req, res) => {
    const {id} = req.params
    await taskServices.deleteSignleTaskFromDb(id)
    res.send({
        status: httpStatus.OK,
        success: true,
        message: 'Task deleted Successfully!',
        data: []
    })
})

export const taskController = {
    taskCreate,
    getAllTask,
    getSingleTask,
    updateSingleTask,
    deleteSingleTask
}