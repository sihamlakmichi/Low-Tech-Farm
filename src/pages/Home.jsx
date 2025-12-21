// src/pages/Home.jsx - CORRECT
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductList from '../components/common/ProductList';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      {/* PAS DE NAVIGATION ICI - seulement le contenu de la page */}
      <HeroSection />
      
      <section className="featured-products">
        <h2>Produits en Vedette</h2>
        <ProductList category="all" limit={6} />
      </section>

      <CategoryGrid />
      
      <section className="new-arrivals">
        <h2>Nouveautés</h2>
        <ProductList category="miel" limit={4} />
      </section>
    </div>
  );
};

export default Home;