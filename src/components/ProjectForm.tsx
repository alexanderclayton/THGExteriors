//import//
import {
  ProjectType,
  BidStatus,
  IFormProps,
  TProject,
  ProjectStatus,
  TProjectValidation,
} from "../types";
import {
  handleChange,
  handleImage,
  resetProject,
  validateSubmit,
} from "../helpers";
import { useRef, useState } from "react";
import { mapProjectDocument } from "../services";

export const ProjectForm = ({
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
}: IFormProps<TProject>) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageThumbnail, setImageThumbnail] = useState("");
  const [projectValidation] = useState<TProjectValidation>({
    validate: true,
  });

  return (
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
          update,
          setUpdate,
          setUpdatedState,
        )
      }
    >
      <fieldset className="flex flex-col">
        <legend>{legend}</legend>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            value={model.projectName}
            required
          />
        </div>
        <div>
          <label htmlFor="projectStartDate">Project Start Date:</label>
          <input
            type="date"
            id="projectStartDate"
            name="projectStartDate"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            value={model.projectStartDate.toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label htmlFor="projectEndDate">Project End Date:</label>
          <input
            type="date"
            id="projectEndDate"
            name="projectEndDate"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            value={model.projectEndDate.toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label htmlFor="projectType">Project Type:</label>
          <select
            id="projectType"
            name="projectType"
            onChange={(e) => handleChange(e, setState)}
            value={model.projectType}
          >
            <option value={ProjectType.Painting}>Painting</option>
            <option value={ProjectType.Lights}>Lights</option>
            <option value={ProjectType.Other}>Other</option>
          </select>
        </div>
        <div>
          <p>Bid:</p>
          <label htmlFor="bidSent">Sent</label>
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
          <label htmlFor="bidStatus">Status</label>
          <select
            name="bidStatus"
            id="bidStatus"
            className="border border-black"
            onChange={(e) =>
              handleChange(e, setState, undefined, "bidStatus", "status")
            }
            value={model.projectBid.status}
          >
            <option value={BidStatus.Tentative}>Tentative</option>
            <option value={BidStatus.Accepted}>Accepted</option>
            <option value={BidStatus.Declined}>Declined</option>
          </select>
          <label htmlFor="bidAmount">Amount</label>
          <input
            type="number"
            id="bidAmount"
            name="bidAmount"
            className="border border-black"
            onChange={(e) =>
              handleChange(e, setState, undefined, "bidAmount", "amount")
            }
            value={model.projectBid.amount.toString()}
          />
        </div>
        <div>
          <label htmlFor="projectStatus">Project Status:</label>
          <select
            name="projectStatus"
            id="projectStatus"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            value={model.projectStatus}
          >
            <option value={ProjectStatus.Upcoming}>Upcoming</option>
            <option value={ProjectStatus.Current}>Current</option>
            <option value={ProjectStatus.Complete}>Complete</option>
          </select>
        </div>
        <div>
          <label htmlFor="projectPaid">Paid</label>
          <input
            type="checkbox"
            id="projectPaid"
            name="projectPaid"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            checked={model.projectPaid}
          />
        </div>
        <div className="flex">
          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              ref={imageRef}
              className="border border-black"
              onChange={(e) => handleImage(e, setImage, setImageThumbnail)}
            />
          </div>
          <img
            src={imageThumbnail}
            alt="thumbnail"
            className="h-40 w-40 rounded-lg object-cover"
          />
        </div>
      </fieldset>
      <input type="submit" value={submit} />
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(model);
        }}
      >
        Check Form
      </button>
    </form>
  );
};
