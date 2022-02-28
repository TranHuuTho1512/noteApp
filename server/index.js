const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@noteapp.p3t2h.mongodb.net/noteApp?retryWrites=true&w=majority`, {
            // makinguseCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter);


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
