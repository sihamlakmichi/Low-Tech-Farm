import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2>{t('welcome')}</h2>
        <p>{t('heroText')}</p>
        <div className="hero-buttons">
          <button className="btn-primary">{t('discoverProducts')}</button>
          <button className="btn-secondary">{t('freeConsultation')}</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;