import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import jwt from "jsonwebtoken";
import HomePage from '../pages/HomePage/HomePage';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import adminRouter from './adminRouter';
import doctorRouter from './doctorRouter';
import staffRouter from './staffRouter';
import patientRouter from './patientRouter';
import Page404 from '../pages/Page404/Page404';

export const AuthContext = React.createContext();

export default function MyRouter() {
    const [userType, setUserType] = useState(
        jwt.decode(localStorage.getItem("accessToken"))?.userType
    );
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const userTyp = payload && payload.userType;
        setUserType(userTyp && userTyp);
    }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/signin',
            element: userType ? (
                <Navigate to={`/dashboard/${userType}`} />
            ) : (
                <AuthContext.Provider value={{ setUserType }}>
                    <SignIn />
                </AuthContext.Provider>
            ),
        },
        {
            path: '/signup',
            element: userType ? <Navigate to={`/dashboard/${userType}`} /> : <SignUp />
        },
        userType === "admin" && { ...adminRouter(setUserType) },
        userType === "doctor" && { ...doctorRouter(setUserType) },
        userType === "patient" && { ...patientRouter(setUserType) },
        userType === "staff" && { ...staffRouter(setUserType) },
        {
            path: '*',
            element: <AuthContext.Provider value={{ userType }}>
                <Page404 />
            </AuthContext.Provider>,
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}
