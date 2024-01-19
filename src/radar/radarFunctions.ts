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
            if (model[0].address.latitude && model[0].address.longitude) {
            for (let i = 0; i < model.length; i++) {
                Radar.ui.marker({ text: `${model[i].name} project address`})
                .setLngLat([model[i].address.longitude, model[i].address.latitude])
                .addTo(map)
            }
        }
    }
}