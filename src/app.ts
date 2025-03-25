import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/utils/globalErrorHandling'
import authRoute from './app/modules/authentications/authRoute'
import taskRoute from './app/modules/tasks/taskRoute'
const app = express()

// Middlewares
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173', 'https://dotask-gray.vercel.app'], credentials: true }));
app.use(cookieParser())


// all Routes 
app.use('/api/auth', authRoute)
app.use('/api/user', taskRoute)



// for testing is server running 
app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Server Live ⚡',
    })
})


app.use(globalErrorHandler)


// for invalid requesst 
app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
        status: false,
        message: 'Route not found'
    })
})

export default app