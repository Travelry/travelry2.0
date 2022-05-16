import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Map from "../../components/Map";
import AutoSearch from "./AutoSearch";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import moment from "moment";
import { MapContext } from "../../context/MapContext";
import { AuthContext } from "../../context/AuthContext";
import EditDestination from "./EditDestination";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import "./createStyle.css";

export default function Create(props) {
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);
  const { markers, setMarkers, valueChanged, newDest, setNewDest } = useContext(MapContext);
  const [selectingDates, setSelectingDates] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [hoveringTitle, sethHoveringTitle] = useState(false);
  const [saved, setSaved] = useState(false);
  const [trip, setTrip] = useState({ title: "new trip", startDate: new Date(), endDate: new Date() });
  const [newTrip, setNewTrip] = useState(true);
  const [typing, setTyping] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  function changeDates(item) {
    setState([item.selection]);
    console.log(item.selection);
    setTrip({ ...trip, startDate: item.selection.startDate, endDate: item.selection.endDate });
    if (item.selection.endDate !== item.selection.startDate) {
      setTimeout(() => {
        setSelectingDates(false);
      }, 100);
    }
    setSaved(false);
  }

  async function saveTrip() {
    if (isAuthenticated) {
      if (!saved) {
        setSaved(true);
        try {
          if (newTrip) {
            const res = await axios.post("/trip/new", { trip: { title: trip.title, markers, startDate: trip.startDate, endDate: trip.endDate, tripImage: trip.tripImage } });
            // handle errors ===========================================
            history.push("/create/" + res.data.trip._id)
          } else {
            const res = await axios.post("/trip/save", { id: props.match.params.id, trip: { title: trip.title, markers, startDate: trip.startDate, endDate: trip.endDate, tripImage: trip.tripImage } });
            console.log(res)
          }
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      setSigningUp(true);
    }
  }

  function changeTitle(e) {
    setTrip({ ...trip, title: e.target.value });
    setSaved(false);
  }

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

  function removeItem(index) {
    setMarkers(markers => (markers.filter((mark, i) => i !== index)));
    setSaved(false);
  }

  function changeTripImage(e) {
    setImageError(false);
    setSaved(false);
    setTrip({ ...trip, tripImage: e.target.value })
  }

  useEffect(() => {
    setMarkers([]);
    if (props.match.params.id) {
      getTripData(props.match.params.id.slice(0, 24));
      if (props.match.params.id.length === 24) {
        setNewTrip(false);
      }
    }
  }, [props.match.params.id]);

  useEffect(() => {
    setSaved(false);
  }, [valueChanged, markers]);

  useEffect(() => {
    if (newDest) {
      var objDiv = document.getElementById("contentBody");
      objDiv.scrollTop = objDiv.scrollHeight;
      setNewDest(false);
    }
  }, [newDest]);

  return (
    <div id="home">

      <Header signup={signingUp} cancelOther={() => setSigningUp(false)} />

      <Sidebar currentPage="create" />

      <div id="homeArea">
        <div id="contentBody">
          <div id="sideBody">
            <div id="tripHeaderFlex">
              <div id="tripHeader">
                <div id="editTripTitle" onMouseEnter={() => sethHoveringTitle(true)} onMouseLeave={() => sethHoveringTitle(false)} style={editingTitle || hoveringTitle ? { backgroundColor: "#F3F4F5" } : { backgroundColor: "white" }}>
                  <input value={trip.title} onChange={(e) => changeTitle(e)} id="tripTitleInput" onBlur={() => setEditingTitle(false)} onFocus={() => setEditingTitle(true)}></input>
                </div>
                <div id="datesFlex" onClick={() => setSelectingDates(!selectingDates)}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" id="calendarIcon">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"></path>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 4.75V8.25"></path>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 4.75V8.25"></path>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 10.75H16.25"></path>
                  </svg>
                  <div id="editDates">
                    {moment(trip.startDate).format('l')} - {moment(trip.endDate).format('l')}
                  </div>
                </div>
                <div id="dateSelector" style={selectingDates ? { display: "initial" } : { display: "none" }}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => changeDates(item)}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    showDateDisplay={false}
                  />
                </div>
                <div id="shareBtn">
                  <svg width="24" height="24" viewBox="0 0 640 512" color="#6c757d"><path fill="currentColor" d='M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'></path></svg>
                </div>
              </div>
            </div>
            <div className="tripInfoFlex">
              <div className="tripInfo">


                {trip.tripImage && !imageError ?
                  <div id="editImageBg">
                    <svg onClick={() => setTrip({ ...trip, tripImage: "" })} className="removeImage" width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                      <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                    </svg>
                    <div className="editImageFade">

                    </div>
                    <img id="editImage" src={trip.tripImage} onError={() => setImageError(true)}></img>
                  </div>
                  :
                  <div>
                    <div className="sectionTitle">
                      add an image
                    </div>

                    <div id="autoSearch" style={typing ? { borderColor: "#0099d6" } : { borderColor: "rgb(213, 213, 213)" }}>
                      <input
                        id="autoSearchInput"
                        placeholder="image url"
                        onBlur={() => setTyping(false)}
                        onFocus={() => setTyping(true)}
                        onSubmit={(e) => e.preventDefault()}
                        onChange={(e) => changeTripImage(e)}
                        value={trip.tripImage}
                      />
                    </div>

                  </div>

                }


                <div className="sectionTitle">
                  add a destination
                </div>

                <AutoSearch />

                <div className="sectionTitle" id="itineraryTitle">
                  Itinerary
                </div>


                {markers.length > 0 ? markers.map((marker, index) => {
                  return <EditDestination
                    key={marker.address + index}
                    address={marker.address}
                    removeItem={() => removeItem(index)}
                    marker={marker}
                    index={index}
                  />
                }) : <div id="noDestination"> add a destination to update your itinerary </div>}
              </div>
            </div>
            <div id="saveBtn" onClick={() => saveTrip()}>
              {saved ?
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"></path>
                </svg>
                : "save trip"
              }
            </div>
            <div id="fadeBlock">

            </div>
            <div id="block">

            </div>
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
}