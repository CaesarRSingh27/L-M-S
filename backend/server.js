import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import courseRouter from './routes/courseRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();
const port = 4000;

//MIDDLEWARES
app.use(cors({
    origin: ['https://l-m-s-1-oxk3.onrender.com/', 'https://l-m-s-2.onrender.com', "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use('/uploads', express.static('uploads')); //Serve static files from uploads folder

//DB
connectDB();

//ROUTES
app.use('/api/courses', courseRouter);
app.use('/api/bookings', bookingRouter);

app.get('/favicon.ico', (req, res) => res.status(204).end());

//APP PORT AND LISTEN 
app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});