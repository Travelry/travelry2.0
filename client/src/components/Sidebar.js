import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/sidebarStyle.css";

export default function Sidebar(props) {
    const history = useHistory();

    return (
        <div id="sideBar">
            <div id="sideIconFlex">
                <div>
                    <svg onClick={() => history.push("/discover")} className="sideBarIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.25 11C18.25 15 12 19.25 12 19.25C12 19.25 5.75 15 5.75 11C5.75 7.5 8.68629 4.75 12 4.75C15.3137 4.75 18.25 7.5 18.25 11Z"></path>
                        <circle cx="12" cy="11" r="2.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                    </svg>

                    <svg onClick={() => history.push("/create")} className="sideBarIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 5.75V18.25"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.25 12L5.75 12"></path>
                    </svg>

                    <svg onClick={() => history.push("/profile")} className="sideBarIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                    </svg>
                </div>

            </div>
            <div className="iconIndicator" id={props.currentPage + "Indicator"}>

            </div>
        </div>
    );
}