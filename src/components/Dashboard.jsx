import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});

    const validateToken = async (sessionId, token) => {
        const response = await fetch("http://localhost:5000/validate-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session_id": sessionId,
                "token": token,
            },
        });

        const data = await response.json();
        if (data.status !== 200) {
            navigate("/");
        }
        setEmployee(data.data);
    }

    // Helper function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }

    const logout = () => {
        localStorage.removeItem("token");
        // clear cookies from browser
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        navigate("/");
    }

    useEffect(() => {
        const sessionId = getCookie("sessionId");
        if (!sessionId) { navigate("/") }

        const token = localStorage.getItem("token");
        if (!token) { navigate("/") }

        // console.log("sessionId = ", sessionId);
        // console.log("token = ", token);

        validateToken(sessionId, token);



        // eslint-disable-next-line
    }, [navigate]);

    return (
        <div>
            <h3>Dashboard</h3>

            <br />
            <p><b>Name: </b>{`${employee.firstName} ${employee.lastName}` }</p>
            <p><b>Employee Id: </b>{employee.employeeId}</p>
            <p><b>EmployeeCode: </b>{employee.employeeCode}</p>
            <p><b>Designation Id: </b>{employee.designationId}</p>
            <p><b>Role Id: </b>{employee.roleId}</p>
            <p><b>Date Of Birth: </b>{formatDate(employee.dateOfBirth)}</p>
            <p><b>Image: </b>{employee.employeeImage}</p>

            <br />
            <button onClick={logout}>Logout</button>

        </div>
    )
}

export default Dashboard