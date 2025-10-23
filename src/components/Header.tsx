import React from 'react';
import './Header.css';

interface HeaderProps {
  onBack?: () => void;
  showClose?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBack, showClose = false }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Пустой заголовок - только для структуры */}
      </div>
    </header>
  );
};

export default Header;
