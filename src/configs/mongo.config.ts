import mongoose from "mongoose"

async function connect() {
    const env = process.env
    const dbInfo = {
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        cluster: env.DB_CLUSTER,
        database: env.DB_DATABASE,
    }

    
    const dbUri = `mongodb+srv://${dbInfo.user}:${dbInfo.password}@${dbInfo.cluster}.yo1vswf.mongodb.net/${dbInfo.database}?retryWrites=true&w=majority`

    try {
        await mongoose.connect(dbUri)
    } catch (error) {
        console.log(error)
    }
}

export default connect
