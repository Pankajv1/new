import axios from 'axios';

export default {
    get: (url, headers) => {
        return axios.get(url, { headers });
    },
    post: (url, payload) => {
        const token = localStorage.getItem('token');
        const headers = {
            authorization: `${token}`,
            Accept: 'application/json'
        };
        return axios.post(url, payload, { headers });
    },
    delete: (url, headers) => {
        return axios.get(url, { headers });
    },
    put: (url, payload) => {
        return axios.post(url, payload);
    },
    patch: (url, payload) => {
        const token = localStorage.getItem('token');
        const headers = {
            authorization: `${token}`,
            Accept: 'application/json'
        };
        return axios.patch(url, payload,{ headers });
    },
};
