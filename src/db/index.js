import mongoose from "mongoose"
import  { DB_NAME } from "../constants.js"

export const connectDB = async () => {
    try {
     const connectionInstance = 
           await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
           console.log(connectionInstance.connection.readyState)
    } catch (error) {
        console.error('DB connection failed', error)
        process.exit(1)
    }
}