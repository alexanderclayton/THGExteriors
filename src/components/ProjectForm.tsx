import { useRef, useState } from "react";
import {
  handleChange,
  handleImage,
  resetProject,
  validateSubmit,
} from "../helpers";
import {
  IFormProps,
  TProject,
  ProjectType,
  BidStatus,
  ProjectStatus,
  TProjectValidation,
  PaymentType,
} from "../types";
import { mapProjectDocument } from "../services";

export const ProjectForm = ({
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
}: IFormProps<TProject>) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageThumbnail, setImageThumbnail] = useState("");
  const [projectValidation] = useState<TProjectValidation>({
    validate: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-950 bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <form
          onSubmit={(e) =>
            validateSubmit(
              e,
              "projects",
              projectValidation,
              model,
              setState,
              setAllState,
              resetProject,
              mapProjectDocument,
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
                htmlFor="projectName"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Project Name:
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectName}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectStartDate"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Project Start Date:
              </label>
              <input
                type="date"
                id="projectStartDate"
                name="projectStartDate"
                className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectStartDate.toISOString().split("T")[0]}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectEndDate"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Project End Date:
              </label>
              <input
                type="date"
                id="projectEndDate"
                name="projectEndDate"
                className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectEndDate.toISOString().split("T")[0]}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectType"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Project Type:
              </label>
              <select
                id="projectType"
                name="projectType"
                className="w-full rounded-md border border-primary-500 bg-accent-100 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectType}
              >
                <option value={ProjectType.Painting}>Painting</option>
                <option value={ProjectType.Lights}>Lights</option>
                <option value={ProjectType.Other}>Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectStatus"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Project Status:
              </label>
              <select
                name="projectStatus"
                id="projectStatus"
                className="w-full rounded-md border border-primary-500 bg-accent-100 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectStatus}
              >
                <option value={ProjectStatus.Upcoming}>Upcoming</option>
                <option value={ProjectStatus.Current}>Current</option>
                <option value={ProjectStatus.Complete}>Complete</option>
              </select>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <div className="my-4 flex">
                <label
                  htmlFor="projectPaid"
                  className="mr-4 block text-sm font-semibold text-text-800"
                >
                  Paid:
                </label>
                <input
                  type="checkbox"
                  id="projectPaid"
                  name="projectPaid"
                  className="border border-primary-500"
                  onChange={(e) => handleChange(e, setState)}
                  checked={model.projectPaid}
                />
              </div>
              <div className={model.projectPaid ? "block" : "hidden"}>
                <label
                  htmlFor="projectPaymentType"
                  className="mr-4 text-sm font-semibold text-text-800"
                >
                  Payment Type
                </label>
                <select
                  name="projectPaymentType"
                  id="projectPaymentType"
                  className="rounded-md border border-primary-500 bg-accent-100 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={(e) => handleChange(e, setState)}
                  value={model.projectPaymentType}
                >
                  <option value={PaymentType.None}>None</option>
                  <option value={PaymentType.Cash}>Cash</option>
                  <option value={PaymentType.Check}>Check</option>
                  <option value={PaymentType.CreditCard}>Credit Card</option>
                  <option value={PaymentType.Venmo}>Venmo</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <p className="mb-1 text-sm font-semibold text-text-800">Bid:</p>
              <div className="mb-4 flex items-center justify-between">
                <label htmlFor="bidSent" className="mr-2">
                  Sent
                </label>
                <input
                  type="checkbox"
                  id="bidSent"
                  name="bidSent"
                  className="mr-8 border border-primary-500"
                  onChange={(e) =>
                    handleChange(e, setState, undefined, "bidSent", "sent")
                  }
                  checked={model.projectBid.sent}
                />
                <label htmlFor="bidStatus" className="ml-8">
                  Status
                </label>
                <select
                  name="bidStatus"
                  id="bidStatus"
                  className="rounded-md border border-primary-500 bg-accent-100 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={(e) =>
                    handleChange(e, setState, undefined, "bidStatus", "status")
                  }
                  value={model.projectBid.status}
                >
                  <option value={BidStatus.Tentative}>Tentative</option>
                  <option value={BidStatus.Accepted}>Accepted</option>
                  <option value={BidStatus.Declined}>Declined</option>
                </select>
              </div>
              <div className="relative mt-2 flex items-center">
                <label htmlFor="bidAmount" className="mr-2 flex items-center">
                  Amount{" "}
                  <span className="ml-4 text-2xl font-bold text-primary-500">
                    $
                  </span>
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={(e) =>
                    handleChange(e, setState, undefined, "bidAmount", "amount")
                  }
                  value={model.projectBid.amount}
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <div>
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
                  className="w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={(e) => handleImage(e, setImage, setImageThumbnail)}
                />
              </div>
              {imageThumbnail && (
                <img
                  src={imageThumbnail}
                  alt="thumbnail"
                  className="mt-2 h-40 w-40 rounded-lg object-cover"
                />
              )}
            </div>
          </fieldset>
          <div className="flex justify-around">
            <input
              type="submit"
              value={submit}
              className="rounded-md border border-primary-500 bg-primary-500 px-4 py-2 text-white transition-all duration-300 hover:cursor-pointer hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {setToggle && toggle && (
              <button
                onClick={() => setToggle(!toggle)}
                className="rounded-md border border-gray-300 px-4 py-2 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
