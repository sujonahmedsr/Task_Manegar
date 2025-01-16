import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/utils/globalErrorHandling'
import authRoute from './app/modules/authentications/authRoute'
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// all Routes 
app.use('/api/auth', authRoute)



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