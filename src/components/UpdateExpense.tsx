import { useState } from "react";
import { TExpense, IUpdateModelProps } from "../types";
import { ExpenseForm } from "./ExpenseForm";
import { HiOutlinePaintBrush } from "react-icons/hi2";

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
        <HiOutlinePaintBrush
          size={25}
          onClick={() => setToggleUpdate(!toggleUpdate)}
          className="cursor-pointer duration-300 hover:scale-125"
        />
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
