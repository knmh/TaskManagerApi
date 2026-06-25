import express, { Application, Request, Response } from "express"
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import tasksRoutes from './routes/tasks.routes'


const app: Application = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

app.use('/api/v1/tasks', tasksRoutes)
// Health check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// app.use(express.json())     old
// app.use(express.urlencoded({ extended: true }))     old

app.use(notFound)
app.use(errorHandler)



export default app