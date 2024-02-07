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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8">
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
            <legend className="mb-4 text-lg font-bold">{legend}</legend>
            <div className="mb-4">
              <label htmlFor="projectName" className="mb-1 block">
                Project Name:
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectName}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectStartDate" className="mb-1 block">
                Project Start Date:
              </label>
              <input
                type="date"
                id="projectStartDate"
                name="projectStartDate"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectStartDate.toISOString().split("T")[0]}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectEndDate" className="mb-1 block">
                Project End Date:
              </label>
              <input
                type="date"
                id="projectEndDate"
                name="projectEndDate"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectEndDate.toISOString().split("T")[0]}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectType" className="mb-1 block">
                Project Type:
              </label>
              <select
                id="projectType"
                name="projectType"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectType}
              >
                <option value={ProjectType.Painting}>Painting</option>
                <option value={ProjectType.Lights}>Lights</option>
                <option value={ProjectType.Other}>Other</option>
              </select>
            </div>
            <div className="mb-4">
              <p className="mb-1">Bid:</p>
              <label htmlFor="bidSent" className="mr-2 inline-block">
                Sent
              </label>
              <input
                type="checkbox"
                id="bidSent"
                name="bidSent"
                className="border border-black"
                onChange={(e) =>
                  handleChange(e, setState, undefined, "bidSent", "sent")
                }
                checked={model.projectBid.sent}
              />
              <label htmlFor="bidStatus" className="mx-2 inline-block">
                Status
              </label>
              <select
                name="bidStatus"
                id="bidStatus"
                className="border border-black px-2 py-1"
                onChange={(e) =>
                  handleChange(e, setState, undefined, "bidStatus", "status")
                }
                value={model.projectBid.status}
              >
                <option value={BidStatus.Tentative}>Tentative</option>
                <option value={BidStatus.Accepted}>Accepted</option>
                <option value={BidStatus.Declined}>Declined</option>
              </select>
              <label htmlFor="bidAmount" className="mx-2 inline-block">
                Amount
              </label>
              <input
                type="number"
                id="bidAmount"
                name="bidAmount"
                className="border border-black px-2 py-1"
                onChange={(e) =>
                  handleChange(e, setState, undefined, "bidAmount", "amount")
                }
                value={model.projectBid.amount.toString()}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectStatus" className="mb-1 block">
                Project Status:
              </label>
              <select
                name="projectStatus"
                id="projectStatus"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState)}
                value={model.projectStatus}
              >
                <option value={ProjectStatus.Upcoming}>Upcoming</option>
                <option value={ProjectStatus.Current}>Current</option>
                <option value={ProjectStatus.Complete}>Complete</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="projectPaid" className="mr-2 inline-block">
                Paid
              </label>
              <input
                type="checkbox"
                id="projectPaid"
                name="projectPaid"
                className="border border-black"
                onChange={(e) => handleChange(e, setState)}
                checked={model.projectPaid}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <div>
                <label htmlFor="image" className="mb-1 block">
                  Upload Image:
                </label>
                <input
                  type="file"
                  id="image"
                  ref={imageRef}
                  className="border border-black"
                  onChange={(e) => handleImage(e, setImage, setImageThumbnail)}
                />
              </div>
              {imageThumbnail && (
                <img
                  src={imageThumbnail}
                  alt="thumbnail"
                  className="ml-2 h-40 w-40 rounded-lg object-cover"
                />
              )}
            </div>
          </fieldset>
          <div className="flex justify-around">
            <input
              type="submit"
              value={submit}
              className="ml-2 rounded-md border border-black bg-gray-100 px-4 py-2 hover:bg-gray-200"
            />
            {setToggle && toggle && (
              <button onClick={() => setToggle(!toggle)}>Cancel</button>
            )}
            <button onClick={() => console.log(model)}>Test</button>
          </div>
        </form>
      </div>
    </div>
  );
};
