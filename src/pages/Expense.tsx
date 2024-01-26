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
    paymentType: PaymentType.None,
    expenseDate: new Date(),
    vendor: "",
    description: "",
    projectId: "",
    imageUrl: "",
  });

  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    getDocument<TExpense>("expenses", params, mapExpenseDocument, setExpense);
  });

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
        <UpdateExpense
          params={params}
          model={expense}
          setFunction={setExpense}
          setUpdate={setUpdate}
          update={update}
        />
      )}
    </div>
  );
};
