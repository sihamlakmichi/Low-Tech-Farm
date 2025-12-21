import React from 'react';
import Navigation from './Navigation'; // Vérifiez cet import
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="app-header">
      <div className="header-top">
        <LanguageSwitcher />
      </div>
      <div className="header-main">
        <h1>{t('siteTitle')}</h1>
        <p>{t('siteSubtitle')}</p>
      </div>
    </header>
  );
};

export default Header;