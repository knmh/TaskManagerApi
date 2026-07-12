import { AppDataSource } from '../data-source'
import { Task } from '../entities/Task'
import { AppError } from '../middleware/errorHandler'

export class TasksService {
    private taskRepository = AppDataSource.getRepository(Task)

    async findAll(userId: number) {
        return await this.taskRepository.find({
            where: { userId },
            relations: ['comments']
        })
    }

    async findById(id: number, userId: number) {
        const task = await this.taskRepository.findOne({
            where: { id, userId },
            relations: ['comments']
        })

        if (!task) {
            throw new AppError('Task not found', 404)
        }

        return task
    }

    async create(taskData: Partial<Task>, userId: number) {
        const task = this.taskRepository.create({
            ...taskData,
            userId
        })
        return await this.taskRepository.save(task)
    }

    async update(id: number, taskData: Partial<Task>, userId: number) {
        await this.findById(id, userId)
        await this.taskRepository.update(id, taskData)
        return await this.findById(id, userId)
    }

    async delete(id: number, userId: number) {
        const task = await this.findById(id, userId)
        await this.taskRepository.remove(task)
    }
}