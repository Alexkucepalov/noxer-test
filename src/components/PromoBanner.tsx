import React from 'react';
import './PromoBanner.css';
import BannerImage from '../assets/Rectangle 98.png';

const PromoBanner: React.FC = () => {
  return (
    <div className="promo-banner">
      <img src={BannerImage} alt="Промо баннер" className="banner-background" />
      <div className="promo-pagination">
        <div className="promo-dot active"></div>
        <div className="promo-dot"></div>
        <div className="promo-dot"></div>
      </div>
    </div>
  );
};

export default PromoBanner;
