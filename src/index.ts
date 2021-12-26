import express, { Request, Response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});
connection.connect();

const budgetsRoute = require('./routes/Budgets');
app.use('/budget', budgetsRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Moolah API is Running! 👍');
    console.log(`Sender is listening on port ${port}`)
});

export {connection};