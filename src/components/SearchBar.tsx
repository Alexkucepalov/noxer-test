import React from 'react';
import './SearchBar.css';
import SearchIcon from '../assets/icon.svg';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onBack?: () => void;
  placeholder?: string;
  showGoButton?: boolean;
  showBackButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onBack,
  placeholder = "Найти товары",
  showGoButton = false,
  showBackButton = false
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      {showBackButton && (
        <button className="back-button" onClick={onBack}>
          ←
        </button>
      )}
      <div className="search-input-container">
        <img src={SearchIcon} alt="Поиск" className="search-icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="search-input"
        />
        {showGoButton && (
          <button className="go-button" onClick={onSearch}>
            Перейти
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
