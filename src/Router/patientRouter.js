import PatientDash from '../components/Dashboards/PatientDash/PatientDash';
import BookAppointment from '../components/Dashboards/PatientDash/Tabs/BookAppointment';
import CardPaymentPatient from '../components/Dashboards/PatientDash/Tabs/CardPayment';
import Feedback from '../components/Dashboards/PatientDash/Tabs/Feedback';
import MakePaymentPatinet from '../components/Dashboards/PatientDash/Tabs/MakePayment';
import MyAppointments from '../components/Dashboards/PatientDash/Tabs/MyAppointments';
import Prescriptions from '../components/Dashboards/PatientDash/Tabs/Prescriptions';
import UpiPaymentPatient from '../components/Dashboards/PatientDash/Tabs/UpiPayment';
import ViewLocation from '../components/Dashboards/PatientDash/Tabs/ViewLocation';

const patientRouter = [
    {
        path: '/dashboard/patient',
        element: <AuthContext.Provider value={{ setUserType }}>
            <PatientDash />
        </AuthContext.Provider>
    },
    {
        path: "/dashboard/patient/view-location",
        element: <ViewLocation />
    },
    {
        path: "/dashboard/patient/my-appointments",
        element: <AuthContext.Provider value={{ setUserType }}>
            <MyAppointments />
        </AuthContext.Provider>
    },
    {
        path: "/dashboard/patient/book-appointment",
        element: <AuthContext.Provider value={{ setUserType }}>
            <BookAppointment />
        </AuthContext.Provider>
    },
    {
        path: "/dashboard/patient/make-payment",
        element: <AuthContext.Provider value={{ setUserType }}>
            <MakePaymentPatinet />
        </AuthContext.Provider>
    },
    {
        path: "/dashboard/patient/make-payment/card-payment",
        element: <AuthContext.Provider value={{ setUserType }}>
            <CardPaymentPatient />
        </AuthContext.Provider>
    },
    {
        path: "/dashboard/patient/make-payment/upi-payment",
        element: <AuthContext.Provider value={{ setUserType }}>
            <UpiPaymentPatient />
        </AuthContext.Provider>
    },
    {
        path: "/dashboard/patient/prescriptions",
        element: <AuthContext.Provider value={{ setUserType }}>
            <Prescriptions />
        </AuthContext.Provider>
    },
    {
        path: "/dashboard/patient/feedback",
        element: <AuthContext.Provider value={{ setUserType }}>
            <Feedback />
        </AuthContext.Provider>
    },
]

export default patientRouter