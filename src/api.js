import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE}/api`;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/auth/refresh`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

const api = {
  signup: (body) => {
    return axios.post(`${baseUrl}/auth/signup`, body);
  },

  signin: (body) => {
    return axios.post(`${baseUrl}/auth/signin`, body);
  },

  refreshToken: (body) => {
    return axios.post(`${baseUrl}/auth/refresh`, body);
  },

  logout: (body) => {
    return axios.delete(`${baseUrl}/auth/logout`, body);
  },

  docList: () => {
    return axios.get(`${baseUrl}/doctor/list`);
  },

  addNew: (body) => {
    return axios.post(`${baseUrl}/doctor/new`, body);
  },

  updateFee: (body) => {
    return axios.post(`${baseUrl}/doctor/fee`, body);
  },

  unverified: () => {
    return axios.get(`${baseUrl}/users/unverified`);
  },

  verify: (body) => {
    return axios.post(`${baseUrl}/users/unverified/verify`, body);
  },

  reject: (body) => {
    return axios.delete(`${baseUrl}/users/unverified/reject`, body);
  },

  generateStats: () => {
    return axios.get(`${baseUrl}/generate/stats`);
  },

  patientFeedbacks: () => {
    return axios.get(`${baseUrl}/patient/feedbacks`);
  },

  bookAppointment: (body) => {
    return axios.post(`${baseUrl}/booking/appointment`, body);
  },

  duePayment: () => {
    return axios.get(`${baseUrl}/booking/duepayment`);
  },

  makePayment: (body) => {
    return axios.post(`${baseUrl}/booking/payment`, body);
  },

  myAppointments: () => {
    return axios.get(`${baseUrl}/patient/appointments`);
  },

  cancelAppointment: (body) => {
    return axios.delete(`${baseUrl}/patient/appointments/cancel`, body);
  },

  prescriptions: () => {
    return axios.get(`${baseUrl}/patient/prescriptions`);
  },

  writeFeedback: (body) => {
    return axios.post(`${baseUrl}/patient/feedback/write`, body);
  },

  deleteFeedback: (body) => {
    return axios.post(`${baseUrl}/patient/feedback/delete`, body);
  },

  uploadPrescription: (body) => {
    return axios.post(`${baseUrl}/doctor/prescription/upload`, body);
  },
};

export default api;
