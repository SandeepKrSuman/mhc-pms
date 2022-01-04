import React, { useEffect, useState, Fragment } from "react";
import jwt from "jsonwebtoken";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Page404 from "./components/Page404/Page404";
import PatientDash from "./components/Dashboards/PatientDash/PatientDash";
import ViewLocation from "./components/Dashboards/PatientDash/Tabs/ViewLocation";
import MyAppointments from "./components/Dashboards/PatientDash/Tabs/MyAppointments";
import BookAppointment from "./components/Dashboards/PatientDash/Tabs/BookAppointment";
import MakePaymentPatinet from "./components/Dashboards/PatientDash/Tabs/MakePayment";
import CardPaymentPatient from "./components/Dashboards/PatientDash/Tabs/CardPayment";
import UpiPaymentPatient from "./components/Dashboards/PatientDash/Tabs/UpiPayment";
import Prescriptions from "./components/Dashboards/PatientDash/Tabs/Prescriptions";
import Feedback from "./components/Dashboards/PatientDash/Tabs/Feedback";
import StaffDash from "./components/Dashboards/StaffDash/StaffDash";
import BookAppointmentStaff from "./components/Dashboards/StaffDash/Tabs/BookAppointment";
import CancelAppointment from "./components/Dashboards/StaffDash/Tabs/CancelAppointment";
import MakePaymentStaff from "./components/Dashboards/StaffDash/Tabs/MakePayment";
import CardPaymentStaff from "./components/Dashboards/StaffDash/Tabs/CardPayment";
import UpiPaymentStaff from "./components/Dashboards/StaffDash/Tabs/UpiPayment";
import CashPayment from "./components/Dashboards/StaffDash/Tabs/CashPayment";
import DoctorDash from "./components/Dashboards/DoctorDash/DoctorDash";
import Appointments from "./components/Dashboards/DoctorDash/Tabs/Appointments";
import UploadPrescription from "./components/Dashboards/DoctorDash/Tabs/UploadPrescription";
import AdminDash from "./components/Dashboards/AdminDash/AdminDash";
import DocList from "./components/Dashboards/AdminDash/Tabs/DocList";
import AddNew from "./components/Dashboards/AdminDash/Tabs/AddNew";
import GenerateStats from "./components/Dashboards/AdminDash/Tabs/GenerateStats";
import VerifySignUp from "./components/Dashboards/AdminDash/Tabs/VerifySignUp";
import Feedbacks from "./components/Dashboards/AdminDash/Tabs/Feedbacks";

export const AuthContext = React.createContext();

function App() {
  const [userType, setUserType] = useState(
    jwt.decode(localStorage.getItem("accessToken"))?.userType
  );
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const payload = token && jwt.decode(token);
    const userTyp = payload && payload.userType;
    setUserType(userTyp && userTyp);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route
          path="/signin"
          exact
          element={
            userType ? (
              <Navigate to={`/dashboard/${userType}`} />
            ) : (
              <AuthContext.Provider value={{ setUserType }}>
                <SignIn />
              </AuthContext.Provider>
            )
          }
        />
        <Route
          path="/signup"
          exact
          element={
            userType ? <Navigate to={`/dashboard/${userType}`} /> : <SignUp />
          }
        />
        {/*----------> Admin Routes <------------- */}
        {userType === "admin" && (
          <Fragment>
            <Route
              path="/dashboard/admin"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <AdminDash />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/admin/doctors'-list"
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <DocList />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/admin/doctors'-list/add-new"
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <AddNew />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/admin/generate-stats"
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <GenerateStats />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/admin/verify-signup"
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <VerifySignUp />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/admin/generate-stats/feedbacks"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <Feedbacks />
                </AuthContext.Provider>
              }
            />
          </Fragment>
        )}
        {/*----------> Doctor Routes <------------- */}
        {userType === "doctor" && (
          <Fragment>
            <Route
              path="/dashboard/doctor"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <DoctorDash />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/doctor/appointments"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <Appointments />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/doctor/upload-prescription"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <UploadPrescription />
                </AuthContext.Provider>
              }
            />
          </Fragment>
        )}
        {/*----------> Patient Routes <------------- */}
        {userType === "patient" && (
          <Fragment>
            <Route
              path="/dashboard/patient"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <PatientDash />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/patient/view-location"
              exact
              element={<ViewLocation />}
            />
            <Route
              path="/dashboard/patient/my-appointments"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <MyAppointments />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/patient/book-appointment"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <BookAppointment linkto="patient" />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/patient/make-payment"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <MakePaymentPatinet />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/patient/make-payment/card-payment"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <CardPaymentPatient />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/patient/make-payment/upi-payment"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <UpiPaymentPatient />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/patient/prescriptions"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <Prescriptions />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/patient/feedback"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <Feedback />
                </AuthContext.Provider>
              }
            />
          </Fragment>
        )}
        {/*----------> Staff Routes <------------- */}
        {userType === "staff" && (
          <Fragment>
            <Route
              path="/dashboard/staff"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <StaffDash />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/staff/book-appointment"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <BookAppointmentStaff linkto="staff" />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/staff/cancel-appointment"
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <CancelAppointment />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/staff/make-payment"
              exact
              element={
                <AuthContext.Provider value={{ setUserType }}>
                  <MakePaymentStaff />
                </AuthContext.Provider>
              }
            />
            <Route
              path="/dashboard/staff/make-payment/card-payment"
              element={<CardPaymentStaff />}
            />
            <Route
              path="/dashboard/staff/make-payment/upi-payment"
              element={<UpiPaymentStaff />}
            />
            <Route
              path="/dashboard/staff/make-payment/cash-payment"
              element={<CashPayment />}
            />
          </Fragment>
        )}
        {/*----------> Unknown Routes <------------- */}
        <Route
          path="*"
          element={
            <AuthContext.Provider value={{ userType }}>
              <Page404 />
            </AuthContext.Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
