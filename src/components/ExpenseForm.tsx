import { useRef, useState } from "react";
import {
  handleChange,
  handleImage,
  resetExpense,
  validateSubmit,
} from "../helpers";
import { IFormProps, TExpense, TExpenseValidation } from "../types";
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
      <div className="w-96 rounded-lg bg-white p-8">
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
            <legend className="mb-4 text-lg font-bold">{legend}</legend>
            <div className="mb-4">
              <label htmlFor="expenseType" className="mb-1 block">
                Expense Type:
              </label>
              <select
                id="expenseType"
                name="expenseType"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState)}
                value={model.expenseType}
              >
                <option value="">Select an option</option>
                <option value="Materials">Materials</option>
                <option value="Labor">Labor</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {model.expenseType && (
              <>
                <div className="mb-4">
                  <label htmlFor="expenseDate" className="mb-1 block">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="expenseDate"
                    name="expenseDate"
                    className="w-full border border-black px-2 py-1"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expenseDate.toISOString().split("T")[0]}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="expenseVendor" className="mb-1 block">
                    Vendor:
                  </label>
                  <input
                    type="text"
                    id="expenseVendor"
                    name="expenseVendor"
                    className="w-full border border-black px-2 py-1"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expenseVendor}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="expenseAmount" className="mb-1 block">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="expenseAmount"
                    name="expenseAmount"
                    className="w-full border border-black px-2 py-1"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expenseAmount}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="expensePaymentType" className="mb-1 block">
                    Payment Type:
                  </label>
                  <select
                    id="expensePaymentType"
                    name="expensePaymentType"
                    className="w-full border border-black px-2 py-1"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expensePaymentType}
                  >
                    <option value="">Select an option</option>
                    <option value="Cash">Cash</option>
                    <option value="CreditCard">Credit Card</option>
                    <option value="Venmo">Venmo</option>
                    <option value="Check">Check</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="expenseDescription" className="mb-1 block">
                    Description:
                  </label>
                  <input
                    type="text"
                    id="expenseDescription"
                    name="expenseDescription"
                    className="w-full border border-black px-2 py-1"
                    onChange={(e) => handleChange(e, setState)}
                    value={model.expenseDescription}
                  />
                </div>
                <div className="mb-4">
                  <ProjectDropdown expense={model} setState={setState} />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="mb-1 block">
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    ref={imageRef}
                    className="border border-black"
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
              className="rounded-md border border-black bg-gray-100 px-4 py-2 hover:bg-gray-200"
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
