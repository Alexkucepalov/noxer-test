import React from 'react';
import './PopularSearches.css';
import SearchIcon from '../assets/icon.svg';

interface PopularSearchesProps {
  searches: string[];
  onSearchSelect: (query: string) => void;
}

const PopularSearches: React.FC<PopularSearchesProps> = ({
  searches,
  onSearchSelect
}) => {
  return (
    <div className="popular-searches">
      <h3 className="section-title">Часто ищут</h3>
      <div className="search-suggestions">
        {searches.map((search, index) => (
          <button
            key={index}
            className="search-suggestion"
            onClick={() => onSearchSelect(search)}
          >
            <img src={SearchIcon} alt="Поиск" className="search-icon" />
            <span className="search-text">{search}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
