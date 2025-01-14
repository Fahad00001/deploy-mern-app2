import React from "react";

function ExpensesTable({ expenses,handleDeleteexpense }) {
  console.log("expensestabskdmxlsle", expenses);

  return (
    <div>
      {expenses?.map((expense, index) => (
        <div key={index} className="expense-item">
          <button className="delete-button" onClick={()=>handleDeleteexpense(expense._id)}>x</button>
          <div className="expense-description">{expense.text}</div>
          <div className="exprense-amount"
          style={{
            color:expense.amount>0?"#27ae60":"#e74c3c"
          }}
          >
            
            {expense.amount}</div>
        </div>
      ))}
    </div>
  );
}

export default ExpensesTable;
