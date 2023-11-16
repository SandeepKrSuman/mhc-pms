import { request } from './request';

const bookingApi = {
    bookAppointment: (body) => request("post", `/booking/appointment`, body),

    duePayment: () => request("get", `/booking/duepayment`),

    makePayment: (body) => request("post", `/booking/payment`, body),
}

export default bookingApi;