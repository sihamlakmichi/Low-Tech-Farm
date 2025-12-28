import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="app-footer">
      <div className="footer-top">

        {/* Marken & Definition */}
        <div className="footer-column">
          <h2 className="footer-title">{t("siteTitle")}</h2>
          <p className="footer-definition">
            {t("siteDefinition") || "Ihr professioneller Partner für Produkte und Services von hoher Qualität."}
          </p>
        </div>

        {/* Wichtige Links */}
        <div className="footer-column">
          <h3 className="footer-subtitle">{t("quickLinks") || "Wichtige Links"}</h3>
          <ul>
            <li><a href="/about">{t("aboutUs") || "Über uns"}</a></li>
            <li><a href="/contact">{t("contact") || "Kontakt"}</a></li>
            <li><a href="/products">{t("products") || "Produkte"}</a></li>
            <li><a href="/faq">{t("faq") || "FAQ"}</a></li>
          </ul>
        </div>

        {/* Soziale Netzwerke */}
        <div className="footer-column">
          <h3 className="footer-subtitle">{t("followUs") || "Folgen Sie uns"}</h3>
          <ul className="social-list">
            <li><FaFacebookF /> Facebook</li>
            <li><FaTwitter /> Twitter</li>
            <li><FaInstagram /> Instagram</li>
            <li><FaLinkedinIn /> LinkedIn</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 {t("siteTitle")} - {t("rightsReserved") || "Alle Rechte vorbehalten"}</p>
      </div>
    </footer>
  );
};

export default Footer;
