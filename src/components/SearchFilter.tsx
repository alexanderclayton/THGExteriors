//import//
import { useEffect } from "react";
import { ISearchFilterProps, TModels } from "../types";
import { handleSearchFilterChange } from "../helpers";

export const SearchFilter = <T extends TModels>({
  model,
  placeholder,
  setFilteredModel,
  filterProperty,
  additionalFilterProperty,
}: ISearchFilterProps<T>) => {
  useEffect(() => {
    setFilteredModel(model);
  }, []);

  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full p-2 pl-4"
      onChange={(e) => {
        !additionalFilterProperty
          ? handleSearchFilterChange(e, model, filterProperty, setFilteredModel)
          : handleSearchFilterChange(
              e,
              model,
              filterProperty,
              setFilteredModel,
              additionalFilterProperty,
            );
      }}
    />
  );
};
