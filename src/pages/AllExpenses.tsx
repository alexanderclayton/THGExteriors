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
  const [toggleAdd, setToggleAdd] = useState(false);

  useEffect(() => {
    getDocuments<TExpense>("expenses", mapExpenseDocument, setAllExpenses);
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">All Expenses</h1>
      <div className="w-[80%]">
        <Table
          header={expenseTable}
          model={allExpenses}
          setModel={setAllExpenses}
          navigateUrl="expense"
        />
      </div>
      {!toggleAdd && (
        <button onClick={() => setToggleAdd(!toggleAdd)}>Add Expense</button>
      )}
      {toggleAdd && (
        <ExpenseForm
          legend="Add Expense"
          model={expense}
          setState={setExpense}
          setAllState={setAllExpenses}
          submit="Add Expense!"
          toggle={toggleAdd}
          setToggle={setToggleAdd}
        />
      )}
    </div>
  );
};
