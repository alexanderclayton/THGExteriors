import { useNavigate } from "react-router-dom";
import { ITableProps, TModels } from "../types";
import { Sort } from "./Sort";
import { renderValue } from "../helpers";
import { useState } from "react";

export const Table = <T extends TModels>({
  header,
  model,
  setModel,
  navigateUrl,
}: ITableProps<T>) => {
  const navigate = useNavigate();
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  return (
    <div className="mx-auto h-full w-full overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 z-10 bg-gray-200">
          <tr className="">
            {header.map((head) => (
              <th
                key={head.sortTitle}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${
                  head.property === sortedColumn && "bg-blue-50"
                }`}
              >
                <Sort
                  model={model}
                  setModel={setModel}
                  sortBy={head.property}
                  sortTitle={head.sortTitle}
                  setHighlight={setSortedColumn}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {model.map((mod) => (
            <tr
              key={mod.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/${navigateUrl}/${mod.id}`)}
            >
              {header.map((head, index) => (
                <td
                  key={index}
                  className={`whitespace-nowrap px-6 py-4 ${
                    head.property === sortedColumn && "bg-blue-50"
                  }`}
                >
                  {head.nested
                    ? renderValue((mod[head.property] as any)[head.nested])
                    : renderValue(mod[head.property])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
