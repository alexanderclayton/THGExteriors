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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-950 bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
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
            <legend className="mb-4 text-center text-2xl font-bold text-primary-500">
              {legend}
            </legend>
            <div className="mb-4">
              <label
                htmlFor="clientLastName"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="clientLastName"
                name="clientLastName"
                className="flex w-full items-center justify-between rounded-md border border-primary-500 px-3 py-2 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={model.clientLastName}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientFirstName"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                First Name:
              </label>
              <input
                type="text"
                id="clientFirstName"
                name="clientFirstName"
                className="flex w-full items-center justify-between rounded-md border border-primary-500 px-3 py-2 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={model.clientFirstName}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientPhone"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Phone:
              </label>
              <input
                type="tel"
                id="clientPhone"
                name="clientPhone"
                placeholder="eg. 123-456-7890"
                className="flex w-full items-center justify-between rounded-md border border-primary-500 px-3 py-2 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={
                  model.clientPhone.toString() !== "0"
                    ? model.clientPhone.toString()
                    : ""
                }
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientEmail"
                className="mb-1 block text-sm font-semibold text-text-800"
              >
                Email:
              </label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                placeholder="eg. address@email.com"
                className="flex w-full items-center justify-between rounded-md border border-primary-500 px-3 py-2 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
                onChange={(e) => handleChange(e, setState, setClientValidation)}
                value={model.clientEmail}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-text-800">
                Address:
              </label>
              <div className="my-1 w-full rounded-md border border-primary-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <Autocomplete
                  setState={setState}
                  resetAutocomplete={resetAutocomplete}
                />
              </div>
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
                className="flex w-full items-center justify-between rounded-md border border-primary-500 px-3 py-2 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500 focus:outline-none"
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
          <div className="flex justify-center">
            <input
              type="submit"
              value={submit}
              className="mr-4 rounded-md border border-primary-500 bg-primary-500 px-4 py-2 text-white transition-all duration-300 hover:cursor-pointer hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
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
