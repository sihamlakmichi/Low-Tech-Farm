import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const CategoryGrid = () => {
  const { t } = useLanguage();

  const categories = [
    { key: 'beekeepingEquipment', descKey: 'equipmentDesc' },
    { key: 'honeyProducts', descKey: 'honeyDesc' },
    { key: 'trainingCourses', descKey: 'trainingDesc' },
    { key: 'starterKits', descKey: 'starterDesc' }
  ];

  return (
    <section className="categories-section">
      <h2>{t('ourCategories')}</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <h3>{t(category.key)}</h3>
            <p>{t(category.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;