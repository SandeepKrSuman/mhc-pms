import { AuthContext } from '.';

import Appointments from '../pages/DoctorDash/Tabs/Appointments';
import UploadPrescription from '../pages/DoctorDash/Tabs/UploadPrescription';
import DoctorDash from '../pages/DoctorDash/DoctorDash';

const doctorRouter = (setUserType) => [
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