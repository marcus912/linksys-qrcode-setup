/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({
    baseURL: process.env.REACT_APP_LINKSYS_API_URL || process.env.REACT_APP_API_URL,
    headers: {
        'X-Linksys-Client-Type-Id': 'BB426FA7-16A9-5C1C-55AF-63A4167B26AD',
        'Content-Type': 'application/json'
    }
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
