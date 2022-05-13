import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export default ({ children }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [tripId, setTripId] = useState("");
    const [valueChanged, setValueChanged] = useState(false);
    const [newDest, setNewDest] = useState(false);


    return (
        <MapContext.Provider value={{ scriptLoaded, setScriptLoaded, markers, setMarkers, tripId, setTripId, valueChanged, setValueChanged, newDest, setNewDest }}>
            {children}
        </MapContext.Provider>
    )
}