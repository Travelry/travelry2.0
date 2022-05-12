import React, { useState, useContext, useEffect } from "react";
import AuthService from '../services/AuthService';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./styles/signUpStyle.css";

export default function SignUp(props) {
    const { setUser, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
    const [user, setTempUser] = useState({ username: "", password: "", password2: "" });
    const [typing1, setTyping1] = useState(false);
    const [typing2, setTyping2] = useState(false);
    const [typing3, setTyping3] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = e => {
        setTempUser({ ...user, [e.target.name]: e.target.value });
        setMessage("");
    }

    const resetForm = () => {
        setTempUser({ username: "", password: "", password2: "" });
    }

    async function register() {
        if (!user.username || !user.password || !user.password2) {
            setMessage({ msgBody: "Please fill out all fields", msgError: true });
        }
        else if (user.password !== user.password2) {
            setMessage({ msgBody: "Passwords do not match", msgError: true });
            setTempUser({ ...user, password: "", password2: "" });
        }
        else {
            setLoading(true);
            const data = await axios.post("/user/register", { user });
            const { message } = data.data
            if (!message.msgError) {
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
            } else if (message.errorType === "username") {
                setLoading(false);
                setMessage({ msgBody: "account already exists", msgError: true });
                resetForm();
            } else {
                setLoading(false);
                setMessage({ msgBody: "an error occurred", msgError: true });
                resetForm();
            }
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            props.cancel();
        }
    }, [])

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
                            Sign up to save
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
                        <div className="loginInputBg" style={typing3 ? { borderColor: "#0099d6" } : { borderColor: "rgb(213, 213, 213)" }}>
                            <input
                                className="loginInput"
                                placeholder="confirm password"
                                name="password2"
                                onBlur={() => setTyping3(false)}
                                onFocus={() => setTyping3(true)}
                                onSubmit={(e) => e.preventDefault()}
                                value={user.password2}
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
                            <div> have an account? </div>
                            <div id="switchLoginBtn" onClick={() => props.switch()}>
                                login
                            </div>
                        </div>
                    </div>
                    <div id="signUpBtn" onClick={() => register()}>
                        {loading ? <img id="spinnerGif" src="https://www.massage1.com/wp-content/plugins/bookerapi/images/loader.gif"></img> : "sign up"}
                    </div>
                </div>
            </div>
        </div>
    )
}