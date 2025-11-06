import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';
import "./destiny.css";

const DestinyCruiseSection = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    const ships = [
        { id: 'Caribe', title: 'Caribe', image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Caribe.webp', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/star-of-the-seas/' },
        { id: 'Asia', title: 'Asia', image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Asia.webp', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/icon-of-the-seas/' },
        { id: 'Atlantico', title: 'Atlantico', image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Atlantic.webp', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/' },
        { id: 'Atlantico2', title: 'Atlantico', image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Atlantic.webp', url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/' },
    ];

    const totalCards = ships.length;

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
            setSlideIndex(prev => Math.min(prev, Math.max(0, totalCards - newVisible)));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [totalCards]);

    const maxIndex = Math.max(0, totalCards - visibleCount);

    const handlePrev = () => setSlideIndex(prev => Math.max(0, prev - 1));
    const handleNext = () => setSlideIndex(prev => Math.min(prev + 1, maxIndex));

    // Atualiza o translateX com base no card real
    useEffect(() => {
        if (!trackRef.current) return;
        const firstCard = trackRef.current.querySelector('.rc-carousel-card');
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const gap = 20;
        const slideAmount = cardWidth + gap;
        trackRef.current.style.transform = `translateX(${-slideIndex * slideAmount}px)`;
    }, [slideIndex, visibleCount]);

    return (
        <section className="destiny-section">
            <div className="rc-background"></div>

            <div className="destiny-container">
                <div className="destiny-full-content">
                    {/* CARROSSEL */}
                    <div className="rc-carousel-wrapper" ref={containerRef}>
                        <button
                            className="rc-carousel-btn rc-prev"
                            onClick={handlePrev}
                            disabled={slideIndex === 0}
                        >
                            <ChevronLeft size={28} />
                        </button>

                        <div className="rc-carousel-container">
                            <div className="rc-carousel-track" ref={trackRef}>
                                {ships.map((ship) => (
                                    <div
                                        key={ship.id}
                                        className="rc-carousel-card"
                                        onClick={() => window.open(ship.url, '_blank')}
                                    >
                                        <img src={ship.image} alt={ship.title} className="rc-card-image" />
                                        <div className="rc-card-overlay">
                                            <h3 className="rc-card-title">{ship.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="rc-carousel-btn rc-next"
                            onClick={handleNext}
                            disabled={slideIndex >= maxIndex}
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>

                    {/* TEXTO */}
                    <div className="rc-content">
                        <h1 className="rc-title">EXPLORE NOSSOS DESTINOS</h1>
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