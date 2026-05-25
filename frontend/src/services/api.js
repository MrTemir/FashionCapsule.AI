import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.error('Authorization required');
        } else if (error.response?.status === 500) {
            console.error('Server error');
        }
        return Promise.reject(error);
    }
);

export const getItems = () => api.get('/outfits/items');
export const addItem = (item) => api.post('/outfits/items', item);
export const getItemsByCategory = (category) =>
    api.get(`/outfits/items?category=${category}`);
export const generateOutfit = (params) =>
    api.post('/outfits/generate', params);

export default api;
