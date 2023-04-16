import axios from "axios";

//const BASE_URL = 'http://localhost:3005/api';
const BASE_URL = 'http://172.16.20.4:3005/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL : BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials : true
});