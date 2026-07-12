import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { AppError } from '../middleware/errorHandler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export class AuthService {
    private userRepository = AppDataSource.getRepository(User)

    async signup(userData: {
        username: string
        email: string
        password: string
    }): Promise<{ user: User; token: string }> {
        const existingUser = await this.userRepository.findOne({
            where: [{ email: userData.email }, { username: userData.username }]
        })

        if (existingUser) {
            throw new AppError('User already exists with this email or username', 400)
        }

        const hashedPassword = await bcrypt.hash(userData.password, 12)
        const user = this.userRepository.create({
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        })

        await this.userRepository.save(user)
        const token = this.generateToken(user.id)

        const { password, ...userWithoutPassword } = user
        return { user: userWithoutPassword as User, token }
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findOne({
            where: { email }
        })

        if (!user) {
            throw new AppError('Invalid email or password', 401)
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401)
        }

        const token = this.generateToken(user.id)
        const { password: _, ...userWithoutPassword } = user
        return { user: userWithoutPassword as User, token }
    }

    private generateToken(userId: number): string {
        const jwtSecret = process.env.JWT_ACCESS_SECRET
        if (!jwtSecret) {
            throw new Error('JWT_ACCESS_SECRET is not defined in environment variables')
        }

        return jwt.sign(
            { id: userId },
            jwtSecret,
            { expiresIn: '15m' as jwt.SignOptions['expiresIn'] }
        )
    }

    verifyToken(token: string): { id: number } {
        const jwtSecret = process.env.JWT_ACCESS_SECRET
        if (!jwtSecret) {
            throw new Error('JWT_ACCESS_SECRET is not defined in environment variables')
        }

        try {
            const decoded = jwt.verify(token, jwtSecret) as { id: number }
            return decoded
        } catch (error) {
            throw new AppError('Invalid or expired token', 401)
        }
    }
}