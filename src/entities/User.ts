import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Task } from "./Task"
import { Comment } from "./Comment"

export type UserRole = 'admin' | 'user' | 'moderator'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ 
        type: 'text', 
        default: 'user' 
    })
    role: UserRole

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]
}