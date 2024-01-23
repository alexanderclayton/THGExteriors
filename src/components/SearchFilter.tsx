//import//
import { useEffect } from "react";
import { TClient, TExpense, TProject } from "../types";

interface ISearchFilterProps<T> {
  model: T;
  setFilteredModel: React.Dispatch<React.SetStateAction<T>>;
  filterProperty: string;
}

export const SearchFilter: React.FC<
  ISearchFilterProps<TClient[] | TProject[] | TExpense[]>
> = ({ model, setFilteredModel, filterProperty }) => {
  useEffect(() => {
    setFilteredModel(model);
  }, []);
  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = model.filter((filteredModel: any) =>
      filteredModel[filterProperty].toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredModel(filtered as TClient[] | TProject[] | TExpense[]);
  };

  return (
    <input
      type="text"
      placeholder="Search Name"
      onChange={handleSearchFilterChange}
    />
  );
};
