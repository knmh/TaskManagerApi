import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service'
import { catchAsync } from '../utils/catchAsync'

const authService = new AuthService()

export const authController = {
    
    signup: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body

        
        if (!username || !email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide username, email and password'
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                status: 'fail',
                message: 'Password must be at least 6 characters'
            })
        }

        const { user, token } = await authService.signup({ username, email, password })

        res.status(201).json({
            status: 'success',
            token,
            data: { user }
        })
    }),

    
    login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            })
        }

        const { user, token } = await authService.login(email, password)

        res.status(200).json({
            status: 'success',
            token,
            data: { user }
        })
    })
}