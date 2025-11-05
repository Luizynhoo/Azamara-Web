// components/StickyFooter.jsx
import React from 'react';
import './StickyFooter.css';
import { FaPhone, FaWhatsapp, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import Logo from "../../assets/Azamara-color.png"

const StickyFooter = () => {
  return (
    <div className="sticky-footer">
      <div className="sticky-container">
        <div className="sticky-brand">
          <img
            src={Logo}
            alt="Azamara Cruise"
            className="sticky-logo"
          />
          <span>Canais de Vendas</span>
        </div>

        <div className="sticky-channels">
          <a href="tel:+5511999999999" className="channel-item">
            <FaPhone />
            <div>
              <strong>Atendimento<br/>por Telefone</strong>
            </div>
          </a>

          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" className="channel-item">
            <FaWhatsapp />
            <div>
              <strong>Atendimento<br/>por WhatsApp</strong>
            </div>
          </a>

          <a href="mailto:contato@shoppingdecruzeiros.com.br" className="channel-item">
            <FaEnvelope />
            <div>
              <strong>Atendimento por<br/> Email</strong>
            </div>
          </a>

          <a href="https://shoppingdecruzeiros.com.br" target="_blank" rel="noopener" className="channel-item site-link">
            <FaExternalLinkAlt />
            <div>
              <strong>Ir para o Site<br/> Shopping de Cruzeiros</strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;