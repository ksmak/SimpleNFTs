import axios from 'axios';
import { getCookie, setCookie } from '../utils/cookie_helper';

const instance = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
    withCredentials: true,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getCookie('access_token')}`;
    return config;
});

instance.interceptors.response.use((config) => {
    return config;
}, (async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        const response = await axios.post(`${process.env.REACT_APP_HOST_API}/api/token/refresh/`, {
            refresh: getCookie('refresh_token')
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }, { withCredentials: true });

        if (response.status === 200) {
            setCookie('access_token', response.data.access, process.env.REACT_APP_ACCESS_TOKEN_LIFETIME);
            setCookie('refresh_token', response.data.refresh, process.env.REACT_APP_REFRESH_TOKEN_LIFETIME);
            return instance.request(originalRequest);
        } else {
            console.log('No authorization.');
            sessionStorage.clear();
        }
    }
    return error;
}));

export default instance