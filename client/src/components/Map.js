import React, { useEffect, useState, useContext } from "react";
import { Marker } from "@react-google-maps/api";
import { GoogleMap } from '@react-google-maps/api';
import { useHistory } from "react-router-dom";
import { MapContext } from "../context/MapContext";
import "./styles/mapStyle.css";

export default function Map() {
    const { scriptLoaded, markers, setScriptLoaded, center, setCenter, zoom, setZoom } = useContext(MapContext);
    const [map, setMap] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();

    const containerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: "18px",
    };

    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        minZoom: zoom
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
            setCenter({ lat: markers[markers.length - 1].lat, lng: markers[markers.length - 1].lng, });
        } else {
            setCenter({ lat: 15.178574, lng: -20.814149 });
        }
    }, [markers]);

    useEffect(() => {
        if (center.lat === 15.178574) {
            setZoom(2)
        } else {
            setZoom(3);
        }
    }, [center]);

    // useEffect(() => {
    //     if(zoomOn) {
    //         setZoom(3)
    //     } else {
    //         setZoom(2);
    //     }
    // }, [zoom]);

    // useEffect(() => {
    //     setZoomOn(false)
    // }, []);


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
                        onClick={() => marker.id ? history.push("/trip/" + marker.id) : null}
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
