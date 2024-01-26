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
    expensePaymentType: model.expensePaymentType,
    expenseDate: model.expenseDate,
    expenseVendor: model.expenseVendor,
    expenseDescription: model.expenseDescription,
    expenseProjectId: model.expenseProjectId,
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
