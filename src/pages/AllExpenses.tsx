//import//
import { useEffect, useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseType, PaymentType, TExpense } from "../types";
import { addDocument, getDocuments, mapExpenseDocument } from "../services";
import { useNavigate } from "react-router-dom";
import { resetExpense } from "../helpers/setterFunctions";

export const AllExpenses = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    paymentType: PaymentType.None,
    expenseDate: new Date(),
    vendor: "",
    description: "",
  });
  const [allExpenses, setAllExpenses] = useState<TExpense[]>([]);

  const setAllExpensesDocs = (data: TExpense[]) => {
    setAllExpenses(data);
  };

  useEffect(() => {
    getDocuments<TExpense>("expenses", mapExpenseDocument, setAllExpenses);
  }, []);

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument<TExpense>(
      "expenses",
      expense,
      () => resetExpense(setExpense),
      () => getDocuments("expenses", mapExpenseDocument, setAllExpensesDocs),
    );
  };

  return (
    <div>
      <ExpenseForm
        legend="Add Expense"
        setState={setExpense}
        formSubmit={formSubmit}
        expense={expense}
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
