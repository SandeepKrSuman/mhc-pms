import { AuthContext } from '.';

import BookAppointment from '../pages/PatientDash/Tabs/BookAppointment';
import CardPaymentPatient from '../pages/PatientDash/Tabs/CardPayment';
import Feedback from '../pages/PatientDash/Tabs/Feedback';
import MakePaymentPatinet from '../pages/PatientDash/Tabs/MakePayment';
import MyAppointments from '../pages/PatientDash/Tabs/MyAppointments';
import Prescriptions from '../pages/PatientDash/Tabs/Prescriptions';
import UpiPaymentPatient from '../pages/PatientDash/Tabs/UpiPayment';
import ViewLocation from '../pages/PatientDash/Tabs/ViewLocation';
import PatientDash from '../pages/PatientDash';

const patientRouter = (setUserType) => [
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