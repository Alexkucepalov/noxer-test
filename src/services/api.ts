import axios from 'axios';
import { ApiResponse, FilterParams, ProductApi, CategoryApi } from '../types';

const API_BASE_URL = 'https://noxer-test.ru/webapp/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsApi = {
  // Получить товары для главной страницы
  getMainProducts: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get('/products/on_main');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении товаров:', error);
      throw error;
    }
  },

  // Получить товары с фильтрацией
  getFilteredProducts: async (params: FilterParams = {}): Promise<ApiResponse> => {
    try {
      const response = await api.post('/products/filter', params);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении отфильтрованных товаров:', error);
      throw error;
    }
  },

  // Поиск товаров
  searchProducts: async (query: string, params: FilterParams = {}): Promise<ProductApi[]> => {
    try {
      const searchParams = {
        ...params,
        search: query,
        per_page: 50,
      };
      
      // Попробуем GET запрос для поиска
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      const url = `/products/filter?${queryParams.toString()}`;
      const response = await api.get(url);
      return response.data.products || [];
    } catch (error) {
      console.error('Ошибка при поиске товаров:', error);
      // Если GET не работает, попробуем POST
      try {
        const searchParams = {
          ...params,
          search: query,
          per_page: 50,
        };
        const response = await api.post('/products/filter', searchParams);
        return response.data.products || [];
      } catch (postError) {
        console.error('Ошибка при поиске товаров (POST):', postError);
        throw postError;
      }
    }
  },
};

export default api;
