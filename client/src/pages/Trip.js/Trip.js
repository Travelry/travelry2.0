import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AutoSearch from "../Create/AutoSearch";
import { MapContext } from "../../context/MapContext";
import Destination from "../../components/Destination";
import ShareModal from "../../components/ShareModal";
import axios from "axios";
import moment from "moment";
import "./tripStyle.css";

export default function Trip(props) {
    const history = useHistory();
    const { markers, setMarkers, tripId, setTripId } = useContext(MapContext);
    const [trip, setTrip] = useState({});
    const [sharing, setSharing] = useState(false);

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
            {sharing ? <ShareModal cancel={() => setSharing(false)} /> : null}
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
                                <div id="shareBtn" onClick={() => setSharing(true)}>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V14.75"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 9.25V4.75H14.75"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 5L11.75 12.25"></path>
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <div className="tripInfoFlex">
                            <div className="tripInfo">
                                <div className="sectionTitle" id="itineraryTitle">
                                    Itinerary
                                </div>
                                {markers.length > 0 ? markers.map((marker, index) => {
                                    return <Destination
                                        key={marker.address}
                                        address={marker.address}
                                        marker={marker}
                                        index={index}
                                    />
                                }) : <div id="noDestination"> add a destination to update your itinerary </div>}
                            </div>
                        </div>
                        <div id="saveBtn" onClick={() => history.push("/create/" + props.match.params.id + "0")}>
                            customize
                        </div>
                        <div id="fadeBlock">
                        </div>
                        <div id="block">
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