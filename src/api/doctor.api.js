import { request } from './request';

const doctorApi = {
    docList: () => request("get", `/doctor/list`),

    addNew: (body) => request("post", `/doctor/new`, body),

    updateFee: (body) => request("post", `/doctor/fee`, body),

    uploadPrescription: (body) => request("post", `/doctor/prescription/upload`, body),
}

export default doctorApi;