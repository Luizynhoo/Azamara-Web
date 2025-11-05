// DestinyCruiseSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import "./destiny.css";

const DestinyCruiseSection = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    const ships = [
        {
            id: 'Caribe',
            title: 'Caribe',
            image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Caribe.webp',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/star-of-the-seas/',
        },
        {
            id: 'Asia',
            title: 'Asia',
            image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Asia.webp',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/icon-of-the-seas/',
        },
        {
            id: 'Atlantico',
            title: 'Atlantico',
            image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Atlantic.webp',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/',
        },
    ];

    const updateSlide = () => {
        if (!containerRef.current || !trackRef.current) return;
        const slideWidth = 320;
        const containerWidth = containerRef.current.offsetWidth;
        const visibleSlides = Math.floor(containerWidth / slideWidth);
        const maxIndex = Math.max(0, ships.length - visibleSlides);
        const validIndex = Math.max(0, Math.min(slideIndex, maxIndex));
        trackRef.current.style.transform = `translateX(${-validIndex * slideWidth}px)`;
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

                <div className="rc-full-content" style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>

                    {/* Carrossel à esquerda (visual) */}
                    <div className="rc-carousel-wrapper" ref={containerRef}>
                        <button className="rc-carousel-btn rc-prev" onClick={handlePrev}>‹</button>
                        <div className="rc-carousel-container">
                            <div className="rc-carousel-track" ref={trackRef}>
                                {ships.map((ship) => (
                                    <div key={ship.id} className="rc-carousel-card" onClick={() => window.open(ship.url, '_blank')}>
                                        <img src={ship.image} alt={ship.title} className="rc-card-image" />
                                        <div className="rc-card-overlay">
                                            <h3 className="rc-card-title">{ship.title}</h3>
                                            <button className="rc-card-button">MAIS DETALHES</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="rc-carousel-btn rc-next" onClick={handleNext}>›</button>
                    </div>

                    {/* Texto à direita */}
                    <div className="rc-content" style={{ marginLeft: 0, textAlign: 'right' }}>
                        <h1 className="rc-title">
                           EXPLORE NOSSOS DESTINOS
                        </h1>
                        <p className="rc-description">
                            Dos mares do Caribe às paisagens da Europa, descubra destinos inesquecíveis com a Azamara Cruises.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinyCruiseSection;