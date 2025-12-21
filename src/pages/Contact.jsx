import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      console.log('Formulaire envoyé:', formData);
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Réinitialiser le formulaire après succès
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'normal'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Adresse',
      content: '123 Route des Abeilles\n75000 Paris, France',
      link: 'https://maps.google.com'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      content: '+33 1 23 45 67 89',
      link: 'tel:+33123456789'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'contact@imkerei.fr',
      link: 'mailto:contact@imkerei.fr'
    },
    {
      icon: '🕒',
      title: 'Horaires',
      content: 'Lun-Ven: 9h-18h\nSam: 9h-12h'
    }
  ];

  const faqs = [
    {
      question: 'Proposez-vous des visites du rucher ?',
      answer: 'Oui, nous organisons des visites guidées sur rendez-vous les weekends.'
    },
    {
      question: 'Formez-vous les débutants ?',
      answer: 'Absolument ! Nous proposons des formations adaptées à tous les niveaux.'
    },
    {
      question: 'Livrez-vous dans toute la France ?',
      answer: 'Oui, nous livrons partout en France métropolitaine sous 2-5 jours.'
    }
  ];

  return (
    <div className="contact-page">
      {/* En-tête */}
      <header className="contact-header">
        <h1>{t('contact') || 'Contactez-nous'}</h1>
        <p>Nous sommes là pour répondre à toutes vos questions sur l'apiculture</p>
      </header>

      <div className="contact-container">
        {/* Informations de contact */}
        <section className="contact-info-section">
          <h2>Notre équipe vous accompagne</h2>
          <p>Que vous soyez apiculteur débutant ou professionnel, notre équipe d'experts est à votre écoute.</p>
          
          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p>{info.content}</p>
                {info.link && (
                  <a href={info.link} className="contact-link">
                    {info.title === 'Email' ? 'Envoyer un email' : 
                     info.title === 'Téléphone' ? 'Appeler' : 'Voir sur la carte'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="contact-form-section">
          <div className="form-container">
            <h2>Envoyez-nous un message</h2>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                ✅ Votre message a été envoyé avec succès ! Nous vous répondons dans les 24h.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="urgency">Urgence</label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                  >
                    <option value="low">Faible</option>
                    <option value="normal">Normale</option>
                    <option value="high">Élevée</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="equipment">Question sur l'équipement</option>
                  <option value="honey">Commande de miel</option>
                  <option value="training">Formation apicole</option>
                  <option value="bees">Problème avec les abeilles</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2>Questions fréquentes</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>❓ {faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Carte */}
        <section className="map-section">
          <h2>Retrouvez-nous</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <h3>🗺️ Imkerei E-Commerce</h3>
              <p>123 Route des Abeilles</p>
              <p>75000 Paris, France</p>
              <button className="btn-outline">
                Voir sur Google Maps
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;