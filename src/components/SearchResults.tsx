import React from 'react';
import { Product } from '../types';
import './SearchResults.css';

interface SearchResultsProps {
  products: Product[];
  isLoading: boolean;
  onProductSelect: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  favorites: Set<number>;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  isLoading,
  onProductSelect,
  onToggleFavorite,
  favorites
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  if (isLoading) {
    return (
      <div className="search-results">
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Поиск...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <p>Товары не найдены</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      {products.map((product) => (
        <div key={product.id} className="search-result-item" onClick={() => onProductSelect(product)}>
          <div className="result-image-container">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="result-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                }}
              />
            ) : (
              <div className="result-image-placeholder">
                <span>Товар</span>
              </div>
            )}
          </div>
          
          <div className="result-info">
            <h3 className="result-name">{product.name}</h3>
            <div className="result-pricing">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.old_price && (
                <>
                  <span className="old-price">{formatPrice(product.old_price)}</span>
                  {product.discount && (
                    <span className="discount">-{product.discount}%</span>
                  )}
                </>
              )}
            </div>
          </div>
          
          <button
            className={`favorite-btn ${favorites.has(product.id) ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
