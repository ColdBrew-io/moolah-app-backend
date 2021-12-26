import express, { Request, Response } from 'express';
const router = express.Router();
import mysql from 'mysql';
import { connection } from './../index';

// get all
router.get('/', (req: Request, res: Response) => {
    const query = 'SELECT * FROM budgets';
    console.log(query)
    connection.query(query, (err, rows) => {
        if (err) throw err;

        const retVal = {
            data: rows,
            message: '',
        };
        if (rows.length === 0) {
            retVal.message = 'No records found';
        }
        res.send(rows);
    });
});

module.exports = router