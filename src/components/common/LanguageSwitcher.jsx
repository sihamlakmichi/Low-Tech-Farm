import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button 
        onClick={() => changeLanguage('de')}
        className={language === 'de' ? 'active' : ''}
      >
        DE
      </button>
      <button 
        onClick={() => changeLanguage('fr')}
        className={language === 'fr' ? 'active' : ''}
      >
        FR
      </button>
      <button 
        onClick={() => changeLanguage('en')}
        className={language === 'en' ? 'active' : ''}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;