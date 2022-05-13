import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/tripPreviewStyle.css";

export default function TripPreview(props) {
    const history = useHistory();
    const [backSize, setBackSize] = useState("100%");
    const [liked, setLiked] = useState(false);

    return (
        <div id="tripPreviewFlex">
            <div onClick={() => history.push("/trip/627c04304f90a66241f33370")} id="tripPreview" onMouseEnter={() => setBackSize("110%")} onMouseLeave={() => setBackSize("100%")} style={{ backgroundImage: "url(https://wallpapercave.com/wp/rI3JaNl.jpg)", backgroundSize: backSize }}>
                <div className="previewTitle">
                    Tahiti
                </div>
                <div className="previewPrice">
                    From $625
                </div>


                <svg onClick={() => setLiked(!liked)} className="bookmark" width="24" height="24" fill={liked ? "white" : "none"} viewBox="0 0 24 24">
                    <path fill-rule="evenodd" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z" clip-rule="evenodd"></path>
                </svg>


                <div className="previewFade">

                </div>
            </div>
        </div>
    );
}