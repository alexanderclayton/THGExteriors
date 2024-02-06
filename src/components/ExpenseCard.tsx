import { TExpense } from "../types";
import { IModelCardProps } from "./ProjectCard";

export const ExpenseCard = ({ model }: IModelCardProps<TExpense[]>) => {
  return (
    <div className="flex overflow-x-auto">
      {model.map((expense) => (
        <div
          key={expense.id}
          className="mb-4 mr-4 w-72 flex-shrink-0 transform cursor-pointer rounded-md border border-gray-300 p-4 transition duration-300 ease-in-out hover:scale-105"
        >
          <p className="mb-2 truncate text-lg font-semibold text-gray-800">
            {expense.expenseDate.toDateString()}
          </p>
          <p className="mb-1 text-gray-600">${expense.expenseAmount}</p>
          <p className="mb-1 text-gray-600">{expense.expenseVendor}</p>
          <p className="mb-1 text-gray-600">{expense.expenseDescription}</p>
        </div>
      ))}
    </div>
  );
};
