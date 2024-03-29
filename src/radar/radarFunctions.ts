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
                clientAddress: result
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
        if (model.clientAddress.latitude && model.clientAddress.longitude) {
            const map = Radar.ui.map({
                container: "map",
                style: "radar-default-v1",
                center: [model.clientAddress.longitude, model.clientAddress.latitude],
                zoom: 14
            })
            Radar.ui.marker({ text: `${model.clientFirstName} ${model.clientLastName} location`})
            .setLngLat([model.clientAddress.longitude, model.clientAddress.latitude])
            .addTo(map)
        } else {
            console.log("no lat lon")
        }
    } else {console.log("no mapref")}
}

export const getMapWithMarkers = (
    mapRef: React.MutableRefObject<HTMLDivElement | null>,
    model: TClient[]
) => {
    if (mapRef.current) {
        mapRef.current.innerHTML = ""
            const map = Radar.ui.map({
                container: "map",
                style: "radar-default-v1",
                center: [-94.6708, 38.9822],
                zoom: 10
            })
            if (model[0].clientAddress.latitude && model[0].clientAddress.longitude) {
            for (let i = 0; i < model.length; i++) {
                Radar.ui.marker({ text: `${model[i].clientFirstName} ${model[i].clientLastName} project address`})
                .setLngLat([model[i].clientAddress.longitude, model[i].clientAddress.latitude])
                .addTo(map)
            }
        }
    }
}