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
    const { markers, setMarkers, setZoom, setCenter } = useContext(MapContext);
    const topTrips = ["6281826645af21de4e1e4af6", "627f43c3d54ff1bd97791dd7", "627f437cd54ff1bd97791dd6", "627f42cbd54ff1bd97791dd5", "627f42bed54ff1bd97791dd3", "627f4298d54ff1bd97791dd2", "627f4238d54ff1bd97791dce", "627f40c3d54ff1bd97791dcd", "627f3bb6d54ff1bd97791dcc"];
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
                tripMarkers.push({lat: res.data.trip.markers[0].lat, lng: res.data.trip.markers[0].lng, id: res.data.trip._id})
            }
            if(index === topTrips.length -1) {
                setMarkers(tripMarkers);
                setTimeout(() => {
                    // setZoom(2);
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
                <div id="contentBody" onMouseLeave={() => setZoom(2)}>
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