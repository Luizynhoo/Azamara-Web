import React, { useState, useEffect, useRef } from 'react';
import './RoyalCruiseSection.css';
import AzamaraLogo from "../../assets/Azamara-White.png"

const RoyalCruiseSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef(null);
  const itemsContainerRef = useRef(null);

  const cruiseShips = [
    {
      id: 'Pursuit',
      title: 'Azamara Pursuit',
      port: '',
      image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/star-of-the-seas-aft-sailing-night-time-up-copiar.webp?id=38319',
      url: 'https://shoppingdecruzeiros.com.br/cruise_ships/star-of-the-seas/',
    },
    {
      id: 'Journey',
      title: 'Azamara Journey',
      port: '',
      image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/icon-of-the-seas-aerial-aft-night-copiar.webp?id=38318',
      url: 'https://shoppingdecruzeiros.com.br/cruise_ships/icon-of-the-seas/',
    },
    {
      id: 'Onward',
      title: 'Azamara Onward',
      port: '',
      image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/utopia-of-the-seas-sunseet-sailing-portrait-new-copiar.webp?id=38316',
      url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/',
    },
    // {
    //   id: 'Quest',
    //   title: 'Azamara Quest',
    //   port: '',
    //   image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/utopia-of-the-seas-sunseet-sailing-portrait-new-copiar.webp?id=38316',
    //   url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/',
    // },
  ];

  const updateSlide = () => {
    if (!containerRef.current || !itemsContainerRef.current) return;

    const slideWidth = 300 + 20;
    const containerWidth = containerRef.current.offsetWidth;
    const visibleSlides = Math.floor(containerWidth / slideWidth);
    const maxIndex = Math.max(0, cruiseShips.length - visibleSlides);

    const validIndex = Math.max(0, Math.min(slideIndex, maxIndex));
    itemsContainerRef.current.style.transform = `translateX(${-validIndex * slideWidth}px)`;
  };

  useEffect(() => {
    updateSlide();
    const handleResize = () => {
      setSlideIndex(0);
      updateSlide();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slideIndex]);

  const handlePrev = () => setSlideIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setSlideIndex(prev => prev + 1);

  return (
    <section className="rc-section">
      <div className="rc-background"></div>

      <div className="rc-container">
        {/* Logo */}
        <div className="rc-logo">
          <img
            src={AzamaraLogo}
            alt="Royal Caribbean"
            className="rc-logo-img"
          />
        </div>
        <div className='rc-full-content'>
          {/* Título e Texto */}
          <div className="rc-content">
            <h1 className="rc-title">
              Seu lar<br />no mar
            </h1>
            <p className="rc-description">
              Em toda a nossa frota, você descobrirá que superamos as expectativas até mesmo dos cruzeiristas mais experientes, com nossa tripulação de alto nível, serviço de primeira classe e comodidades de padrão internacional.
            </p>
          </div>

          {/* Carrossel */}
          <div className="rc-carousel-wrapper" ref={containerRef}>
            <button className="rc-carousel-btn rc-prev" onClick={handlePrev}>‹</button>

            <div className="rc-carousel-container">
              <div className="rc-carousel-track" ref={itemsContainerRef}>
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
                      <button className="rc-card-button">MAIS DETALHES</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="rc-carousel-btn rc-next" onClick={handleNext}>›</button>
          </div>

        </div>
      </div>
    </section>

  );
};

export default RoyalCruiseSection;