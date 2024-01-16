import { useState } from "react";
import { ExpenseType, PaymentType, TExpense } from "../types";
import { handleChange } from "../helpers";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<TExpense>({
    expenseType: ExpenseType.None,
    expenseAmount: 0,
    paymentType: PaymentType.None,
    expenseDate: new Date(),
    vendor: "",
    description: "",
  });
  return (
    <>
      <form>
        <fieldset>
          <legend></legend>
          <div>
            <label htmlFor="expenseType">Expense Type:</label>
            <select
              id="expenseType"
              name="expenseType"
              onChange={(e) => handleChange(e, setExpense)}
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
                  onChange={(e) => handleChange(e, setExpense)}
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
                  onChange={(e) => handleChange(e, setExpense)}
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
                  onChange={(e) => handleChange(e, setExpense)}
                  value={expense.expenseAmount}
                />
              </div>
              <div>
                <label htmlFor="paymentType">Payment Type:</label>
                <select
                  id="paymentType"
                  name="paymentType"
                  onChange={(e) => handleChange(e, setExpense)}
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
                  onChange={(e) => handleChange(e, setExpense)}
                  value={expense.description}
                />
              </div>
            </>
          )}
        </fieldset>
      </form>
      <button onClick={() => console.log(expense)}>Test</button>
    </>
  );
};
