import axios from 'axios';
const WEB_URL = 'https://mongotodo-9k7x.onrender.com';

const loginService = (data) => {
    return axios.post(WEB_URL + '/login', data);
}

const registerService = (data) => {
    return axios.post(WEB_URL + '/register', data);
}

const authServices = {
    loginService,
    registerService
}

export default authServices;