import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PromoBanner from '../components/PromoBanner';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import BottomNavigation from '../components/BottomNavigation';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    products,
    categories,
    popularSearches,
    isLoading,
    error,
    filterProducts,
    loadMoreProducts,
    currentPage,
    totalPages,
  } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<number | string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = useCallback((categoryId: number | string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId && typeof categoryId === 'string') {
      // Для фиксированных категорий используем поиск по названию
      const categoryMap: { [key: string]: string } = {
        'accessories': 'Аксессуары',
        'tshirts': 'Футболки',
        'hoodies': 'Толстовки',
        'jackets': 'Куртки',
        'pants': 'Штаны',
        'certificates': 'Сертификаты',
      };
      const searchTerm = categoryMap[categoryId];
      if (searchTerm) {
        filterProducts({ search: searchTerm });
      }
    } else if (typeof categoryId === 'number') {
      filterProducts({ category_id: categoryId });
    } else {
      filterProducts({});
    }
  }, [filterProducts]);

  const handleProductSelect = useCallback((product: Product) => {
    console.log('Выбран товар:', product);
    // Здесь можно добавить логику для добавления в корзину или перехода к детальной странице
  }, []);

  const handleToggleFavorite = useCallback((productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  const handleLoadMore = useCallback(() => {
    loadMoreProducts();
  }, [loadMoreProducts]);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      navigate('/search', { state: { query: searchQuery } });
    } else {
      navigate('/search');
    }
  }, [searchQuery, navigate]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  if (error) {
    return (
      <div className="error-page">
        <Header showClose />
        <div className="error-content">
          <h2>Ошибка загрузки</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder="Найти товары"
        />
        
        <PromoBanner />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        <ProductGrid
          products={products}
          onProductSelect={handleProductSelect}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
          hasMore={currentPage < totalPages}
        />
      </main>
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'search') {
            navigate('/search');
          }
        }}
      />
    </div>
  );
};

export default HomePage;
