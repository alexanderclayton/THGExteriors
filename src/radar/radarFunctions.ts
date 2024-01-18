import Radar from "radar-sdk-js";

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
            console.log(result)
            setState((prevState) => ({
                ...prevState,
                address: result
            }))

        }

    })
}