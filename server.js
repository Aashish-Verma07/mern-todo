import express from 'express'
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
// configure dotenv
dotenv.config()   //use path if your dotenv file is not in the root folder

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/todo',todoRoutes)


// rest api 
app.get('/',(req,res)=>{
    res.send('Hello from server')
});

// PORT

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`.bgBlue.white);
    
})