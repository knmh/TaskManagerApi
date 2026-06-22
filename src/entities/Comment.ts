import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Task } from "./Task"
import { User } from "./User"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    content: string

    @ManyToOne(() => Task, task => task.comments)
    task: Task

    @Column()
    taskId: number

    @ManyToOne(() => User, user => user.comments)
    user: User

    @Column()
    userId: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date
}