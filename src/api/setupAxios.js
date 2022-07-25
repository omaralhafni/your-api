import axios from "axios";

const { REACT_APP_URL } = process.env

const Axios = axios.create({
    baseURL: `${REACT_APP_URL}`,
});

Axios.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default class API {
    static async get(url = "", config = {}) {
        return Axios.get(url, config);
    }

    static async post(url, body, config = {}) {
        return Axios.post(url, body, config);
    }

    static async put(url, body, config = {}) {
        return Axios.put(url, body, config);
    }

    static async delete(url, config = {}) {
        return Axios.delete(url, config);
    }
}
