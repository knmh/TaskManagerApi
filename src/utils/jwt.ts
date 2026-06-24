import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export const generateToken = (userId: number): string => {
    const secret = env.JWT.SECRET
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables')
    }

    return jwt.sign(
        { id: userId },
        secret,
        { expiresIn: env.JWT.EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    )
}

export const verifyToken = (token: string): { id: number } => {
    const secret = env.JWT.SECRET
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables')
    }

    try {
        return jwt.verify(token, secret) as { id: number }
    } catch (error) {
        throw new Error('Invalid or expired token')
    }
}