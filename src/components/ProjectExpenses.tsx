// import //

import { LuPlusCircle } from "react-icons/lu";
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
      <div className="mb-4 flex items-center">
        <p className="mb-2 text-2xl font-semibold text-gray-800">Expenses</p>
        {!toggle && (
          <LuPlusCircle
            size={25}
            onClick={() => setToggle(!toggle)}
            className="ml-4 text-green-600 duration-300 hover:scale-125 hover:cursor-pointer"
          />
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
