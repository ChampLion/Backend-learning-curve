import { connectDB } from "./db/index.js";
import { DB_NAME } from "./constants.js";
import dotenv from 'dotenv'
import { app } from "./app.js";

dotenv.config({
  path: './env'
})

connectDB().then(()=> {
  app.listen(process.env.PORT)
  console.log(`running on port ${process.env.PORT}`);
  
}).catch((err)=> {
  console.log("Connection Failed", err);
  })
