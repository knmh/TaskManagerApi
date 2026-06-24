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
                throw new AppError('Please login first', 401)
            }

            const user = await userRepository.findOne({
                where: { id: req.user.id }
            })

            if (!user) {
                throw new AppError('User not found', 404)
            }

            if (!roles.includes(user.role)) {
                throw new AppError('You do not have permission', 403)
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}