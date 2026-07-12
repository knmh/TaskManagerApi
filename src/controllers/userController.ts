import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/userService'
import { catchAsync } from '../utils/catchAsync'

const userService = new UserService()

export const userController = {
    getAll: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await userService.findAll()
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users }
        })
    }),

    getOne: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.findById(Number(req.params.id))
        res.status(200).json({
            status: 'success',
            data: { user }
        })
    }),

    create: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.create(req.body)
        res.status(201).json({
            status: 'success',
            data: { user }
        })
    }),

    update: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.update(Number(req.params.id), req.body)
        res.status(200).json({
            status: 'success',
            data: { user }
        })
    }),

    delete: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await userService.delete(Number(req.params.id))
        res.status(204).json({
            status: 'success',
            data: null
        })
    })
}