import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "DONE"
export type Priority = "LOW" | "MEDIUM" | "HIGH"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    description: string

    @Column({ type: "text", default: "PENDING" })
    status: TaskStatus

    @Column({ type: "text", default: "MEDIUM" })
    priority: Priority

    @Column({ type: "timestamp", nullable: true })
    dueDate: Date

    @ManyToOne(() => User, user => user.tasks)
    user: User

    @Column()
    userId: number

    @OneToMany(() => Comment, comment => comment.task)
    comments: Comment[]
}