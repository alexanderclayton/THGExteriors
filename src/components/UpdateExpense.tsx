import { useState } from "react";
import { TExpense, IUpdateModelProps } from "../types";
import { ExpenseForm } from "./ExpenseForm";

export const UpdateExpense = ({
  params,
  model,
  setFunction,
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
    notes: model.notes,
  });
  const [toggleUpdate, setToggleUpdate] = useState(false);

  return (
    <div>
      {!toggleUpdate && (
        <button onClick={() => setToggleUpdate(!toggleUpdate)}>Update</button>
      )}
      {toggleUpdate && (
        <ExpenseForm
          legend="Update Expense"
          model={updatedExpense}
          setState={setUpdatedExpense}
          submit="update!"
          toggle={toggleUpdate}
          setToggle={setToggleUpdate}
          params={params}
          setUpdatedState={setFunction}
          formType="update"
        />
      )}
    </div>
  );
};
