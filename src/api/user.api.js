import { request } from './request';

const userApi = {
    unverified: () => request("get", `/users/unverified`),

    verify: (body) => request("post", `/users/unverified/verify`, body),

    reject: (body) => request("delete", `/users/unverified/reject`, body),

    generateStats: () => request("get", `/generate/stats`),
}

export default userApi;