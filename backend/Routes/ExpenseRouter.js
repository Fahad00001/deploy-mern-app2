const { fetchExpenses, addExpenses, deleteExpenses } = require("../Controllers/ExpenseController");

const router = require("express").Router();


// fetch all the expenes of user based on user id 
router.get('/',fetchExpenses)
router.post('/',addExpenses)
router.delete('/:expenseId',deleteExpenses)

module.exports=router