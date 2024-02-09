import { useNavigate } from "react-router-dom";
import { deleteExpenseFields } from "../services";
import { ExpenseType, TExpense } from "../types";
import { UpdateExpense } from "./UpdateExpense";
import { IModelInfoProps } from "./ClientInfo";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export const ExpenseInfo = ({
  model,
  setModel,
  params,
}: IModelInfoProps<TExpense, undefined>) => {
  const navigate = useNavigate();
  const [toggleDelete, setToggleDelete] = useState(false);
  return (
    <div className="rounded-md border p-6 shadow-md">
      <div className="mb-2 flex items-center">
        <h2 className="mr-4 text-4xl font-bold text-gray-800">
          Expense Details
        </h2>
        {model.expenseType !== ExpenseType.None && (
          <UpdateExpense params={params} model={model} setFunction={setModel} />
        )}
      </div>
      <div className="mb-4 flex justify-between">
        <div>
          <p className="text-gray-600">Date:</p>
          <p className="font-semibold">
            {model.expenseDate.toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Vendor:</p>
          <p className="font-semibold">{model.expenseVendor}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Amount:</p>
        <p className="font-semibold">${model.expenseAmount.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Payment Type:</p>
        <p className="font-semibold">{model.expensePaymentType}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Description:</p>
        <p className="font-semibold">{model.expenseDescription}</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="inline-block text-red-500 hover:text-red-700"
          onClick={() => setToggleDelete(true)}
        >
          Delete Expense
        </button>
        {toggleDelete && (
          <DeleteModal
            onCancel={() => setToggleDelete(false)}
            documentType="expense"
            confirmationString={model.id as string}
            collectionName="expenses"
            params={params}
            deleteFieldsFunction={deleteExpenseFields}
            navigate={navigate}
            navigateUrl="/allexpenses"
          />
        )}
      </div>
    </div>
  );
};
