import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/profileTripPreviewStyle.css";

export default function ProfileTripPreview(props) {
    const history = useHistory();
    const [backSize, setBackSize] = useState("120%");
    const [liked, setLiked] = useState(false);
    const [price, setPrice] = useState(0);
    const [tripImage,setTripImage] = useState(props.trip.tripImage || "https://img.wallpapersafari.com/desktop/1600/900/83/47/uS3HZy.png")

    useEffect(() => {
        countCash();
        if(props.trip.tripImage && props.trip.markers.length > 0) {
            console.log(props.trip._id);
        }
    }, []);

    async function countCash() {
        let amount = 0;
        if (props.trip.markers) {
            props.trip.markers.forEach(marker => {
                if (marker.expenses) {
                    marker.expenses.forEach(expense => {
                        amount = amount + parseFloat(expense.amount);
                    });
                }
            });
        }
        setPrice(amount);
    }

    return (
        <div id="tripPreviewFlex">
            <div onClick={() => history.push("/trip/" + props.trip._id)} id="proileTripPreview" onMouseEnter={() => setBackSize("130%")} onMouseLeave={() => setBackSize("120%")} style={{ backgroundImage: `url(${tripImage})`, backgroundSize: backSize }}>
                <div className="previewTitle">
                    {props.trip.title}
                </div>
                <div className="previewPrice">
                    From ${price}
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