import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types'
<<<<<<< HEAD
=======

>>>>>>> feature/user-crud
import { AuthService } from '../services/auth.service'
import { AppError } from './errorHandler'

const authService = new AuthService()

export const requiredAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
<<<<<<< HEAD
            throw new AppError('You are not logged in', 401)
=======
            throw new AppError('شما وارد نشده اید', 401)
>>>>>>> feature/user-crud
        }

        const decoded = authService.verifyToken(token)
        req.user = { id: decoded.id }

        next()
    } catch (error) {
        next(error)
    }
}