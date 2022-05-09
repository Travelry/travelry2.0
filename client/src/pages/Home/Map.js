import React, { useEffect, useState, useCallback } from "react";
import { Marker } from "@react-google-maps/api";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import "./mapStyle.css";

export default function Map() {
  const [center, setCenter] = useState({ lat: 21.178574, lng: 72.814149 });
  const [zoom, setZoom] = useState(6);
  const [map, setMap] = useState(null);

  const containerStyle = {
    width: '60vw',
    height: '100vh',
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDbC-YOQBw5zyWM2d-SROyIDOzlfmpm5VQ"
  });

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    
  }, []);

  function newPlace() {
    setCenter({ lat: 40.0112183, lng: 80.52067570000001, });
    setZoom(5);
  }

  return isLoaded ? (
    <div id="mapContainer">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        minZoom={4}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          icon={{
            url: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg',
            anchor: new window.google.maps.Point(17, 46),
            scaledSize: new window.google.maps.Size(37, 37)
          }} onClick={() => newPlace()} position={{
            lat: 40.0112183,
            lng: 80.52067570000001,
          }}></Marker>
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : <></>
}
