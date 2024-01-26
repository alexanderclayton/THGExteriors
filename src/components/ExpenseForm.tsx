import { ExpenseType, IFormProps, PaymentType, TExpense } from "../types";
import {
  formSubmit,
  handleChange,
  handleImage,
  resetExpense,
} from "../helpers";
import { ProjectDropdown } from "./ProjectDropdown";
import { mapExpenseDocument } from "../services";
import { useState } from "react";

export const ExpenseForm = ({
  legend,
  model,
  setState,
  setAllState,
  submit,
  params,
  update,
  setUpdate,
  setUpdatedState,
  formType,
}: IFormProps<TExpense>) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  return (
    <>
      <form
        onSubmit={(e) => {
          formType === "update" && setUpdatedState
            ? formSubmit(
                e,
                "expenses",
                model,
                setUpdatedState,
                mapExpenseDocument,
                undefined,
                undefined,
                image,
                params,
                update,
                setUpdate,
              )
            : formSubmit(
                e,
                "expenses",
                model,
                setState,
                mapExpenseDocument,
                resetExpense,
                setAllState,
              );
        }}
      >
        <fieldset>
          <legend>{legend}</legend>
          <div>
            <label htmlFor="expenseType">Expense Type:</label>
            <select
              id="expenseType"
              name="expenseType"
              onChange={(e) => handleChange(e, setState)}
              value={model.expenseType}
            >
              <option value={ExpenseType.None}></option>
              <option value={ExpenseType.Materials}>Materials</option>
              <option value={ExpenseType.Labor}>Labor</option>
              <option value={ExpenseType.Other}>Other</option>
            </select>
          </div>
          {model.expenseType !== "" && (
            <>
              <div>
                <label htmlFor="expenseDate">Date:</label>
                <input
                  type="date"
                  id="expenseDate"
                  name="expenseDate"
                  className="border border-black"
                  onChange={(e) => handleChange(e, setState)}
                  value={model.expenseDate.toISOString().split("T")[0]}
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
                  value={model.vendor}
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
                  value={model.expenseAmount}
                />
              </div>
              <div>
                <label htmlFor="paymentType">Payment Type:</label>
                <select
                  id="paymentType"
                  name="paymentType"
                  onChange={(e) => handleChange(e, setState)}
                  value={model.paymentType}
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
                  value={model.description}
                />
              </div>
              <div>
                <ProjectDropdown expense={model} setState={setState} />
              </div>
              <div>
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  id="image"
                  className="border border-black"
                  onChange={(e) => handleImage(e, setImage)}
                />
              </div>
              <input type="submit" value={submit} />
            </>
          )}
        </fieldset>
      </form>
      <button onClick={() => console.log(model)}>Test</button>
    </>
  );
};
