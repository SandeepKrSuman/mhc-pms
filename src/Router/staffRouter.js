import StaffDash from '../components/Dashboards/StaffDash/StaffDash';
import BookAppointmentStaff from '../components/Dashboards/StaffDash/Tabs/BookAppointment';
import CancelAppointment from '../components/Dashboards/StaffDash/Tabs/CancelAppointment';
import CardPaymentStaff from '../components/Dashboards/StaffDash/Tabs/CardPayment';
import CashPayment from '../components/Dashboards/StaffDash/Tabs/CashPayment';
import MakePaymentStaff from '../components/Dashboards/StaffDash/Tabs/MakePayment';
import UpiPaymentStaff from '../components/Dashboards/StaffDash/Tabs/UpiPayment';

const staffRouter = [
    {
        path: '/dashboard/staff',
        element: <AuthContext.Provider value={{ setUserType }}>
            <StaffDash />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/staff/book-appointment`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <BookAppointmentStaff />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/staff/cancel-appointment`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <CancelAppointment />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/staff/make-payment`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <MakePaymentStaff />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/staff/make-payment/card-payment`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <CardPaymentStaff />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/staff/make-payment/upi-payment`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <UpiPaymentStaff />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/staff/make-payment/cash-payment`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <CashPayment />
        </AuthContext.Provider>
    }
]

export default staffRouter