import { useRef, useState } from "react";
import {
  handleChange,
  handleImage,
  resetExpense,
  validateSubmit,
} from "../helpers";
import {
  ExpenseType,
  IFormProps,
  PaymentType,
  TExpense,
  TExpenseValidation,
} from "../types";
import { ProjectDropdown } from "./ProjectDropdown";
import { mapExpenseDocument } from "../services";

export const ExpenseForm = ({
  legend,
  model,
  setState,
  setAllState,
  submit,
  toggle,
  setToggle,
  params,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
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
              toggle,
              setToggle,
              setUpdatedState,
            )
          }
        >
          <fieldset>
            <legend className="mb-4 text-center text-2xl font-bold text-primary-500">
              {legend}
            </legend>
            <div className="mb-4">
              <label
                htmlFor="expenseType"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Expense Type:
              </label>
              <select
                id="expenseType"
                name="expenseType"
                className="w-full rounded-md border border-primary-500 bg-accent-100 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                onChange={(e) => handleChange(e, setState)}
                value={model.expenseType}
              >
                <option value={ExpenseType.None}>Select an option</option>
                <option value={ExpenseType.Materials}>Materials</option>
                <option value={ExpenseType.Labor}>Labor</option>
                <option value={ExpenseType.Other}>Other</option>
              </select>
            </div>
            {model.expenseType && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="expenseDate"
                    className="mb-1 block text-sm font-semibold text-text-800"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    id="expenseDate"
                    name="expenseDate"
                    className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expenseDate.toISOString().split("T")[0]}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expenseVendor"
                    className="mb-1 block text-sm font-semibold text-text-800"
                  >
                    Vendor:
                  </label>
                  <input
                    type="text"
                    id="expenseVendor"
                    name="expenseVendor"
                    className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expenseVendor}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expenseAmount"
                    className="mb-1 block text-sm font-semibold text-text-800"
                  >
                    Amount:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl font-bold text-primary-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="expenseAmount"
                      name="expenseAmount"
                      className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                      onChange={(e) => handleChange(e, setState)}
                      value={model.expenseAmount}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expensePaymentType"
                    className="mb-1 block text-sm font-semibold text-text-800"
                  >
                    Payment Type:
                  </label>
                  <select
                    id="expensePaymentType"
                    name="expensePaymentType"
                    className="w-full rounded-md border border-primary-500 bg-accent-100 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expensePaymentType}
                  >
                    <option value={PaymentType.None}>None</option>
                    <option value={PaymentType.Cash}>Cash</option>
                    <option value={PaymentType.CreditCard}>Credit Card</option>
                    <option value={PaymentType.Venmo}>Venmo</option>
                    <option value={PaymentType.Check}>Check</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expenseDescription"
                    className="mb-1 block text-sm font-semibold text-text-800"
                  >
                    Description:
                  </label>
                  <input
                    type="text"
                    id="expenseDescription"
                    name="expenseDescription"
                    className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expenseDescription}
                  />
                </div>
                <div className="mb-4">
                  <ProjectDropdown expense={model} setState={setState} />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="mb-1 block text-sm font-semibold text-text-800"
                  >
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    ref={imageRef}
                    className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                    onChange={(e) =>
                      handleImage(e, setImage, setImageThumbnail)
                    }
                  />
                  {imageThumbnail && (
                    <img
                      src={imageThumbnail}
                      alt="thumbnail"
                      className="mt-2 h-40 w-40 rounded-lg object-cover"
                    />
                  )}
                </div>
              </>
            )}
          </fieldset>
          <div className="flex justify-around">
            <input
              type="submit"
              value={submit}
              className="rounded-md border border-primary-500 bg-primary-500 px-4 py-2 text-white transition-all duration-300 hover:cursor-pointer hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {setToggle && toggle && (
              <button onClick={() => setToggle(!toggle)}>Cancel</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
