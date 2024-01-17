import React, { useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { IUpdateExpenseProps, TExpense } from "../types";
import { mapExpenseDocument, updateDocument } from "../services";

export const UpdateExpense: React.FC<IUpdateExpenseProps> = ({
  params,
  expense,
  setExpense,
  setUpdate,
  update,
}) => {
  const [updatedExpense, setUpdatedExpense] = useState<TExpense>({
    expenseType: expense.expenseType,
    expenseAmount: expense.expenseAmount,
    paymentType: expense.paymentType,
    expenseDate: expense.expenseDate,
    vendor: expense.vendor,
    description: expense.description,
    projectId: expense.projectId,
  });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDocument<TExpense>(
      "expenses",
      params,
      updatedExpense,
      mapExpenseDocument,
      setExpense,
      setUpdate,
      update,
    );
  };
  return (
    <ExpenseForm
      legend="Update Expense"
      setState={setUpdatedExpense}
      formSubmit={formSubmit}
      expense={updatedExpense}
      submit="update!"
    />
  );
};
