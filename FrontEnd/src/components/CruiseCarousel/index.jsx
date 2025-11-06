import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import './RoyalCruiseSection.css';
import AzamaraLogo from "../../assets/Azamara-White.png";

const RoyalCruiseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const cruiseShips = [
    { id: 'Pursuit', title: 'Azamara Pursuit', port: '', image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/star-of-the-seas-aft-sailing-night-time-up-copiar.webp?id=38319', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/star-of-the-seas/' },
    { id: 'Journey', title: 'Azamara Journey', port: '', image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/icon-of-the-seas-aerial-aft-night-copiar.webp?id=38318', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/icon-of-the-seas/' },
    { id: 'Onward', title: 'Azamara Onward', port: '', image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/utopia-of-the-seas-sunseet-sailing-portrait-new-copiar.webp?id=38316', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/' },
    { id: 'Quest', title: 'Azamara Quest', port: '', image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/utopia-of-the-seas-sunseet-sailing-portrait-new-copiar.webp?id=38316', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/' },
  ];

  const totalCards = cruiseShips.length;

  // Detecta quantos cards cabem
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const update = () => {
      const newVisible = getVisibleCount();
      setVisibleCount(newVisible);
      setCurrentIndex(prev => Math.min(prev, Math.max(0, totalCards - newVisible)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [totalCards]);

  const maxIndex = Math.max(0, totalCards - visibleCount);

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  // Atualiza o translateX com base no tamanho real do card
  useEffect(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector('.rc-carousel-card');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const slideAmount = cardWidth + gap;

    trackRef.current.style.transform = `translateX(${-currentIndex * slideAmount}px)`;
  }, [currentIndex, visibleCount]);

  return (
    <section className="rc-section">
      <div className="rc-background"></div>

      <div className="rc-container">
        <div className="rc-logo">
          <img src={AzamaraLogo} alt="Azamara" className="rc-logo-img" />
        </div>

        <div className="rc-full-content">
          <div className="rc-content">
            <h1 className="rc-title">Seu lar<br />no mar</h1>
            <p className="rc-description">
              Em toda a nossa frota, você descobrirá que superamos as expectativas até mesmo dos cruzeiristas mais experientes, com nossa tripulação de alto nível, serviço de primeira classe e comodidades de padrão internacional.
            </p>
          </div>

          <div className="rc-carousel-wrapper" ref={containerRef}>
            <button
              className="rc-carousel-btn rc-prev"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={28} />
            </button>

            <div className="rc-carousel-container">
              <div
                ref={trackRef}
                className="rc-carousel-track"
              >
                {cruiseShips.map((ship) => (
                  <div
                    key={ship.id}
                    className="rc-carousel-card"
                    onClick={() => window.open(ship.url, '_blank')}
                  >
                    <img src={ship.image} alt={ship.title} className="rc-card-image" />
                    <div className="rc-card-overlay">
                      <h3 className="rc-card-title">{ship.title}</h3>
                      <p className="rc-card-port">{ship.port}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="rc-carousel-btn rc-next"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoyalCruiseSection;