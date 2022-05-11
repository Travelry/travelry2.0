import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export default ({ children }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);

    return (
        <MapContext.Provider value={{ scriptLoaded, setScriptLoaded, markers, setMarkers }}>
            {children}
        </MapContext.Provider>
    )
}