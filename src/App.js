// src/App.js - CORRECT
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navigation from './components/common/Navigation'; // UNIQUEMENT ICI
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Products from './pages/Products';
import Honey from './pages/Honey';
import Olive from './pages/Olive';
import Tea from './pages/Tea';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="App">
          <Header />
          <Navigation /> {/* ← UNE SEULE NAVIGATION ICI */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/products" element={<Products />} />
              <Route path="/olive-oil" element={<Olive />} />
              <Route path="/honey" element={<Honey />} />
              <Route path="/tea" element={<Tea />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

const NotFound = () => (
  <div className="not-found">
    <h1>404 - Page non trouvée</h1>
  </div>
);

export default App;