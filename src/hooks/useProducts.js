// src/hooks/useProducts.js
import { useEffect, useState } from "react";

import { honeyProducts } from "../data/honeyProducts";
import { teaProducts } from "../data/teaProducts";
import { oilProducts } from "../data/oilProducts";

export const useProducts = (category = "all", limit = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ CORRIGÉ

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let allProducts = [
        ...honeyProducts,
        ...teaProducts,
        ...oilProducts
      ];

      // 🔍 Filtre par catégorie
      if (category !== "all") {
        allProducts = allProducts.filter(
          product => product.category === category
        );
      }

      // 🔢 Limite
      if (limit) {
        allProducts = allProducts.slice(0, limit);
      }

      setProducts(allProducts);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  return { products, loading, error };
};
