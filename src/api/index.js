import authApi from './auth.api'
import bookingApi from './booking.api'
import doctorApi from './doctor.api'
import patientApi from './patient.api'
import userApi from './user.api'

const API = {
    ...authApi,
    ...bookingApi,
    ...doctorApi,
    ...patientApi,
    ...userApi,
}

export default API