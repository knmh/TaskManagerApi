import dotenv from 'dotenv'
dotenv.config()

function required(name: string): string {
    const value = process.env[name]
    if (!value) throw new Error(`Missing env var: ${name}`)
    return value
}

export const env = {
    PORT: Number(process.env.PORT ?? 3000),
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    
    DB: {
        HOST: process.env.DB_HOST ?? 'localhost',
        PORT: Number(process.env.DB_PORT ?? 5432),
        USER: process.env.DB_USER ?? 'postgres',
        PASSWORD: process.env.DB_PASSWORD ?? '365365',
        NAME: process.env.DB_NAME ?? 'taskmanager',
    },
    
    JWT: {
        SECRET: required('JWT_SECRET'),
        EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
    }
}