import React from "react";
import { updateDocument } from "../services";
import { INotesProps, TModels } from "../types";
import { LuPlusCircle } from "react-icons/lu";

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
        <div className="flex items-center">
          <input
            type="text"
            id="note"
            name="note"
            className="rounded border border-gray-300 p-1"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          <LuPlusCircle
            size={25}
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
            className="ml-4 text-green-600 duration-300 hover:scale-125 hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
