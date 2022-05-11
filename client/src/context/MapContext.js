import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export default ({ children }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [tripId, setTripId] = useState("");

    return (
        <MapContext.Provider value={{ scriptLoaded, setScriptLoaded, markers, setMarkers, tripId, setTripId }}>
            {children}
        </MapContext.Provider>
    )
}