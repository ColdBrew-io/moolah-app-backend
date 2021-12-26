import express, { Request, Response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

const budgetsRoute = require('./routes/Budgets');
app.use('/budgets', budgetsRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Moolah API is Running! 👍');
    console.log(`Sender is listening on port ${port}`)
});

export { connection };