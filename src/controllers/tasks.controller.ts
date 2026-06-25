import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types'
import { TasksService } from '../services/tasks.service'
import { catchAsync } from '../utils/catchAsync'

const tasksService = new TasksService()

export const tasksController = {
    getAll: catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
        const userId = req.user!.id
        const tasks = await tasksService.findAll(userId)

        res.status(200).json({
            status: 'success',
            results: tasks.length,
            data: { tasks }
        })
    }),

    getOne: catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
        const userId = req.user!.id
        const task = await tasksService.findById(Number(req.params.id), userId)

        res.status(200).json({
            status: 'success',
            data: { task }
        })
    }),

    create: catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
        const userId = req.user!.id
        const task = await tasksService.create(req.body, userId)

        res.status(201).json({
            status: 'success',
            data: { task }
        })
    }),

    update: catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
        const userId = req.user!.id
        const task = await tasksService.update(Number(req.params.id), req.body, userId)

        res.status(200).json({
            status: 'success',
            data: { task }
        })
    }),

    delete: catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
        const userId = req.user!.id
        await tasksService.delete(Number(req.params.id), userId)

        res.status(204).json({
            status: 'success',
            data: null
        })
    })
}