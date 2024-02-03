//import//
import { useEffect, useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseType, PaymentType, TExpense } from "../types";
import { getDocuments, mapExpenseDocument } from "../services";
import { Table } from "../components/Table";
import { expenseTable } from "../helpers";

export const AllExpenses = () => {
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    expensePaymentType: PaymentType.None,
    expenseDate: new Date(),
    expenseVendor: "",
    expenseDescription: "",
    expenseProjectId: "",
    imageUrl: "",
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
      <Table
        header={expenseTable}
        model={allExpenses}
        setModel={setAllExpenses}
        navigateUrl="expense"
      />
    </div>
  );
};
