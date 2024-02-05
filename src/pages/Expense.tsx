import { useEffect, useState } from "react";
import { ExpenseType, PaymentType, TExpense } from "../types";
import {
  deleteDocument,
  deleteExpenseFields,
  getDocument,
  mapExpenseDocument,
} from "../services";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateExpense } from "../components/UpdateExpense";

export const Expense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    expensePaymentType: PaymentType.None,
    expenseDate: new Date(),
    expenseVendor: "",
    expenseDescription: "",
    expenseProjectId: "",
    imageUrl: "",
    notes: []
  });

  useEffect(() => {
    getDocument<TExpense>("expenses", params, mapExpenseDocument, setExpense);
  });

  return (
    <div className="flex flex-col">
      <p>{expense.expenseDate.toDateString()}</p>
      <p>{expense.expenseVendor}</p>
      <p>{expense.expenseAmount}</p>
      <p>{expense.expensePaymentType}</p>
      <p>{expense.expenseDescription}</p>
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
      {expense.expenseType !== ExpenseType.None && (
        <UpdateExpense
          params={params}
          model={expense}
          setFunction={setExpense}
        />
      )}
    </div>
  );
};
