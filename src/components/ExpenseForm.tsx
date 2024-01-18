import { ExpenseType, IExpenseFormProps, PaymentType } from "../types";
import { handleChange } from "../helpers";
import { ProjectDropdown } from "./ProjectDropdown";

export const ExpenseForm: React.FC<IExpenseFormProps> = ({
  legend,
  setState,
  formSubmit,
  expense,
  submit,
}) => {
  return (
    <>
      <form onSubmit={(e) => formSubmit(e)}>
        <fieldset>
          <legend>{legend}</legend>
          <div>
            <label htmlFor="expenseType">Expense Type:</label>
            <select
              id="expenseType"
              name="expenseType"
              onChange={(e) => handleChange(e, setState)}
              value={expense.expenseType}
            >
              <option value={ExpenseType.None}></option>
              <option value={ExpenseType.Materials}>Materials</option>
              <option value={ExpenseType.Labor}>Labor</option>
              <option value={ExpenseType.Other}>Other</option>
            </select>
          </div>
          {expense.expenseType !== "" && (
            <>
              <div>
                <label htmlFor="expenseDate">Date:</label>
                <input
                  type="date"
                  id="expenseDate"
                  name="expenseDate"
                  className="border border-black"
                  onChange={(e) => handleChange(e, setState)}
                  value={expense.expenseDate.toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label htmlFor="vendor">Vendor:</label>
                <input
                  type="text"
                  id="vendor"
                  name="vendor"
                  className="border border-black"
                  onChange={(e) => handleChange(e, setState)}
                  value={expense.vendor}
                />
              </div>
              <div>
                <label htmlFor="expenseAmount">Amount:</label>
                <input
                  type="number"
                  id="expenseAmount"
                  name="expenseAmount"
                  className="border border-black"
                  onChange={(e) => handleChange(e, setState)}
                  value={expense.expenseAmount}
                />
              </div>
              <div>
                <label htmlFor="paymentType">Payment Type:</label>
                <select
                  id="paymentType"
                  name="paymentType"
                  onChange={(e) => handleChange(e, setState)}
                  value={expense.paymentType}
                >
                  <option value={PaymentType.None}></option>
                  <option value={PaymentType.Cash}>Cash</option>
                  <option value={PaymentType.CreditCard}>Credit Card</option>
                  <option value={PaymentType.Check}>Check</option>
                </select>
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="border border-black"
                  onChange={(e) => handleChange(e, setState)}
                  value={expense.description}
                />
              </div>
              <div>
                <ProjectDropdown expense={expense} setState={setState} />
              </div>
              <input type="submit" value={submit} />
            </>
          )}
        </fieldset>
      </form>
      <button onClick={() => console.log(expense)}>Test</button>
    </>
  );
};
