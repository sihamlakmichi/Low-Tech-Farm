// src/pages/Catalogue.jsx
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductList from '../components/common/ProductList';

const Catalogue = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les produits', icon: '🌟' },
    { id: 'materiel', name: 'Matériel apiculture', icon: '🛠️', description: 'Ruches, équipements, protection' },
    { id: 'miel', name: 'Miel et produits dérivés', icon: '🍯', description: 'Miels premium, propolis, pollen' },
    { id: 'formations', name: 'Formation', icon: '📚', description: 'Cours en ligne, guides PDF, webinaires' },
    { id: 'kits', name: 'Kits débutants', icon: '🎁', description: 'Solutions clés en main' },
    { id: 'urbain', name: 'Apiculture urbaine', icon: '🏙️', description: 'Produits spécialisés ville' }
  ];

  return (
    <div className="catalogue-page">
      <header className="catalogue-header">
        <h1>{t('catalogue') || 'Catalogue Produits'}</h1>
        <p>Découvrez notre gamme complète de produits et services apicoles</p>
      </header>

      {/* Filtres par catégorie */}
      <nav className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </nav>

      {/* Description de la catégorie active */}
      {activeCategory !== 'all' && (
        <div className="category-info">
          <h2>
            {categories.find(cat => cat.id === activeCategory)?.icon}
            {categories.find(cat => cat.id === activeCategory)?.name}
          </h2>
          <p>{categories.find(cat => cat.id === activeCategory)?.description}</p>
        </div>
      )}

      {/* Liste des produits */}
      <ProductList category={activeCategory} />
    </div>
  );
};

export default Catalogue;