import React, { useState, useContext } from "react";
import AuthService from '../services/AuthService';
import { AuthContext } from "../context/AuthContext";
import "./styles/loginStyle.css";

export default function Login(props) {
    const { setUser, setIsAuthenticated} = useContext(AuthContext);
    const [user, setTempUser] = useState({ username: "", password: "" });
    const [typing1, setTyping1] = useState(false);
    const [typing2, setTyping2] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = e => {
        setTempUser({ ...user, [e.target.name]: e.target.value });
        setMessage("");
    }

    const resetForm = () => {
        setTempUser({ username: "", password: ""});
    }

    async function login() {
        if (!user.username || !user.password) {
            setMessage({ msgBody: "Please fill out all fields", msgError: true });
        }
        else {
            setLoading(true);
            AuthService.login(user).then(data => {
                const { isAuthenticated, user } = data;
                if (isAuthenticated) {
                    setUser(user);
                    setIsAuthenticated(true);
                    setTimeout(() => {
                        props.cancel();
                    }, 1500);
                } else {
                    setLoading(false);
                    setMessage({ msgBody: "an error occurred", msgError: true });
                    resetForm();
                }
            });
        }
    }

    return (
        <div id="loginBg">
            <div id="loginArea">
                <div id="closeLoginBtn" onClick={() => props.cancel()}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                    </svg>
                </div>
                <div id="loginFlex">
                    <div id="loginBody">
                        <div id="loginTitle">
                            Share your trip with friends.
                        </div>
                        <div id="loginSub">
                            Login to save
                        </div>
                        <div className="loginInputBg" style={typing1 ? { borderColor: "#0099d6" } : { borderColor: "rgb(213, 213, 213)" }}>
                            <input
                                className="loginInput"
                                placeholder="email"
                                name="username"
                                onBlur={() => setTyping1(false)}
                                onFocus={() => setTyping1(true)}
                                onSubmit={(e) => e.preventDefault()}
                                value={user.username}
                                onChange={onChange}
                            />
                        </div>
                        <div className="loginInputBg" style={typing2 ? { borderColor: "#0099d6" } : { borderColor: "rgb(213, 213, 213)" }}>
                            <input
                                className="loginInput"
                                placeholder="password"
                                name="password"
                                onBlur={() => setTyping2(false)}
                                onFocus={() => setTyping2(true)}
                                onSubmit={(e) => e.preventDefault()}
                                value={user.password}
                                onChange={onChange}
                                type="password"
                            />
                        </div>
                        {message ?
                            <div id="signUpMsg">
                                *{message.msgBody}
                            </div>
                            : null}
                        <div id="switchToLogin">
                            <div> don't have an account? </div>
                            <div id="switchLoginBtn" onClick={() => props.switch()}>
                                sign up
                            </div>
                        </div>
                    </div>
                    <div id="signUpBtn" onClick={() => login()}>
                        {loading ? <img id="spinnerGif" src="https://www.massage1.com/wp-content/plugins/bookerapi/images/loader.gif"></img> : "login"}
                    </div>
                </div>
            </div>
        </div>
    )
}