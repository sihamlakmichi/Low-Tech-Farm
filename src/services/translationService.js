// Service de traduction utilisant une API en ligne
class TranslationService {
  constructor() {
    this.cache = new Map(); // Cache pour éviter les appels API répétés
  }

  // Méthode pour traduire un texte
  async translate(text, targetLang, sourceLang = 'fr') {
    // Si c'est la même langue, retourner le texte original
    if (targetLang === sourceLang) {
      return text;
    }

    // Vérifier le cache
    const cacheKey = `${text}_${sourceLang}_${targetLang}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Utilisation de l'API MyMemory (gratuite, 1000 traductions/jour)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
      );
      
      const data = await response.json();
      
      if (data.responseData && data.responseData.translatedText) {
        const translatedText = data.responseData.translatedText;
        
        // Mettre en cache
        this.cache.set(cacheKey, translatedText);
        
        return translatedText;
      } else {
        console.warn('Traduction non disponible pour:', text);
        return text;
      }
    } catch (error) {
      console.error('Erreur de traduction:', error);
      return text; // Retourner le texte original en cas d'erreur
    }
  }

  // Traduire plusieurs textes en une seule fois
  async translateMultiple(texts, targetLang, sourceLang = 'fr') {
    const results = {};
    
    // Traduire chaque texte
    for (const [key, text] of Object.entries(texts)) {
      results[key] = await this.translate(text, targetLang, sourceLang);
    }
    
    return results;
  }

  // Vider le cache
  clearCache() {
    this.cache.clear();
  }
}

// Créer une instance unique
const translationService = new TranslationService();
export default translationService;