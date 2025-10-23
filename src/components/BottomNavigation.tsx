import React from 'react';
import './BottomNavigation.css';
import HomeIcon from '../assets/home.svg';
import CatalogIcon from '../assets/catalog.svg';
import FavoriteIcon from '../assets/favorite.svg';
import CartIcon from '../assets/cart.svg';
import AccountIcon from '../assets/account.svg';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'home', label: 'Главная', icon: HomeIcon },
    { id: 'grid', label: 'Каталог', icon: CatalogIcon },
    { id: 'cart', label: 'Корзина', icon: CartIcon },
    { id: 'favorites', label: 'Избранное', icon: FavoriteIcon },
    { id: 'profile', label: 'Профиль', icon: AccountIcon },
  ];

  return (
    <nav className="bottom-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <img src={tab.icon} alt={tab.label} className="nav-icon" />
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
