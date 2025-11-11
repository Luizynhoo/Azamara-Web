import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import './RoyalCruiseSection.css';
import AzamaraLogo from "../../assets/Azamara-White.png";
import PursuitImg from "../../assets/Navios/Azamara-pursuit.webp"
import JourneyImg from "../../assets/Navios/Azamara-journey.webp"
import OnwardImg from "../../assets/Navios/Azamara-Onward.webp"
import QuestImg from "../../assets/Navios/Azamara-Quest.webp"

const RoyalCruiseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedShip, setSelectedShip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cruiseShips = [
    {
      title: 'Azamara Pursuit',
      port: '', image: PursuitImg,
      description: 'O Azamara Pursuit oferece uma experiência íntima com capacidade para 690 hóspedes. Projetado para explorar destinos únicos, combina luxo e conforto em um ambiente acolhedor.',
    },
    {
      title: 'Azamara Journey',
      port: '', image: JourneyImg,
      description: 'Um clássico renovado, o Azamara Journey é perfeito para cruzeiros prolongados em portos exclusivos. Seu design elegante e serviço personalizado encantam os viajantes mais exigentes.',
    },
    {
      title: 'Azamara Onward',
      port: '', image: OnwardImg,
      description: 'O mais novo da frota, o Azamara Onward eleva o padrão com espaços modernos, gastronomia refinada e itinerários que permitem estadias mais longas nos destinos.',
    },
    {
      title: 'Azamara Quest',
      port: '', image: QuestImg,
      description: 'Conhecido por sua sofisticação, o Azamara Quest oferece suítes espaçosas, spas de alto nível e experiências culturais imersivas em cada parada.',
    },
  ];

  const openModal = (ship) => {
    setSelectedShip(ship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShip(null);
  };

  const totalCards = cruiseShips.length;

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
      <div className="rc-background" id='navios'></div>

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
                {cruiseShips.map((ship, index) => (
                  <div
                    key={index}
                    className="rc-carousel-card"
                    onClick={() => openModal(ship)}
                    style={{ cursor: 'pointer' }}
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


      {isModalOpen && selectedShip && (
        <div className="rc-modal-overlay" onClick={closeModal}>
          <div className="rc-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="rc-modal-close" onClick={closeModal}>×</button>

            <div className="rc-modal-body">
              <img
                src={selectedShip.image}
                alt={selectedShip.title}
                className="rc-modal-image"
              />
              <div className="rc-modal-text">
                <h2>{selectedShip.title}</h2>
                <p>{selectedShip.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoyalCruiseSection;