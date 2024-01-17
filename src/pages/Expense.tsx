import React, { useEffect, useState } from "react";
import { ExpenseType, PaymentType, TExpense } from "../types";
import {
  deleteDocument,
  deleteExpenseFields,
  getDocument,
  mapExpenseDocument,
} from "../services";
import { useNavigate, useParams } from "react-router-dom";
import { ExpenseForm } from "../components/ExpenseForm";

export const Expense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    paymentType: PaymentType.None,
    expenseDate: new Date(),
    vendor: "",
    description: "",
  });

  const [update, setUpdate] = useState<boolean>(false);

  const setExpenseData = (data: TExpense) => {
    setExpense(data);
  };

  useEffect(() => {
    getDocument<TExpense>(
      "expenses",
      params,
      mapExpenseDocument,
      setExpenseData,
    );
  });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("update incoming!");
  };
  return (
    <div className="flex flex-col">
      <p>{expense.expenseDate.toDateString()}</p>
      <p>{expense.vendor}</p>
      <p>{expense.expenseAmount}</p>
      <p>{expense.paymentType}</p>
      <p>{expense.description}</p>
      <button
        onClick={() =>
          deleteDocument(
            "expenses",
            params,
            deleteExpenseFields,
            navigate,
            "/allexpenses",
          )
        }
      >
        Delete
      </button>
      <button onClick={() => setUpdate(!update)}>Update</button>
      {update && (
        <ExpenseForm
          legend="Update Expense"
          setState={setExpense}
          formSubmit={formSubmit}
          expense={expense}
          submit="Update!"
        />
      )}
    </div>
  );
};
