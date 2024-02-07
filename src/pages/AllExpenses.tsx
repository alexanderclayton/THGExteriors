//import//
import { useEffect, useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseType, PaymentType, TExpense } from "../types";
import { getDocuments, mapExpenseDocument } from "../services";
import { Table } from "../components/Table";
import { expenseTable } from "../helpers";
import { SearchFilter } from "../components/SearchFilter";
import { LuPlusCircle } from "react-icons/lu";

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
    notes: [],
  });
  const [allExpenses, setAllExpenses] = useState<TExpense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<TExpense[]>([]);
  const [toggleAdd, setToggleAdd] = useState(false);

  useEffect(() => {
    getDocuments<TExpense>("expenses", mapExpenseDocument, setAllExpenses);
  }, []);

  useEffect(() => {
    if (allExpenses.length > 0) {
      setFilteredExpenses(allExpenses);
    }
  }, [allExpenses]);

  return (
    <div className="mx-auto flex flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">All Expenses</h1>
      <div className="mb-6 flex w-[50%] items-center">
        <SearchFilter
          model={allExpenses}
          placeholder="Search Expense Description"
          setFilteredModel={setFilteredExpenses}
          filterProperty="expenseDescription"
        />
        <LuPlusCircle
          size={25}
          onClick={() => setToggleAdd(!toggleAdd)}
          className="ml-4 text-green-600 duration-300 hover:scale-125 hover:cursor-pointer"
        />
      </div>
      <div className="w-[80%]">
        <Table
          header={expenseTable}
          model={filteredExpenses}
          setModel={setFilteredExpenses}
          navigateUrl="expense"
        />
      </div>
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
