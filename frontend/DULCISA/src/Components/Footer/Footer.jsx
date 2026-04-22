import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-logo">Dulcisa</h2>
          <p className="footer-description">
            Endulzando tus momentos mas especiales
          </p>
        </div>

        <div className="footer-section">
          <h2 className="footer-logo">Contactos</h2>
          <p className="footer-description">contacta@dulcisa.com</p>
        </div>
        <div className="footer-bottom">
          <p className="footer-pie">&copy; 2026 Dulcisa - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
