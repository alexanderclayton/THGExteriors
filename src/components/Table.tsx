//import//
import { useNavigate } from "react-router-dom";
import { TModels } from "../types";
import { Sort } from "./Sort";
import { RadarAddress } from "radar-sdk-js/dist/types";

type TableHeader<T extends TModels> = {
  property: keyof T;
  sortTitle: string;
  nested?: keyof RadarAddress;
};

interface ITableProps<T extends TModels> {
  header: TableHeader<T>[];
  model: T[];
  setModel: React.Dispatch<React.SetStateAction<T[]>>;
  navigateUrl: string;
}

const renderValue = (value: any) => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  } else if (value instanceof Date) {
    return value.toDateString();
  } else {
    return JSON.stringify(value);
  }
};

export const Table = <T extends TModels>({
  header,
  model,
  setModel,
  navigateUrl,
}: ITableProps<T>) => {
  const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          {header.map((head) => (
            <th key={head.sortTitle}>
              <Sort
                model={model}
                setModel={setModel}
                sortBy={head.property}
                sortTitle={head.sortTitle}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {model.map((mod) => (
          <tr
            key={mod.id}
            className="border border-black hover:cursor-pointer"
            onClick={() => navigate(`/${navigateUrl}/${mod.id}`)}
          >
            {header.map((head, index) => (
              <td key={index}>
                {head.nested
                  ? renderValue((mod[head.property] as any)[head.nested])
                  : renderValue(mod[head.property])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
