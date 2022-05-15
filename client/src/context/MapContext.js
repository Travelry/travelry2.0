import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export default ({ children }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [tripId, setTripId] = useState("");
    const [valueChanged, setValueChanged] = useState(false);
    const [newDest, setNewDest] = useState(false);
    const [center, setCenter] = useState({ lat: 15.178574, lng: -20.814149 });
    const [zoom, setZoom] = useState(2);


    return (
        <MapContext.Provider value={{ scriptLoaded, setScriptLoaded, markers, setMarkers, tripId, setTripId, valueChanged, setValueChanged, newDest, setNewDest, center, setCenter, zoom, setZoom }}>
            {children}
        </MapContext.Provider>
    )
}