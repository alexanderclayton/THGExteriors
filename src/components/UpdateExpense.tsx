import { useState } from "react";
import { TExpense, IUpdateExpenseProps } from "../types";
import { ExpenseForm } from "./ExpenseForm";
import { mapExpenseDocument, updateDocument } from "../services";
import { setExpenseData } from "../helpers";

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
      setExpenseData,
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
