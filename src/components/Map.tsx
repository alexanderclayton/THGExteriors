import { useEffect, useRef } from "react";
import { IMapProps, TModels } from "../types";

export const Map = <T extends TModels | TModels[]>({
  radarFunction,
  model,
}: IMapProps<T>) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    radarFunction(mapRef, model);
  }, [model]);
  return <div id="map" ref={mapRef} className="h-96 w-96" />;
};
