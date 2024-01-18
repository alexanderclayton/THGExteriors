import React, { useEffect, useRef } from "react";
import { getAutocomplete } from "../radar";
import { IAutocompleteProps } from "../types";

export const Autocomplete: React.FC<IAutocompleteProps> = ({
  setState,
  resetAutocomplete,
}) => {
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    getAutocomplete(autocompleteRef, "600px", setState);
  }, [resetAutocomplete]);
  return <div id="autocomplete" ref={autocompleteRef} />;
};
