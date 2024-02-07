import { useEffect, useState } from "react";
import { ExpenseType, PaymentType, TExpense } from "../types";
import { getDocument, mapExpenseDocument } from "../services";
import { useParams } from "react-router-dom";
import { ExpenseInfo } from "../components/ExpenseInfo";

export const Expense = () => {
  const params = useParams();
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    expensePaymentType: PaymentType.None,
    expenseDate: new Date(),
    expenseVendor: "",
    expenseDescription: "",
    expenseProjectId: "",
    imageUrl: "",
    notes: [],
  });

  useEffect(() => {
    getDocument<TExpense>("expenses", params, mapExpenseDocument, setExpense);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow-md">
        <ExpenseInfo model={expense} setModel={setExpense} params={params} />
      </div>
    </div>
  );
};
