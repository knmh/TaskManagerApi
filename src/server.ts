import 'dotenv/config'
import "reflect-metadata"
import { AppDataSource } from "./data-source"
import app from "./app"

const PORT = process.env.PORT || 3000


AppDataSource.initialize()
    .then(() => {
        console.log("✅ Database connected successfully")
        
        
        app.listen(PORT, () => {
           
            console.log(`🚀 Server running on http://localhost:${PORT}`)
            console.log(`📁 Health check: http://localhost:${PORT}/health`)
        })
    })
    .catch((error) => {
        console.error("❌ Database connection failed:", error)
    })