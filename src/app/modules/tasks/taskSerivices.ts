/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/AppError"
import { taskInterface } from "./taskInterface"
import { taskModel } from "./taskSchemaModel"

const taskCreateIntoDb = async(body: taskInterface) => {
    const result = await taskModel.create(body)
    return result
}
const getAllTaskFromDb = async (email: string) => {
    const result = await taskModel.find({user: email})
    return result
}
const getSignleTaskFromDb = async (id: string) => {
    const task = await taskModel.findById(id)
    if(!task){
        throw new AppError(StatusCodes.NOT_FOUND, "This task is not found")
    }
    const result = await taskModel.findById(id)
    return result
}
const updateSignleTaskFromDb = async (id: string, body: any) => {
    const task = await taskModel.findById(id)
    if(!task){
        throw new AppError(StatusCodes.NOT_FOUND, "This task is not found")
    }
    const result = await taskModel.findByIdAndUpdate(id, body, {new: true})
    return result
}
const deleteSignleTaskFromDb = async (id: string) => {
    const task = await taskModel.findById(id)
    if(!task){
        throw new AppError(StatusCodes.NOT_FOUND,"This task is not found")
    }
    const result = await taskModel.findByIdAndDelete(id)
    return result
}
export const taskServices = {
    taskCreateIntoDb,
    getAllTaskFromDb,
    getSignleTaskFromDb,
    updateSignleTaskFromDb,
    deleteSignleTaskFromDb
}