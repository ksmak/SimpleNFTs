import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8000",
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('access')}`;
    return config;
});

instance.interceptors.response.use((config) => {
    return config;
}, (async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        const response = await axios.post(`http://localhost:8000/api/token/refresh/`, {
            refresh: sessionStorage.getItem('refresh')
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }, { withCredentials: true });

        if (response.status === 200) {
            sessionStorage.setItem('access', response.data.access);
            return instance.request(originalRequest);
        } else {
            console.log('No authorization.');
            sessionStorage.clear();
        }
    }
    return error;
}));

export default instance