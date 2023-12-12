import DoctorDash from '../components/Dashboards/DoctorDash/DoctorDash';
import Appointments from '../components/Dashboards/DoctorDash/Tabs/Appointments';
import UploadPrescription from '../components/Dashboards/DoctorDash/Tabs/UploadPrescription';

const doctorRouter = [
    {
        path: '/dashboard/doctor',
        element: <AuthContext.Provider value={{ setUserType }}>
            <DoctorDash />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/doctor/appointments`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <Appointments />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/doctor/upload-prescription`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <UploadPrescription />
        </AuthContext.Provider>
    }
]

export default doctorRouter