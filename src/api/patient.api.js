import { request } from './request';

const patientApi = {
    myAppointments: () => request('get', `/patient/appointments`),

    cancelAppointment: (body) => request("delete", `/patient/appointments/cancel`, body),

    prescriptions: () => request("get", `/patient/prescriptions`),

    writeFeedback: (body) => request("post", `/patient/feedback/write`, body),

    deleteFeedback: (body) => request("post", `/patient/feedback/delete`, body),

    patientFeedbacks: () => request("get", `/patient/feedbacks`),
}

export default patientApi;