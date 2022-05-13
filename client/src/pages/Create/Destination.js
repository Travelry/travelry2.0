import React from "react";
import "./destinationStyle.css";

export default function Destination(props) {
    return (
        <div className="itinItem">
            <div className="itinAddress">
                {props.address}
            </div>
        </div>
    );
}