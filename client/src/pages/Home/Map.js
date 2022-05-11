import React, { useEffect, useState, useContext } from "react";
import { Marker } from "@react-google-maps/api";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useHistory } from "react-router-dom";
import { MapContext } from "../../context/MapContext";
import "./mapStyle.css";

export default function Map() {
    const { scriptLoaded, markers, setScriptLoaded } = useContext(MapContext);
    const [center, setCenter] = useState({ lat: 15.178574, lng: -20.814149 });
    const [zoom, setZoom] = useState(2);
    const [map, setMap] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();

    const containerStyle = {
        width: '60vw',
        height: '100vh',

    };

    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        minZoom: 2
    };

    useEffect(() => {
        if (scriptLoaded) {
            setLoaded(true);
            if (!map) {
                setMap(map)
            }
        }
        return () => setScriptLoaded(false);
    }, [scriptLoaded]);

    useEffect(() => {
        if (markers.length > 0) {
            setCenter({ lat: markers[markers.length-1].lat, lng: markers[markers.length-1].lng, });
            setZoom(5);
        }
    }, [markers]);

    function newPlace(lat, lng) {
        setCenter({ lat: lat, lng: lng, });
        setZoom(5);
        history.push("/home/turkey");
    }

    return loaded ? (
        <div id="mapContainer">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                minZoom={4}
                zoom={zoom}
                options={defaultMapOptions}
            >
                {markers.map(marker => {
                    return <Marker
                        key={marker.lat}
                        onClick={() => newPlace(marker.lat, marker.lng)}
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
                        }}
                    />
                })}

            </GoogleMap>
        </div>
    ) : <></>
}
