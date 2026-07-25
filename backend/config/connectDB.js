
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const connectionDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Mongo Connected");
    })
    .catch((e)=>{
        console.log("Failed to connect : ",e);
    })
}

export default connectionDB;