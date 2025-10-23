import React from 'react';
import { Category } from '../types';
import './CategoryFilter.css';
import AccessoriesIcon from '../assets/accessories.png';
import CertificateIcon from '../assets/certificate.png';
import HoodiesIcon from '../assets/hoodies.png';
import JacketsIcon from '../assets/jackets.png';
import PantsIcon from '../assets/pants.png';
import TshirtsIcon from '../assets/tshirts.png';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: number | string | null;
  onCategorySelect: (categoryId: number | string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  // Фиксированный список категорий с правильными изображениями
  const fixedCategories = [
    { id: 'accessories', name: 'Аксессуары', image: AccessoriesIcon },
    { id: 'tshirts', name: 'Футболки', image: TshirtsIcon },
    { id: 'hoodies', name: 'Толстовки', image: HoodiesIcon },
    { id: 'jackets', name: 'Куртки', image: JacketsIcon },
    { id: 'pants', name: 'Штаны', image: PantsIcon },
    { id: 'certificates', name: 'Сертификаты', image: CertificateIcon },
  ];

  return (
    <div className="category-filter">
      <div className="category-scroll">
        {fixedCategories.map((category) => {
          return (
            <button
              key={category.id}
              className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="category-icon-container">
                <img src={category.image} alt={category.name} className="category-icon" />
              </div>
              <span className="category-name">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
