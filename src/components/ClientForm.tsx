import { useRef, useState } from "react";
import {
  handleChange,
  handleImage,
  resetClients,
  validateSubmit,
} from "../helpers";
import { IFormProps, TClient, TClientValidation } from "../types";
import { Autocomplete } from "./Autocomplete";
import "radar-sdk-js/dist/radar.css";
import { mapClientDocument } from "../services";

export const ClientForm = ({
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
}: IFormProps<TClient>) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [clientValidation, setClientValidation] = useState<TClientValidation>({
    clientFirstName: true,
    clientLastName: true,
    clientPhone: true,
    clientEmail: true,
    clientAddress: true,
  });
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageThumbnail, setImageThumbnail] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8">
        <form
          onSubmit={(e) =>
            validateSubmit(
              e,
              "clients",
              clientValidation,
              model,
              setState,
              setAllState,
              resetClients,
              mapClientDocument,
              params,
              image,
              imageRef,
              formType,
              toggle,
              setToggle,
              setUpdatedState,
              resetAutocomplete,
              setResetAutocomplete,
            )
          }
        >
          <fieldset>
            <legend className="mb-4 text-lg font-bold">{legend}</legend>
            <div className="mb-4">
              <label htmlFor="clientLastName" className="mb-1 block">
                Last Name:
              </label>
              <input
                type="text"
                id="clientLastName"
                name="clientLastName"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={model.clientLastName}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="clientFirstName" className="mb-1 block">
                First Name:
              </label>
              <input
                type="text"
                id="clientFirstName"
                name="clientFirstName"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={model.clientFirstName}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="clientPhone" className="mb-1 block">
                Phone:
              </label>
              <input
                type="tel"
                id="clientPhone"
                name="clientPhone"
                placeholder="eg. 123-456-7890"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={
                  model.clientPhone.toString() !== "0"
                    ? model.clientPhone.toString()
                    : ""
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="clientEmail" className="mb-1 block">
                Email:
              </label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                placeholder="eg. address@email.com"
                className="w-full border border-black px-2 py-1"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={model.clientEmail}
                required
              />
            </div>
            <div>
              <label className="mb-1 block">Address:</label>
              <Autocomplete
                setState={setState}
                resetAutocomplete={resetAutocomplete}
              />
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
                onChange={(e) => handleImage(e, setImage, setImageThumbnail)}
              />
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
              className="ml-2 rounded-md border border-black bg-gray-100 px-4 py-2 hover:bg-gray-200"
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
