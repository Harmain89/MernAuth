import express from "express";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

const allowedOrigins = [
    'http://localhost:5173'
]

app.use(cors({credentials: true, origin: allowedOrigins}))

// API Endpoint
app.get('/', (req, res) => {
    res.json({message: "API is working here...."})
})
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

connectDB().then(() => {
    
    app.listen(port, () => {
        console.log(`Server is runnning at port no ${port}`);
    })

    app.on("error", (error) => {
        console.log("ERRR: ", error);
        throw error;
    })

})
.catch((err) => {
    console.log("Mongo db connection failed: ", err);
})