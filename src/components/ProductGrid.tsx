import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  favorites: Set<number>;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductSelect,
  onToggleFavorite,
  favorites,
  isLoading = false,
  onLoadMore,
  hasMore = false
}) => {
  if (products.length === 0 && !isLoading) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>Товары не найдены</h3>
        <p>Попробуйте изменить параметры поиска</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onProductSelect}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.has(product.id)}
          />
        ))}
      </div>
      
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Загрузка товаров...</p>
        </div>
      )}
      
      {hasMore && !isLoading && onLoadMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={onLoadMore}>
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
