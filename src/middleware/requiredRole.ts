import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types'
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { AppError } from './errorHandler'

const userRepository = AppDataSource.getRepository(User)

export const requiredRole = (...roles: string[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user?.id) {
<<<<<<< HEAD
                throw new AppError('Please login first', 401)
=======
                throw new AppError('ابتدا باید وارد شوید', 401)
>>>>>>> feature/user-crud
            }

            const user = await userRepository.findOne({
                where: { id: req.user.id }
            })

            if (!user) {
<<<<<<< HEAD
                throw new AppError('User not found', 404)
            }

            if (!roles.includes(user.role)) {
                throw new AppError('You do not have permission', 403)
=======
                throw new AppError('کاربر یافت نشد', 404)
            }

            if (!roles.includes(user.role)) {
                throw new AppError('شما دسترسی لازم را ندارید', 403)
>>>>>>> feature/user-crud
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}