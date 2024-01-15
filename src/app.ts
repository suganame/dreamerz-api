import "dotenv/config"
const cors = require("cors")
import express from "express"
import db from "./configs/mongo.config"
import publicRoutes from "./routes/public.routes"
import privateRoutes from "./routes/private.routes"

const app = express()

app.use(express.json())
    .use(
        cors({
            credentials: true,
            origin: `http://localhost:${process.env.API_PORT}`,
        })
    )
    .use(express.static("public"))
    .use("/", publicRoutes)
    .use("/dashboard/", privateRoutes)
    .listen(process.env.API_PORT, async () => {
        await db()
    })

export default app
