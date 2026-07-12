import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { AppError } from '../middleware/errorHandler'

export class UserService {
    private userRepository = AppDataSource.getRepository(User)

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new AppError('User not found', 404)
        return user
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData)
        return await this.userRepository.save(user)
    }

    async update(id: number, userData: Partial<User>): Promise<User> {
        await this.findById(id)
        await this.userRepository.update(id, userData)
        return await this.findById(id)
    }

    async delete(id: number): Promise<void> {
        await this.findById(id)
        await this.userRepository.delete(id)
    }
}