import React from 'react';
import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onToggleFavorite,
  isFavorite = false
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' Р';
  };

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
        ) : (
          <div className="product-image-placeholder">
            <span className="placeholder-text">Товар</span>
          </div>
        )}
        
        {product.badges && product.badges.length > 0 && (
          <div className="product-badges">
            {product.badges.map((badge, index) => {
              const badgeClass = badge.toLowerCase().includes('хит') ? 'hit' :
                                badge.toLowerCase().includes('sale') ? 'sale' :
                                badge.toLowerCase().includes('премиум') ? 'premium' :
                                badge.toLowerCase().includes('new') ? 'new' : '';
              return (
                <span key={index} className={`badge ${badgeClass}`}>
                  {badge}
                </span>
              );
            })}
          </div>
        )}
        
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
        >
          ❤️
        </button>
      </div>
      
      <div className="product-info">
        <div className="product-pricing">
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
        
        <h3 className="product-name">{product.name}</h3>
        
        <button
          className="select-btn"
          onClick={() => onSelect(product)}
        >
          Выбрать
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
