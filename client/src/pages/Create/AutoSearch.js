import React, { useState, useEffect, useRef, useContext } from "react";
import { MapContext } from "../../context/MapContext";
import "./autoSearchStyle.css";
let autoComplete;

function AutoSearch() {
    const { setScriptLoaded, setMarkers, setNewDest } = useContext(MapContext);
    const [query, setQuery] = useState("");
    const [typing, setTyping] = useState(false);
    const autoCompleteRef = useRef(null);

    const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function handleScriptLoad(updateQuery, autoCompleteRef) {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { types: [], componentRestrictions: {} }
        );
        autoComplete.setFields(["address_components", "formatted_address", "geometry", "place_id"]);
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log(addressObject);
        if(addressObject.geometry) {
            const lat = (addressObject.geometry.viewport.Ab.h + addressObject.geometry.viewport.Ab.j) / 2;
            const lng = (addressObject.geometry.viewport.Va.h + addressObject.geometry.viewport.Va.j) / 2;
            console.log(lat);
            console.log(lng);
            setMarkers(markers => [...markers, { lat, lng, address: addressObject.formatted_address }]);
            setNewDest(true);
        }
        setQuery("");
    }

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyDbC-YOQBw5zyWM2d-SROyIDOzlfmpm5VQ"}&libraries=places&callback=initMap`,
            () => {
                handleScriptLoad(setQuery, autoCompleteRef, setMarkers)
                setScriptLoaded(true);
            }
        );
    }, []);

    useEffect(() => {
        if (typing) {
            console.log("typing")
        }
    }, [typing]);

    return (
        <div id="autoSearch" style={typing ? { borderColor: "#0099d6" } : { borderColor: "rgb(213, 213, 213)" }}>
            <input
                id="autoSearchInput"
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="enter a location"
                value={query}
                onBlur={() => setTyping(false)}
                onFocus={() => setTyping(true)}
                onSubmit={(e) => e.preventDefault()}
            />
        </div>
    );
}

export default AutoSearch;