//import//
import { useEffect, useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseType, PaymentType, TExpense } from "../types";
import { getDocuments, mapExpenseDocument } from "../services";
import { useNavigate } from "react-router-dom";

export const AllExpenses = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    paymentType: PaymentType.None,
    expenseDate: new Date(),
    vendor: "",
    description: "",
    projectId: "",
  });
  const [allExpenses, setAllExpenses] = useState<TExpense[]>([]);

  useEffect(() => {
    getDocuments<TExpense>("expenses", mapExpenseDocument, setAllExpenses);
  }, []);

  return (
    <div>
      <ExpenseForm
        legend="Add Expense"
        model={expense}
        setState={setExpense}
        setAllState={setAllExpenses}
        submit="Add Expense!"
      />
      {allExpenses.map((expense) => (
        <div key={expense.id} className="flex">
          <p>{expense.expenseDate.toDateString()}</p>
          <p>{expense.vendor}</p>
          <p>{expense.expenseAmount}</p>
          <p>{expense.expenseType}</p>
          <p>{expense.description}</p>
          <button onClick={() => navigate(`/expense/${expense.id}`)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};
