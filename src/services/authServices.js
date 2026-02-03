import axios from 'axios';
const WEB_URL = 'http://localhost:8000';

const loginService = (data)=>{
    return axios.post(WEB_URL+'/login',data);
}

const registerService = (data)=>{
    return axios.post(WEB_URL+'/register',data);
}

const authServices = {
    loginService,
    registerService
}

export default authServices;