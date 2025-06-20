import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';

import userRoute from './routes/UserRoute.js';
import booksRoute from './routes/BooksRoute.js';

import connectCloudinary from './database/cloudinary.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB();
connectCloudinary();

app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/books', booksRoute);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})