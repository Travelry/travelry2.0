import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ProfileTripPreview from "../../components/ProfileTripPreview";
import axios from "axios";
import "./profileStyle.css";

export default function Profile() {
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [created, setCreated] = useState([]);

    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        try {
            const res = await axios.get("/user/info");
            console.log(res)
            setUsername(res.data.username);
            setCreated(res.data.trips.reverse());
        } catch (err) {
            console.log(err);
        }
    }

    async function logOutHandler() {
        try {
            const res = await axios.get("/user/logout");
            if (res.data.success) {
                setUser(res.data.user);
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Header signup={null} cancelOther={() => null} />
            <Sidebar currentPage="profile" />
            <div id="profilePage">
                <div id="profileFlex">
                    <div id="profileArea">


                        {/*                                 
                                <div id="imageNameFlex">
                                    <div id="profileImage">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                                        </svg>
                                    </div>
                                    <div id="profileName">
                                        {username}
                                    </div>
                                </div> */}

                        <div id="profileName">
                            {username}
                        </div>
                        <div id="myTrips">
                            my trips
                        </div>

                        <div id="profileLine">


                        </div>
                        {
                            created.map((trip, index) => {
                                return <ProfileTripPreview
                                    key={trip.address + index}
                                    address={trip.address}
                                    trip={trip}
                                    index={index}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}