import { model, Schema } from "mongoose";
import { taskInterface } from "./taskInterface";

const taskSchema = new Schema<taskInterface>({
    title: {type: String, required: [true, "This field is required"]},
    description: {type: String, required: [true, "This field is required"]},
    dueDate: {type: Date, default: Date.now()},
    status: {
        type: String,
        enum: ["active" , "inActive"],
        default: "active"
    },
    priority: {
        type: String,
        enum: ["low" , "medium", "high"],
    },
    isCompleted: {type: Boolean, default: false},
    user: {type: String, required: [true, "This field is required"]}
}, {
    timestamps: true
})

export const taskModel = model<taskInterface>("Tasks", taskSchema)