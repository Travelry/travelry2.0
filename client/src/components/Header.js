import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "./styles/headerStyle.css";

export default function Header(props) {
    const [signingUp, setSigningUp] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        if(props.signup) {
            setSigningUp(true);
        } else if(props.login) {
            setLoggingIn(true);
        }
    }, [props.signup, props.login]);

    function switchToLogin() {
        setSigningUp(false)
        setLoggingIn(true)
      }
    
      function switchToSignup() {
        setSigningUp(true)
        setLoggingIn(false)
      }

      function cancel() {
        setLoggingIn(false);
        setSigningUp(false);
        props.cancelOther();
      }
    

    return (
        <div id="headerHome">
            {loggingIn ? <Login switch={() => switchToSignup()} cancel={() => cancel()} /> : null}
            {signingUp ? <SignUp switch={() => switchToLogin()} cancel={() => cancel()} /> : null}

            <svg id="headerLogo" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="7.25" stroke="#01bbff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                <path stroke="#01bbff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 12C15.25 16.5 13.2426 19.25 12 19.25C10.7574 19.25 8.75 16.5 8.75 12C8.75 7.5 10.7574 4.75 12 4.75C13.2426 4.75 15.25 7.5 15.25 12Z"></path>
                <path stroke="#01bbff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12H12H19"></path>
            </svg>
            <div id="headerTitle">
                xplor
            </div>
            <div id="headerBtns">
            <div id="loginHeader" onClick={() => setLoggingIn(true)}>
                login
            </div>
            <div id="signUpHeader" onClick={() => setSigningUp(true)}>
                sign up
            </div>
            </div>
        </div>
    );
}