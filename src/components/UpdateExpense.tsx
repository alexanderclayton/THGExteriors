import { useState } from "react";
import { TExpense, IUpdateModelProps } from "../types";
import { ExpenseForm } from "./ExpenseForm";

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
    imageUrl: model.imageUrl,
  });

  return (
    <ExpenseForm
      legend="Update Expense"
      model={updatedExpense}
      setState={setUpdatedExpense}
      submit="update!"
      params={params}
      update={update}
      setUpdate={setUpdate}
      setUpdatedState={setFunction}
      formType="update"
    />
  );
};
