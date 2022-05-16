import React, { useState, useContext, useEffect } from "react";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AutoSearch from "../Create/AutoSearch";
import TripPreview from "../../components/TripPreview";
import axios from "axios";
import { MapContext } from "../../context/MapContext";
import "./discoverStyle.css";

export default function Discover() {
    const { markers, setMarkers, setZoom, setCenter, zoomOn, setZoomOn} = useContext(MapContext);
    const topTrips = ["62818a379a3bdee8ea66c79e", "62818bdf9a3bdee8ea66c7b5", "6281826645af21de4e1e4af6", "628191759a3bdee8ea66c995", "6281958f9a3bdee8ea66ca50"];
    const [tripData, setTripData] = useState([]);
    const tripMarkers = [];

    useEffect(() => {
        setMarkers([]);
        topTrips.forEach((id, index) => {
            getTripData(id, index);
        });
    }, []);

    async function getTripData(id, index) {
        try {
            const res = await axios.get("/trip/trip-info/" + id);
            if (res.data.trip) {
                tripData.push(res.data.trip);
                tripMarkers.push({lat: res.data.trip.markers[res.data.trip.markers.length-1].lat, lng: res.data.trip.markers[res.data.trip.markers.length-1].lng, id: res.data.trip._id})
            }
            if(index === topTrips.length -1) {
                setMarkers(tripMarkers);
                setTimeout(() => {
                    setCenter({ lat: 15.178574, lng: -20.814149 });
                }, 200);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Header signup={null} cancelOther={() => null} />
            <Sidebar currentPage="discover" />
            <div id="homeArea">
                <div id="contentBody" onMouseLeave={() => setCenter({ lat: 15.178574, lng: -20.814149 })}>
                    <div id="discoverTitleFlex">
                        <div id="discoverTitle">
                            Discover Trips
                        </div>
                    </div>
                    <div id="discoverTrips">
                        {tripData.map((trip, index) => {
                            return <TripPreview
                                key={trip + index}
                                id={trip._id}
                                trip={trip}
                                index={index}
                            />
                        })}
                    </div>
                    <div id="fadeBlock">
                    </div>
                    <div id="block">
                    </div>
                </div>
                <Map />
                <div style={{ display: "none" }}>
                    <AutoSearch />
                </div>
            </div>
        </div>
    );
}