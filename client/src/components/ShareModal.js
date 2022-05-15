import React, { useState } from "react";
import "./styles/shareModalStyle.css";

export default function ShareModal(props) {
    const [copied, setCopied] = useState(false);

    function shareTrip() {
        var copyText = document.getElementById("shareInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        setCopied(true);
    }


    return (
        <div id="shareBg">
            <div id="shareArea">
                <div id="closeLoginBtn" onClick={() => props.cancel()}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                    </svg>
                </div>
                <div id="shareFlex">
                    <div id="shareBody">
                        <div id="shareTitle">
                            Share this trip
                        </div>



                        <div id="urlFlex">


                            <div id="tripUrlArea">
                                <input type="text" value={window.location} id="shareInputDisplay" />
                                <div style={{ display: "none" }}>
                                    <input type="text" value={window.location} id="shareInput" />
                                </div>
                            </div>

                            {copied ?
                                <svg onClick={() => shareTrip()} id="copyIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="#f33f3f" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"></path>
                                </svg>

                                :
                                <svg onClick={() => shareTrip()} id="copyIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.5 15.25V15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5V6.5"></path>
                                    <rect width="10.5" height="10.5" x="8.75" y="8.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" rx="2"></rect>
                                </svg>

                            }


                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}