import authApi from './auth.api'
import bookingApi from './booking.api'
import doctorApi from './doctor.api'
import patientApi from './patient.api'
import userApi from './user.api'

const api = {
    ...authApi,
    ...bookingApi,
    ...doctorApi,
    ...patientApi,
    ...userApi,
}

export default api