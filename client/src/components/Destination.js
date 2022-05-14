import React, { useContext, useState } from "react";
import { MapContext } from "../context/MapContext";
import "./styles/destinationStyle.css";

export default function Destination(props) {
    const { markers, setMarkers, valueChanged, setValueChanged, setCenter } = useContext(MapContext);
    const [open, setOpen] = useState(false);


    function selectItem() {
        setCenter({ lat: props.marker.lat, lng: props.marker.lng })
        setOpen(!open);
    }

    return (
        <div className="itinItem" onClick={() => selectItem()}>
            <div className="itemRow">
                <svg className="itemCarat" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 10.75L12 14.25L8.75 10.75"></path>
                </svg>

                <div className="itinAddress">
                    {props.address}
                </div>

            </div>

            <div className="itemInfo" style={open ? { display: "initial" } : { display: "none" }}>
                <div className="itemDescriptionArea">
                    {props.marker.description}
                </div>

                <div className="itemExpenses">
                    {markers[props.index]?.expenses?.length > 0 ?
                        <div>
                            <div className="expensesTitle">
                                expenses
                            </div>
                            {markers[props.index].expenses.map((expense, index) => {
                                return <div className="itemExpense2">
                                    ${expense.amount} for {expense.activity}
                                </div>
                            })}
                        </div>
                        : null}
                </div>
            </div>
        </div>
    );

}