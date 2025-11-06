// components/Footer.jsx
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa';
import Logo from "../../assets/Azamara-color.png"
import R11 from "../../assets/R11.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logos">
          <img
            src={R11}
            alt="Shopping de Cruzeiros"
            className="footer-logo"
          />
          <div className="footer-partner">
            <img
              src={Logo}
              alt="Royal Caribbean"
              className="partner-logo"
            />
          </div>
        </div>
      </div>

      <div className="footer-links">
        <a href="/protecao-seguranca">Proteção e Segurança</a>
        <a href="/condicoes-gerais">Condições Gerais</a>
        <a href="/contrato-compra">Contrato de Compra de Cruzeiro</a>
        <a href="/informacoes-legais">Informações Legais</a>
        <a href="/politica-privacidade">Política de Privacidade</a>
      </div>

      <div className="footer-bottom">
        <p>© 2025 R11 Travel. Todos os Direitos Reservados.</p>
        <div className="footer-social">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="mailto:contato@shoppingdecruzeiros.com.br" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

//Pegar os arquivos para colocar os redirecionamentos
