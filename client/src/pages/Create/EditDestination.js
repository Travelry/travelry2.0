import React, {useContext, useState} from "react";
import { MapContext } from "../../context/MapContext";
import "./editDestinationStyle.css";

export default function EditDestination(props) {
    const { markers, setMarkers, valueChanged, setValueChanged } = useContext(MapContext);
    const [descr, setDescr] = useState(props.marker.description);

    function editDescription(e) {
        const newDescription = e.target.value;
        const newMarkers = markers;
        setDescr(e.target.value)
        newMarkers.splice(props.index, props.index + 1, { lat: props.marker.lat, lng: props.marker.lng, address: props.marker.address, description: newDescription });
        newMarkers.filter((mark, i) => i !== props.index);
        setMarkers(newMarkers);
        setValueChanged(!valueChanged);

        // setMarkers(markers => (markers.splice(props.index, props.index + 1, { lat: props.marker.lat, lng: props.marker.lng, address: props.marker.address, description: newDescription })));
        // setMarkers(markers => (markers.filter((mark, i) => i !== props.index)));
    }
    
    

    return (
        <div className="itinItem">
            <div className="itemRow">
                <svg className="itemCarat" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 10.75L12 14.25L8.75 10.75"></path>
                </svg>

                <div className="itinAddress">
                    {props.address}
                </div>

                <svg onClick={() => props.removeItem()} className="removeItem" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"></path>
                    <path fill="currentColor" d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"></path>
                    <path fill="currentColor" d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"></path>
                </svg>

            </div>

            <div className="itemDescription">
                <textarea onChange={(e) => editDescription(e)} value={descr} className="itemInput" placeholder="enter a description"></textarea>
            </div>

            <div className="expensesTitle">
                expenses
            </div>


            <div className="itemExpense2">
                <div className="expensePrice2">
                    $60
                </div>
                <div className="expenseFor">
                    for
                </div>
                <div className="expenseTitle">
                    surfing
                </div>
                <svg className="removeExpense" width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                </svg>
            </div>
            <div className="itemExpense2">
                <div className="expensePrice2">
                    $60
                </div>
                <div className="expenseFor">
                    for
                </div>
                <div className="expenseTitle">
                    sky diving
                </div>
                <svg className="removeExpense" width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                </svg>
            </div>
            <div className="itemExpense2">
                <div className="expensePrice2">
                    $60
                </div>
                <div className="expenseFor">
                    for
                </div>
                <div className="expenseTitle">
                    movies
                </div>
                <svg className="removeExpense" width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                </svg>
            </div>
            <div className="addItemExpense">
                <div className="plusItemExpense">
                    <svg width="28" height="18" fill="none" viewBox="0 0 24 24">
                        <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 5.75V18.25"></path>
                        <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.25 12L5.75 12"></path>
                    </svg>

                </div>
                <div className="addExpenseText">
                    add an expense
                </div>
            </div>



        </div>
    );

}