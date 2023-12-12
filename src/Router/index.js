import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import jwt from "jsonwebtoken";
import HomePage from '../components/HomePage/HomePage';
import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';
import AdminDash from '../components/Dashboards/AdminDash/AdminDash';
import DocList from '../components/Dashboards/AdminDash/Tabs/DocList';
import AddNew from '../components/Dashboards/AdminDash/Tabs/AddNew';
import GenerateStats from '../components/Dashboards/AdminDash/Tabs/GenerateStats';
import VerifySignUp from '../components/Dashboards/AdminDash/Tabs/VerifySignUp';
import Feedbacks from '../components/Dashboards/AdminDash/Tabs/Feedbacks';
import adminRouter from './adminRouter';
import doctorRouter from './doctorRouter';
import staffRouter from './staffRouter';

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
        userType === "admin" && { ...adminRouter },
        userType === "doctor" && { ...doctorRouter },
        userType === "staff" && { ...staffRouter },
        {
            path: '*',
            element: <AuthContext.Provider value={{ userType }}>
                <Page404 />
            </AuthContext.Provider>,
            // loader: async ({ params }) => await getonetutorial(params.tutorialID)
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}
