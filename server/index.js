import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';
import router from './router/index.js';
import errorMiddleware from './middlewares/error-middleware.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use('/api', router);
//last
app.use(errorMiddleware);

const start = () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
        console.log(process.env.CLIENT_URL);
    } catch (e) {
        console.log(e);
    }
};

start();
