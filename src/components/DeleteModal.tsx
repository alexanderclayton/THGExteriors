import { useState } from "react";
import { capitalizeString, handleConfirmDelete } from "../helpers";
import { IDeleteModalProps } from "../types";

export const DeleteModal = ({
  onCancel,
  documentType,
  confirmationString,
  collectionName,
  params,
  deleteFieldsFunction,
  navigate,
  navigateUrl,
}: IDeleteModalProps) => {
  const [confirmationInput, setConfirmationInput] = useState("");
  const [showError, setShowError] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8">
        <h2 className="mb-4 text-lg font-semibold">
          Confirm {capitalizeString(documentType)} Deletion
        </h2>
        <p className="mb-4">
          Deleting this {documentType} will permanently remove it from the CRM.
          Are you sure you wish proceed? To confirm, type "{confirmationString}"
          in the box below
        </p>
        <input
          type="text"
          value={confirmationInput}
          onChange={(e) => setConfirmationInput(e.target.value)}
          className="my-1 w-full rounded-md border border-primary-500 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {showError && (
          <p className="mb-4 text-red-500">
            Please type "{confirmationString}" to confirm deletion
          </p>
        )}
        <div className="flex justify-around">
          <button
            onClick={() =>
              handleConfirmDelete(
                confirmationInput,
                confirmationString,
                collectionName,
                params,
                deleteFieldsFunction,
                navigate,
                navigateUrl,
                setShowError,
              )
            }
            className="rounded-md border border-red-500 bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
