import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import ExpensesTable from "./ExpensesTable";
import ExpenseTracker from "./ExpenseTracker";
import ExpenseDetails from "./ExpenseDetails";

function Home() {
  const [loggedInUser, setLoggeDInUser] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseAmt,setExpenseAmt]=useState(0)
  const [incomeAmt,setIncomeAmt]=useState(0)


  const navigate = useNavigate();
  useEffect(() => {
    setLoggeDInUser(localStorage.getItem("loggedInUser"));
  }, []);

  useEffect(()=>{
    const amounts=expenses.map((item)=>item.amount)
    console.log(amounts)
    const income = amounts
    .map(item => Number(item)) // Convert all strings to numbers
    .filter(item => item > 0) // Keep only positive numbers
    .reduce((acc, item) => acc + item, 0); // Sum them up
  
  console.log("income:", income);
  setIncomeAmt(income)
   

  const expense = amounts
  .map(item => Number(item)) // Convert all strings to numbers
  .filter(item => item < 0) // Keep only positive numbers
  .reduce((acc, item) => acc + item, 0)*-1; // Sum them up

console.log("expense:", expense);
setExpenseAmt(expense)
  
    
  },[expenses])

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("user logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchExpenses = async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          'Authorization': localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers);
      if (response === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log(result.data||[]);
      setExpenses(result.data);
    } catch (error) {
      handleError(error);
    }
  };
  const addExpenses = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          'Authorization': localStorage.getItem("token"),
          'Content-Type':'application/json'
        },
        method:'Post',
        body:JSON.stringify(data)
      };

      const response = await fetch(url, headers);
      if (response === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log(result.data||[]);
      setExpenses(result.data);
      handleSuccess(result.message)
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  },[]);

  const handleDeleteexpense=async(expenseId)=>{
    try {
      const url = `${APIUrl}/expenses/${expenseId}`;
      const headers = {
        headers: {
          'Authorization': localStorage.getItem("token"),
          'Content-Type':'application/json'
        },
        method:'Delete',
        // body:JSON.stringify(data)
      };

      const response = await fetch(url, headers);
      if (response === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log(result.data||[]);
      setExpenses(result.data);
      handleSuccess(result.message)
    } catch (error) {
      handleError(error);
    }

  }

  return (
    <div>
    <div className="user-section">
    <h1>welcome {loggedInUser}</h1>
    <button onClick={handleLogout}>Logout</button>
    </div>
    <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt}/>
    <ExpenseTracker addexpenses={addExpenses}/>
          <ExpensesTable expenses={expenses} handleDeleteexpense={handleDeleteexpense}/>
         <ToastContainer />
    </div>
  );
}

export default Home;





