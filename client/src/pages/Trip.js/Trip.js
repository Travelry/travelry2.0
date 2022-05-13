import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AutoSearch from "../Create/AutoSearch";
import { MapContext } from "../../context/MapContext";
import Destination from "../../components/Destination";
import axios from "axios";
import moment from "moment";
import "./tripStyle.css";

export default function Trip(props) {
    const history = useHistory();
    const { markers, setMarkers, tripId, setTripId } = useContext(MapContext);
    const [trip, setTrip] = useState({});

    useEffect(() => {
        getTripData(props.match.params.id);
    }, []);

    async function getTripData(id) {
        try {
            const data = await axios.get("/trip/trip-info/" + id);
            console.log(data);
            if (data.data?.trip) {
                setMarkers(data.data.trip.markers);
                setTrip(data.data.trip);
            } else {
                history.push("/discover");
            }
        } catch (error) {
            console.log(error);
            history.push("/discover");
        }
    }

    return (
        <div>
            <Header signup={null} cancelOther={() => null} />
            <Sidebar currentPage="discover" />
            <div id="homeArea">
                <div id="contentBody">


                    <div id="sideBody">
                        <div id="tripHeaderFlex">
                            <div id="tripHeader">
                                <div id="tripTitle">
                                    {trip.title}
                                </div>
                                <div id="datesFlex">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" id="calendarIcon">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 4.75V8.25"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 4.75V8.25"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 10.75H16.25"></path>
                                    </svg>
                                    <div id="dates">
                                        {moment(trip.startDate).format('l')} - {moment(trip.endDate).format('l')}
                                    </div>
                                </div>
                                <div id="shareBtn">
                                    <svg width="24" height="24" viewBox="0 0 640 512" color="#6c757d"><path fill="currentColor" d='M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className="tripInfoFlex">
                            <div className="tripInfo">

                                <div className="sectionTitle" id="itineraryTitle">
                                    Itinerary
                                </div>


                                {markers.length > 0 ? markers.map(marker => {
                                    return <Destination
                                        key={marker.address}
                                        address={marker.address}
                                    />
                                }) : <div id="noDestination"> add a destination to update your itinerary </div>}
                            </div>
                        </div>
                        <div id="saveBtn" onClick={() => history.push("/create/"+ props.match.params.id +  "0")}>
                                customize
                        </div>
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