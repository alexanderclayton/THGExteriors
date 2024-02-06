// import //

import { TExpense } from "../types";
import { IModelDependentsProps } from "./ClientProjects";
import { ExpenseCard } from "./ExpenseCard";
import { ExpenseForm } from "./ExpenseForm";

export const ProjectExpenses = ({
  model,
  setModel,
  setAllModel,
  cardModel,
  params,
  toggle,
  setToggle,
}: IModelDependentsProps<TExpense>) => {
  return (
    <div className="mr-4 flex w-1/2 flex-col">
      <div className="mb-4">
        <p className="mb-2 text-2xl font-semibold text-gray-800">Expenses:</p>
        {!toggle && (
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => setToggle(!toggle)}
          >
            Add Expense
          </button>
        )}
        {toggle && (
          <ExpenseForm
            legend="Add Expense"
            model={model}
            setState={setModel}
            setAllState={setAllModel}
            submit="Add Expense!"
            toggle={toggle}
            setToggle={setToggle}
            params={params}
          />
        )}
      </div>
      <ExpenseCard model={cardModel} />
    </div>
  );
};
