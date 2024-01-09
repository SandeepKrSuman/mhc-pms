import { AuthContext } from '.';

import BookAppointmentStaff from '../pages/StaffDash/Tabs/BookAppointment';
import CancelAppointment from '../pages/StaffDash/Tabs/CancelAppointment';
import CardPaymentStaff from '../pages/StaffDash/Tabs/CardPayment';
import CashPayment from '../pages/StaffDash/Tabs/CashPayment';
import MakePaymentStaff from '../pages/StaffDash/Tabs/MakePayment';
import UpiPaymentStaff from '../pages/StaffDash/Tabs/UpiPayment';
import StaffDash from '../pages/StaffDash/StaffDash';

const staffRouter = (setUserType) => [
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