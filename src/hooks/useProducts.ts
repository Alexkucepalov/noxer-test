import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../services/api';
import { Product, Category, FilterParams, AppState, SpecialProjectParameters } from '../types';
import { transformProducts, transformCategories } from '../utils/dataTransform';

export const useProducts = () => {
  const [state, setState] = useState<AppState>({
    products: [],
    categories: [],
    popularSearches: [],
    searchState: {
      query: '',
      results: [],
      isLoading: false,
      error: null,
    },
    currentPage: 1,
    totalPages: 1,
    isLoading: true,
    error: null,
  });

  // Загрузка основных данных
  const loadMainData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await productsApi.getMainProducts();
      
      setState(prev => ({
        ...prev,
        products: transformProducts(data.products || []),
        categories: transformCategories(data.categories || []),
        popularSearches: data.special_project_parameters_json?.fast_search_strings?.parameters_list || [
          'футболка',
          'женская кофта',
          'сертификат',
          'куртка',
          'детская футболка',
          'подарочный сертификат',
          'штаны спортивные'
        ],
        currentPage: data.pagination?.current_page || 1,
        totalPages: data.pagination?.total_pages || 1,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке основных данных:', error);
      setState(prev => ({ ...prev, error: 'Не удалось загрузить данные', isLoading: false }));
    }
  }, []);

  // Поиск товаров
  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({
        ...prev,
        searchState: {
          ...prev.searchState,
          query: '',
          results: [],
          isLoading: false,
          error: null,
        },
      }));
      return;
    }

    try {
      setState(prev => ({
        ...prev,
        searchState: {
          ...prev.searchState,
          query,
          isLoading: true,
          error: null,
        },
      }));

      const data = await productsApi.searchProducts(query);
      
      setState(prev => ({
        ...prev,
        searchState: {
          ...prev.searchState,
          results: transformProducts(data || []),
          isLoading: false,
          error: null,
        },
      }));
    } catch (error) {
      console.error('Ошибка при поиске товаров:', error);
      setState(prev => ({
        ...prev,
        searchState: {
          ...prev.searchState,
          error: 'Не удалось выполнить поиск',
          isLoading: false,
        },
      }));
    }
  }, []);

  // Фильтрация товаров
  const filterProducts = useCallback(async (params: FilterParams) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await productsApi.getFilteredProducts(params);
      
      setState(prev => ({
        ...prev,
        products: transformProducts(data.products || []),
        currentPage: data.pagination?.current_page || 1,
        totalPages: data.pagination?.total_pages || 1,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Ошибка при фильтрации товаров:', error);
      setState(prev => ({ ...prev, error: 'Не удалось отфильтровать товары', isLoading: false }));
    }
  }, []);

  // Загрузка следующей страницы
  const loadMoreProducts = useCallback(async () => {
    if (state.currentPage >= state.totalPages) return;

    try {
      const nextPage = state.currentPage + 1;
      const data = await productsApi.getFilteredProducts({
        page: nextPage,
        per_page: 20,
      });

      setState(prev => ({
        ...prev,
        products: [...prev.products, ...transformProducts(data.products || [])],
        currentPage: nextPage,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке дополнительных товаров:', error);
      setState(prev => ({ ...prev, error: 'Не удалось загрузить дополнительные товары', isLoading: false }));
    }
  }, [state.currentPage, state.totalPages]);

  useEffect(() => {
    loadMainData();
  }, [loadMainData]);

  return {
    ...state,
    searchProducts,
    filterProducts,
    loadMoreProducts,
    loadMainData,
  };
};
