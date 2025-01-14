import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleError } from '../utils'
// import { ToastContainer } from 'react-toastify'

function ExpenseTracker({addexpenses}) {
    const [expenseinfo,setExpenseInfo]=useState({text:'',amount:''})
    const handleChange=(e)=>{
        const {name,value}=e.target
        console.log (name,value)
        const copyExpenseInfo={...expenseinfo}
        copyExpenseInfo[name]=value
        setExpenseInfo(copyExpenseInfo)


    }

    const handleExpenses=(e)=>{
        e.preventDefault()
        console.log(expenseinfo)
        const {text,amount}=expenseinfo
        if(!text||!amount){
            handleError('All fields are required')
            return
        }
        setTimeout(() => {
            setExpenseInfo({text:'',amount:''})
        }, 1000);
       
        addexpenses(expenseinfo)

    }

  return (
    <div className='container'>
    <h1>Expense Tracker</h1>
<form onSubmit={handleExpenses}>

    <div>
        <label htmlFor='desc'>Expense description</label>
       
        <input type='text' onChange={handleChange} name='text' value={expenseinfo.text} autoFocus placeholder='Enter your expense description'/>
    </div> 
    <div>
        <label htmlFor='amount'>Expenses</label>
       
        <input type='number' onChange={handleChange} name='amount' value={expenseinfo.amount}  placeholder='enter your amount, expenses(-ve) Income(+ve)'/>
    </div> 
   
    <button>Add Expense</button>
   
</form>
{/* <ToastContainer/> */}
</div>
  )
}

export default ExpenseTracker