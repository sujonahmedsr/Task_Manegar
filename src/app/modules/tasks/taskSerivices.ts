/* eslint-disable @typescript-eslint/no-explicit-any */
import { taskInterface } from "./taskInterface"
import { taskModel } from "./taskSchemaModel"

const taskCreateIntoDb = async(body: taskInterface) => {
    const result = await taskModel.create(body)
    return result
}
const getAllTaskFromDb = async () => {
    const result = await taskModel.find()
    return result
}
const getSignleTaskFromDb = async (id: string) => {
    const result = await taskModel.findById(id)
    return result
}
const updateSignleTaskFromDb = async (id: string, body: any) => {
    const result = await taskModel.findByIdAndUpdate(id, body, {new: true})
    return result
}
const deleteSignleTaskFromDb = async (id: string) => {
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