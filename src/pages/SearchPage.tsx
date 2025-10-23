import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PopularSearches from '../components/PopularSearches';
import SearchResults from '../components/SearchResults';
import BottomNavigation from '../components/BottomNavigation';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchState,
    searchProducts,
    popularSearches,
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState(
    location.state?.query || ''
  );
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState('search');

  const handleSearch = useCallback(async (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      setShowResults(true);
      await searchProducts(query);
    } else {
      setShowResults(false);
    }
  }, [searchProducts]);

  const handleSearchSelect = useCallback((query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  }, [handleSearch]);


  const handleProductSelect = useCallback((product: Product) => {
    console.log('Выбран товар:', product);
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

  // Автоматический поиск при изменении searchQuery
  useEffect(() => {
    if (searchQuery.trim()) {
      setShowResults(true);
      const timeoutId = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300); // Уменьшили задержку с 500ms до 300ms
      return () => clearTimeout(timeoutId);
    } else {
      setShowResults(false);
    }
  }, [searchQuery, handleSearch]);

  // Автоматический поиск при загрузке страницы с запросом
  useEffect(() => {
    if (location.state?.query) {
      handleSearch(location.state.query);
    }
  }, [location.state?.query, handleSearch]);

  const handleBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      setSearchQuery('');
    } else {
      navigate('/');
    }
  }, [showResults, navigate]);

  // Показываем результаты поиска или популярные запросы
  const displayProducts = showResults ? searchState.results : [];
  const displayLoading = showResults ? searchState.isLoading : false;

  return (
    <div className="search-page">
      <Header onBack={handleBack} />
      
      <main className="main-content">
        <SearchBar
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          onSearch={() => handleSearch(searchQuery)}
          onBack={handleBack}
          placeholder="Найти товары"
          showGoButton={!!searchQuery.trim()}
          showBackButton={showResults}
        />
        
        {showResults ? (
          <SearchResults
            products={displayProducts}
            isLoading={displayLoading}
            onProductSelect={handleProductSelect}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        ) : (
          <PopularSearches
            searches={popularSearches}
            onSearchSelect={handleSearchSelect}
          />
        )}
      </main>
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') {
            navigate('/');
          }
        }}
      />
    </div>
  );
};

export default SearchPage;
