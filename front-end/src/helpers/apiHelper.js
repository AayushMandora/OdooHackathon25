import axios from 'axios';

// Base URL for your API - update this according to your backend
const BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token from localStorage
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - clear token and redirect to login
        if (error.response?.status === 401) {
            // localStorage.removeItem('token');
            // You can add redirect logic here if needed
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// GET request
export const get = async (url, config = {}) => {
    try {
        const response = await apiClient.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const post = async (url, data = {}, config = {}) => {
    try {
        const response = await apiClient.post(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const put = async (url, data = {}, config = {}) => {
    try {
        const response = await apiClient.put(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const del = async (url, config = {}) => {
    try {
        const response = await apiClient.delete(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const patch = async (url, data = {}, config = {}) => {
    try {
        const response = await apiClient.patch(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default { post, put, del, patch };
