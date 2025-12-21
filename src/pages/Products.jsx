// src/pages/Products.jsx (ou src/components/Products.jsx si c'est un composant)
import React, { useState } from 'react';
import ProductList from '../components/common/ProductList'; // Ajustez le chemin si nécessaire

const Products = () => {
  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState('all');
  // État pour la limite (optionnel, pour pagination ou affichage limité)
  const [limit, setLimit] = useState(null);

  // Liste des catégories disponibles (basée sur vos mockProducts)
  const categories = [
    { key: 'all', label: 'Tous les Produits' },
    { key: 'materiel', label: 'Matériel Apicole' },
    { key: 'miel', label: 'Miel et Produits' },
    { key: 'formations', label: 'Formations' },
    { key: 'kits', label: 'Kits Complets' },
    { key: 'urbain', label: 'Apiculture Urbaine' }
  ];

  return (
    <div className="products-page">

      {/* Filtres par catégorie */}
      <section className="filters-section">
        <h2>Filtrer par Catégorie</h2>
        <div className="category-buttons">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`category-btn ${selectedCategory === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Optionnel : Limite d'affichage */}
        <div className="limit-selector">
          <label htmlFor="limit">Nombre de produits à afficher :</label>
          <select
            id="limit"
            value={limit || ''}
            onChange={(e) => setLimit(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Tous</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </section>

      {/* Liste des produits */}
      <section className="products-section">
        <ProductList category={selectedCategory} limit={limit} />
      </section>
    </div>
  );
};

export default Products;
