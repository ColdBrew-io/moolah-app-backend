import express, { Request, Response } from 'express';
const router = express.Router();
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

// single post (from summary page for now)
router.post('/', (req: Request, res: Response) => {
    const budgetType = req.body.budget_type;
    const budgetAmount = req.body.budget_amount;
    const savingGoal = req.body.saving_goal;
    const repeatBudget = req.body.repeat_budget;

    let insertQuery = `INSERT INTO budgets (budget_type, budget_amount, saving_goal, repeat_budget) `;
    insertQuery += `VALUES ("${budgetType}", ${budgetAmount}, ${savingGoal}, ${repeatBudget})`;

    console.log(insertQuery)
    connection.query(insertQuery, (err, result) => {
        console.log(result);
        console.log("err", err);
        res.send(result);
    });
});

module.exports = router