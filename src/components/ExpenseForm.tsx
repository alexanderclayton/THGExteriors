import {
  ExpenseType,
  IFormProps,
  PaymentType,
  TExpense,
  TExpenseValidation,
} from "../types";
import {
  handleChange,
  handleImage,
  resetExpense,
  validateSubmit,
} from "../helpers";
import { ProjectDropdown } from "./ProjectDropdown";
import { mapExpenseDocument } from "../services";
import { useRef, useState } from "react";

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
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageThumbnail, setImageThumbnail] = useState("");
  const [expenseValidation] = useState<TExpenseValidation>({
    validate: true,
  });
  return (
    <>
      <form
        onSubmit={(e) =>
          validateSubmit(
            e,
            "expenses",
            expenseValidation,
            model,
            setState,
            setAllState,
            resetExpense,
            mapExpenseDocument,
            params,
            image,
            imageRef,
            formType,
            update,
            setUpdate,
            setUpdatedState,
          )
        }
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
                <label htmlFor="expenseVendor">Vendor:</label>
                <input
                  type="text"
                  id="expenseVendor"
                  name="expenseVendor"
                  className="border border-black"
                  onChange={(e) => handleChange(e, setState)}
                  value={model.expenseVendor}
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
                <label htmlFor="expensePaymentType">Payment Type:</label>
                <select
                  id="expensePaymentType"
                  name="expensePaymentType"
                  onChange={(e) => handleChange(e, setState)}
                  value={model.expensePaymentType}
                >
                  <option value={PaymentType.None}></option>
                  <option value={PaymentType.Cash}>Cash</option>
                  <option value={PaymentType.CreditCard}>Credit Card</option>
                  <option value={PaymentType.Venmo}>Venmo</option>
                  <option value={PaymentType.Check}>Check</option>
                </select>
              </div>
              <div>
                <label htmlFor="expenseDescription">Description:</label>
                <input
                  type="text"
                  id="expenseDescription"
                  name="expenseDescription"
                  className="border border-black"
                  onChange={(e) => handleChange(e, setState)}
                  value={model.expenseDescription}
                />
              </div>
              <div>
                <ProjectDropdown expense={model} setState={setState} />
              </div>
              <div>
                <div>
                  <label htmlFor="image">Upload Image:</label>
                  <input
                    type="file"
                    id="image"
                    ref={imageRef}
                    className="border border-black"
                    onChange={(e) =>
                      handleImage(e, setImage, setImageThumbnail)
                    }
                  />
                </div>
                <img
                  src={imageThumbnail}
                  alt="thumbnail"
                  className="h-40 w-40 rounded-lg object-cover"
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
