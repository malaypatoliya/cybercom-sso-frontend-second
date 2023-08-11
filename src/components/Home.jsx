import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = "http://localhost:5000";



const Home = () => {

    const navigate = useNavigate();
    const [sessionId, setSessionId] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const sessionId = getCookie("sessionId");
        const url = new URL(window.location.href);
        const serviceUrl = url.protocol + "//" + url.host + url.pathname;

        if (!sessionId) {
            window.location.href = `${SERVER_URL}/login?serviceUrl=${serviceUrl}`;
        }

        // get the params from the url 
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            window.location.href = `${SERVER_URL}/login?serviceUrl=${serviceUrl}`;
        }

        // console.log("sessionId = ", sessionId);
        // console.log("token = ", token);
        setSessionId(sessionId);
        setToken(token);

        localStorage.setItem("token", token);

    }, []);

    // Helper function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    return (
        <div>
            <h3>You are logged in... </h3>
            <br />
            <p><b>Session Id: </b>{sessionId}</p>
            <p><b>Token: </b>{token}</p>
            <br />
            <button onClick={() => navigate("/dashboard")}>Go To Dashboard</button>
        </div>
    );
}
export default Home;