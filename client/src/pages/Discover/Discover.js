import React, { useState, useContext, useEffect } from "react";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AutoSearch from "../Create/AutoSearch";
import TripPreview from "../../components/TripPreview";
import axios from "axios";
import { MapContext } from "../../context/MapContext";
import { AuthContext } from "../../context/AuthContext";
import "./discoverStyle.css";

export default function Discover() {
    const {setMarkers} = useContext(MapContext);
    const topTrips = [];

    useEffect(() => {
        setMarkers([]);
    }, [])

    return (
        <div>
            <Header signup={null} cancelOther={() => null} />
            <Sidebar currentPage="discover" />
            <div id="homeArea">
                <div id="contentBody">
                    <div id="discoverTitleFlex">
                        <div id="discoverTitle">
                            Discover Trips
                        </div>
                    </div>
                    <TripPreview />
                    <TripPreview />
                    <TripPreview />
                    <TripPreview />
                    <TripPreview />
                    <TripPreview />
                    <TripPreview />
                    <TripPreview />
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