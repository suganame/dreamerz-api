import "dotenv/config"
import publicRoutes from "../../routes/public.routes"
import privateRoutes from "../../routes/private.routes"
import db from "../../configs/mongo.config"
import express from "express"

let app: any

export const serverStart = () => {
    const mockApp = express()

    mockApp.use(express.json())
    mockApp.use("/", publicRoutes)
    mockApp.use("/dashboard/", privateRoutes)

    app = mockApp.listen(0, async () => {
        await db()
    })

    return app
}

export const serverStop = () => {
    app.close()
}
