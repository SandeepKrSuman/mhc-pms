import { request } from './request';

const authApi = {
    signup: (body) => request("post", `/auth/signup`, body),

    signin: (body) => request("post", `/auth/signin`, body),

    refreshToken: (body) => request("post", `/auth/refresh`, body),

    logout: (body) => request("delete", `/auth/logout`, body),
}

export default authApi;