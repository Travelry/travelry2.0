import React, { useState, useContext, useEffect } from "react";
import Map from "./Map";
import AutoSearch from "./AutoSearch";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import moment from "moment";
import { MapContext } from "../../context/MapContext";
import { AuthContext } from "../../context/AuthContext";
import Destination from "./Destination";
import SignUp from "../../components/SignUp";
import Login from "../../components/Login";
import axios from "axios";
import "./homeStyle.css";
import arrow from "../../assets/share.png";

export default function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { scriptLoaded, markers, setScriptLoaded, tripId, setTripId } = useContext(MapContext);
  const [value, onChange] = useState([new Date(), new Date()]);
  const [selectingDates, setSelectingDates] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [signingUp, setSigningUp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [tripTitle, setTripTitle] = useState("Trip 1");
  const [editingTitle, setEditingTitle] = useState(false);
  const [hoveringTitle, sethHoveringTitle] = useState(false);
  const [saved, setSaved] = useState(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  function changeDates(item) {
    setState([item.selection]);
    setStartDate(item.selection.startDate)
    setEndDate(item.selection.endDate)
    console.log(item.selection);
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
          if (tripId) {
            const res = await axios.post("/trip/save", { id: tripId, trip: { title: tripTitle, markers, startDate, endDate } });
            console.log(res)
          } else {
            const res = await axios.post("/trip/new", { trip: { title: tripTitle, markers, startDate, endDate } });
            console.log(res)
            setTripId(res.data.trip._id)
          }
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      setSigningUp(true);
    }
  }

  function switchToLogin() {
    setSigningUp(false)
    setLoggingIn(true)
  }

  function switchToSignup() {
    setSigningUp(true)
    setLoggingIn(false)
  }

  function changeTitle(e) {
    setTripTitle(e.target.value);
    setSaved(false);
  }

  useEffect(() => {
    setSaved(false);
  }, [markers]);

  return (
    <div>
      <div id="headerHome">

      </div>
      {loggingIn ? <Login switch={() => switchToSignup()} cancel={() => setLoggingIn(false)} /> : null}
      {signingUp ? <SignUp switch={() => switchToLogin()} cancel={() => setSigningUp(false)} /> : null}
      <div id="sidebar">
        <div id="sideBody">
          <div id="tripHero">
            <img id="heroImg" src="https://htmlcolors.com/gradients-images/108-blue.jpg"></img>
          </div>
          <div id="headerFlex">
            <div id="tripHeader">
              <div id="tripTitle" onMouseEnter={() => sethHoveringTitle(true)} onMouseLeave={() => sethHoveringTitle(false)} style={editingTitle || hoveringTitle ? { backgroundColor: "#F3F4F5" } : { backgroundColor: "white" }}>
                <input value={tripTitle} onChange={(e) => changeTitle(e)} id="tripTitleInput" onBlur={() => setEditingTitle(false)} onFocus={() => setEditingTitle(true)}></input>
              </div>
              <div id="datesFlex" onClick={() => setSelectingDates(!selectingDates)}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" id="calendarIcon">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"></path>
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 4.75V8.25"></path>
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 4.75V8.25"></path>
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 10.75H16.25"></path>
                </svg>
                <div id="dates">
                  {moment(startDate).format('l')} - {moment(endDate).format('l')}
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
              <div id="tripNotes">
                <div className="sectionTitle">
                  add a destination
                </div>
              </div>
              <AutoSearch />

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
          <div id="saveBtn" onClick={() => saveTrip()}>
            {saved ?
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"></path>
              </svg>
              : "save trip"
            }
          </div>
        </div>
      </div>
      <Map />
    </div>
  );
}