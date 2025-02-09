import mongoose from  'mongoose'


const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to Database ${connect.connection.host}`.bgGreen.white);
        
    } catch (error) {
        console.log(`Error connecting to DB ${error}`.bgRed.white);
        
    }
}


export default connectDB;