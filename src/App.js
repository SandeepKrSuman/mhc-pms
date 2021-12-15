import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/dashboard/staff" excact element={<StaffDash />} />
        <Route path="/dashboard/doctor" excact element={<DoctorDash />} />
        <Route
          path="/dashboard/doctor/appointments"
          exact
          element={<Appointments />}
        />
        <Route
          path="/dashboard/doctor/upload-prescription"
          exact
          element={<UploadPrescription />}
        />
        <Route path="/dashboard/admin" excact element={<AdminDash />} />
        <Route path="/dashboard/patient" excact element={<PatientDash />} />
        <Route
          path="/dashboard/patient/view-location"
          excact
          element={<ViewLocation />}
        />
        <Route
          path="/dashboard/patient/my-appointments"
          excact
          element={<MyAppointments />}
        />
        <Route
          path="/dashboard/patient/book-appointment"
          excact
          element={<BookAppointment />}
        />
        <Route
          path="/dashboard/patient/make-payment"
          excact
          element={<MakePaymentPatinet />}
        />
        <Route
          path="/dashboard/patient/make-payment/card-payment"
          excact
          element={<CardPaymentPatient />}
        />
        <Route
          path="/dashboard/patient/make-payment/upi-payment"
          excact
          element={<UpiPaymentPatient />}
        />
        <Route
          path="/dashboard/patient/prescriptions"
          excact
          element={<Prescriptions />}
        />
        <Route
          path="/dashboard/patient/feedback"
          excact
          element={<Feedback />}
        />
        <Route
          path="/dashboard/staff/book-appointment"
          excact
          element={<BookAppointment />}
        />
        <Route
          path="/dashboard/staff/cancel-appointment"
          element={<CancelAppointment />}
        />
        <Route
          path="/dashboard/staff/make-payment"
          excact
          element={<MakePaymentStaff />}
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
        <Route path="/dashboard/admin/doctors'-list" element={<DocList />} />
        <Route
          path="/dashboard/admin/doctors'-list/add-new"
          element={<AddNew />}
        />
        <Route
          path="/dashboard/admin/generate-stats"
          element={<GenerateStats />}
        />
        <Route
          path="/dashboard/admin/verify-signup"
          element={<VerifySignUp />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
