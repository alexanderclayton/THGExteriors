//import//
import { ProjectType, BidStatus, IFormProps, TProject } from "../types";
import { handleChange, handleImage } from "../helpers";
import { useState } from "react";

export const ProjectForm: React.FC<IFormProps<TProject>> = ({
  legend,
  setState,
  formSubmit,
  model,
  submit,
}) => {
  const [image, setImage] = useState<File | undefined>(undefined);

  return (
    <form onSubmit={(e) => formSubmit(e, image)}>
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
          <label htmlFor="projectDate">Project Date:</label>
          <input
            type="date"
            id="projectDate"
            name="projectDate"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            value={model.projectDate.toISOString().split("T")[0]}
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
            checked={model.bid.sent}
          />
          <label htmlFor="bidStatus">Status</label>
          <select
            name="bidStatus"
            id="bidStatus"
            className="border border-black"
            onChange={(e) =>
              handleChange(e, setState, undefined, "bidStatus", "status")
            }
            value={model.bid.status}
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
            value={model.bid.amount.toString()}
          />
        </div>
        <div>
          <label htmlFor="paid">Paid</label>
          <input
            type="checkbox"
            id="paid"
            name="paid"
            className="border border-black"
            onChange={(e) => handleChange(e, setState)}
            checked={model.paid}
          />
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
