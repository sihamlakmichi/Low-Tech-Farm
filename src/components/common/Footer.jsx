import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© 2025 {t('siteTitle')} - {t('rightsReserved')}</p>
        <p>{t('madeIn')}</p>
      </div>
    </footer>
  );
};

export default Footer;