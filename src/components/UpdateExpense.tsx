import { useState } from "react";
import { TExpense, IUpdateModelProps } from "../types";
import { ExpenseForm } from "./ExpenseForm";
import { mapExpenseDocument, updateDocument } from "../services";

export const UpdateExpense = ({
  params,
  model,
  setFunction,
  setUpdate,
  update,
}: IUpdateModelProps<TExpense>) => {
  const [updatedExpense, setUpdatedExpense] = useState<TExpense>({
    expenseType: model.expenseType,
    expenseAmount: model.expenseAmount,
    paymentType: model.paymentType,
    expenseDate: model.expenseDate,
    vendor: model.vendor,
    description: model.description,
    projectId: model.projectId,
  });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDocument<TExpense>(
      "expenses",
      params,
      updatedExpense,
      mapExpenseDocument,
      setFunction,
      setUpdate,
      update,
    );
  };
  return (
    <ExpenseForm
      legend="Update Expense"
      setState={setUpdatedExpense}
      formSubmit={formSubmit}
      model={updatedExpense}
      submit="update!"
    />
  );
};
