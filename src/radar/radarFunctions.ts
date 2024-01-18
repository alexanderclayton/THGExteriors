import Radar from "radar-sdk-js";
import { TClient } from "../types";

export const getAutocomplete = <T>(
    autocompleteRef: React.MutableRefObject<HTMLDivElement | null>,
    containerWidth: string,
    setState: React.Dispatch<React.SetStateAction<T>>,
) => {
    if (autocompleteRef.current) {
        autocompleteRef.current.innerHTML = ""
    }
    Radar.ui.autocomplete({
        container: "autocomplete",
        responsive: true,
        width: containerWidth,
        hideResultsOnBlur: true,
        onSelection: (result) => {
            setState((prevState) => ({
                ...prevState,
                address: result
            }))

        }

    })
}

export const getMap = (
    mapRef: React.MutableRefObject<HTMLDivElement | null>,
    model: TClient
) => {
    if (mapRef.current) {
        mapRef.current.innerHTML = ""
        if (model.address.latitude && model.address.longitude) {
            const map = Radar.ui.map({
                container: "map",
                style: "radar-default-v1",
                center: [model.address.longitude, model.address.latitude],
                zoom: 14
            })
            Radar.ui.marker({ text: `${model.name} location`})
            .setLngLat([model.address.longitude, model.address.latitude])
            .addTo(map)
        } else {
            console.log("no lat lon")
        }
    } else {console.log("no mapref")}
}