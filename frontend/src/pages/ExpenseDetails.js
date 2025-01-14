import React from 'react'

function ExpenseDetails({incomeAmt,expenseAmt}) {
  return (
    <div>
        <div>
            Your balance is {incomeAmt-expenseAmt}
        </div>
        <div className='amount-container'>
            Income
            <span className='incomeAmt'>{incomeAmt}</span>

            Expense
            <span className='expenseAmt'>{expenseAmt}</span>

        </div>
    </div>
  )
}

export default ExpenseDetails