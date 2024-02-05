import React from "react";
import { updateDocument } from "../services";
import { INotesProps, TModels } from "../types";

export const Notes = <T extends TModels>({
  model,
  collectionName,
  params,
  mapFunction,
  setFunction,
}: INotesProps<T>) => {
  const [note, setNote] = React.useState("");

  return (
    <div className="mt-4">
      <div>
        {"notes" in model && model.notes !== undefined
          ? model.notes.map((data, index: number) => (
              <div key={index} className="mb-2 flex items-center">
                <p className="mr-2 flex-grow">{data}</p>
                <button
                  onClick={() =>
                    updateDocument(
                      collectionName,
                      params,
                      model,
                      mapFunction,
                      setFunction,
                      undefined,
                      note,
                      setNote,
                      index,
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          : null}
      </div>
      <div className="mt-4">
        <label htmlFor="note" className="block">
          Note
        </label>
        <input
          type="text"
          id="note"
          name="note"
          className="rounded border border-gray-300 p-1"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
        <button
          onClick={() =>
            updateDocument(
              collectionName,
              params,
              model,
              mapFunction,
              setFunction,
              undefined,
              note,
              setNote,
            )
          }
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};
