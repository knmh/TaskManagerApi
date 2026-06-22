import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Task } from "./entities/Task"
import { Comment } from "./entities/Comment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "365365",
    database: "taskmanager",
    synchronize: false,
    logging: true,
    entities: [User, Task, Comment],
    migrations: ["src/migrations/*.ts"],  
})