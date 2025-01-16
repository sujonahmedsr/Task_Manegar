import { taskInterface } from "./taskInterface"
import { taskModel } from "./taskSchemaModel"

const taskCreateIntoDb = async(body: taskInterface) => {
    const result = await taskModel.create(body)
    return result
}
export const taskServices = {
    taskCreateIntoDb
}