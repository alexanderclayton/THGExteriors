import { useEffect, useRef } from "react";
import { IMapProps } from "../types";
import { getMap } from "../radar";

export const Map: React.FC<IMapProps> = ({ model }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    getMap(mapRef, model);
  }, []);
  return <div id="map" ref={mapRef} className="h-96 w-96" />;
};
