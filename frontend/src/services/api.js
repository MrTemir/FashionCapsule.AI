import axios from 'axios';

// Создание axios инстанса
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000
});

// Обработка ошибок глобально
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Не авторизован
            console.error('Требуется авторизация');
        } else if (error.response?.status === 500) {
            console.error('Ошибка сервера');
        }
        return Promise.reject(error);
    }
);

// Clothing Items API
export const getItems = () => api.get('/outfits/items');
export const addItem = (item) => api.post('/outfits/items', item);
export const getItemsByCategory = (category) =>
    api.get(`/outfits/items?category=${category}`);

// Outfit Generation (будущее)
export const generateOutfit = (params) =>
    api.post('/outfits/generate', params);

export default api;
