export interface taskInterface {
    title: string,
    description: string,
    dueDate: Date,
    status: "active" | "inActive",
    priority: 'low' | 'medium' | 'high',
    isCompleted: boolean,
    user: string
}