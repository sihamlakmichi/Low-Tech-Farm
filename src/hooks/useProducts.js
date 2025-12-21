// src/hooks/useProducts.js
import { useState, useEffect } from 'react';

// Données mockées pour les produits
const mockProducts = {
  materiel: [
    { 
      id: 1, 
      name: 'Ruche Dadant 10 Cadres', 
      price: '€89', 
      originalPrice: '€99',
      image: '/img/img1.jpg', 
      description: 'Ruche en pin massif de qualité professionnelle', 
      category: 'materiel', 
      featured: true,
      material: 'Pin massif',
      stock: 5,
      rating: 4.5,
      reviewCount: 12,
      shipping: 'Livraison gratuite'
    },
    { 
      id: 2, 
      name: 'Combinaison Apicole Pro', 
      price: '€129', 
      image: '/img/img1.jpg', 
      description: 'Protection complète ventilée', 
      category: 'materiel',
      stock: 8,
      rating: 4.2,
      reviewCount: 7
    },
    { 
      id: 3, 
      name: 'Enfumoir Inox', 
      price: '€45', 
      image: '/img/img1.jpg', 
      description: 'Enfumoir professionnel en inox', 
      category: 'materiel',
      stock: 15,
      rating: 4.7,
      reviewCount: 23
    }
  ],
  miel: [
    { 
      id: 4, 
      name: 'Miel de Lavande Bio', 
      price: '€12.50', 
      image: '/img/img1.jpg', 
      description: 'Miel pur de lavande biologique', 
      weight: '500g', 
      category: 'miel', 
      featured: true,
      bio: true,
      stock: 20,
      rating: 4.8,
      reviewCount: 34,
      origin: 'Provence'
    },
    { 
      id: 5, 
      name: 'Pollen Frais', 
      price: '€18.00', 
      image: '/images/pollen.jpg', 
      description: 'Pollen 100% naturel', 
      weight: '200g', 
      category: 'miel',
      stock: 12,
      rating: 4.5,
      reviewCount: 15
    },
    { 
      id: 6, 
      name: 'Miel de Forêt Sauvage', 
      price: '€15.00', 
      image: '/images/miel-foret.jpg', 
      description: 'Miel de forêt aux arômes boisés', 
      weight: '500g', 
      category: 'miel',
      stock: 18,
      rating: 4.6,
      reviewCount: 28
    }
  ],
  formations: [
    { 
      id: 7, 
      name: 'Guide Débutant PDF', 
      price: '€29', 
      image: '/images/guide-debutant.jpg', 
      description: 'Guide complet pour débutants en apiculture', 
      format: 'PDF', 
      category: 'formations',
      duration: '120 pages',
      stock: 999, // Produit digital
      rating: 4.4,
      reviewCount: 45
    },
    { 
      id: 8, 
      name: 'Formation Vidéo Complète', 
      price: '€149', 
      image: '/img/img1.jpg', 
      description: '20h de formation vidéo avec expert', 
      format: 'Vidéo', 
      category: 'formations', 
      featured: true,
      duration: '20 heures',
      stock: 999,
      rating: 4.9,
      reviewCount: 67
    }
  ],
  kits: [
    { 
      id: 9, 
      name: 'Kit Débutant Apiculteur', 
      price: '€249', 
      image: '/images/kit-debutant.jpg', 
      description: 'Tout le nécessaire pour commencer en apiculture', 
      includes: ['Ruche Dadant', 'Combinaison', 'Enfumoir', 'Gants'], 
      category: 'kits', 
      featured: true,
      stock: 3,
      rating: 4.7,
      reviewCount: 18
    },
    { 
      id: 10, 
      name: 'Kit Extraction Miel', 
      price: '€129', 
      image: '/images/kit-extraction.jpg', 
      description: 'Matériel complet pour extraction du miel', 
      includes: ['Extracteur', 'Bac désoperculation', 'Filtres'], 
      category: 'kits',
      stock: 7,
      rating: 4.5,
      reviewCount: 12
    }
  ],
  urbain: [
    { 
      id: 11, 
      name: 'Ruche Urbaine Design', 
      price: '€159', 
      image: '/images/ruche-urbaine.jpg', 
      description: 'Ruche esthétique parfaite pour balcon et jardin urbain', 
      category: 'urbain', 
      featured: true,
      size: 'Compacte',
      stock: 6,
      rating: 4.3,
      reviewCount: 9
    },
    { 
      id: 12, 
      name: 'Hôtel à Insectes', 
      price: '€65', 
      image: '/images/hotel-insectes.jpg', 
      description: 'Favorise la biodiversité en milieu urbain', 
      category: 'urbain',
      stock: 10,
      rating: 4.6,
      reviewCount: 14
    }
  ]
};

// Fonction pour simuler un appel API
const fetchProducts = (category, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let products = [];
      
      if (category === 'all') {
        // Tous les produits featured
        Object.values(mockProducts).forEach(categoryProducts => {
          products.push(...categoryProducts.filter(product => product.featured));
        });
      } else {
        products = mockProducts[category] || [];
      }
      
      // Appliquer la limite si spécifiée
      if (limit && limit > 0) {
        products = products.slice(0, limit);
      }
      
      resolve(products);
    }, 500); // Simuler un délai réseau
  });
};

// Hook personnalisé useProducts
export const useProducts = (category = 'all', limit = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productsData = await fetchProducts(category, limit);
        setProducts(productsData);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, limit]);

  return { 
    products, 
    loading, 
    error,
    // Fonctions utilitaires
    getProductById: (id) => {
      const allProducts = Object.values(mockProducts).flat();
      return allProducts.find(product => product.id === parseInt(id));
    },
    getProductsByCategory: (cat) => {
      return mockProducts[cat] || [];
    }
  };
};

// Export des données mockées pour utilisation ailleurs
export { mockProducts };