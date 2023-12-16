import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE}/api`;

const axiosInstance = axios.create({
    // baseURL: 'https://medal.onrender.com/api',
    baseURL: baseUrl,
    // timeout: 6000,
});


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

export const request = (method, url, data, config) => {
    switch (method) {
        case 'post':
            return axiosInstance.post(url, data, config);
        case 'get':
            return axiosInstance.get(url, { params: data, ...config });
        case 'delete':
            return axiosInstance.delete(url, { params: data, ...config });
        case 'put':
            return axiosInstance.put(url, data, config);
        default:
            break;
    }
};
