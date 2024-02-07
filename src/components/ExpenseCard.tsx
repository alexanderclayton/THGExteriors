import { useNavigate } from "react-router-dom";
import { TExpense } from "../types";
import { IModelCardProps } from "./ProjectCard";

export const ExpenseCard = ({ model }: IModelCardProps<TExpense[]>) => {
  const navigate = useNavigate();
  return (
    <div className="flex overflow-x-auto p-2">
      {model.map((expense) => (
        <div
          key={expense.id}
          className="mb-4 mr-4 w-72 flex-shrink-0 transform cursor-pointer rounded-md border border-gray-300 p-4 transition duration-300 ease-in-out hover:scale-105"
          onClick={() => navigate(`/expense/${expense.id}`)}
        >
          <p className="mb-2 truncate text-lg font-semibold text-gray-800">
            {expense.expenseDate.toDateString()}
          </p>
          <p className="mb-1 text-gray-600">${expense.expenseAmount}</p>
          <p className="mb-1 text-gray-600">{expense.expenseVendor}</p>
          <p className="mb-1 truncate text-gray-600">
            {expense.expenseDescription}
          </p>
        </div>
      ))}
    </div>
  );
};
