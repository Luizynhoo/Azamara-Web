import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

const Carousel = ({ items = [], onCardClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const [cardWidth, setCardWidth] = useState(0);
    const containerRef = useRef(null);
    const GAP = 24; // gap em px (sincronize com o CSS)

    const getVisibleCount = () => {
        if (typeof window === 'undefined') return 3;
        const w = window.innerWidth;
        if (w < 768) return 1;
        if (w < 1200) return 2;
        return 3;
    };

    // atualiza visibleCount e recalcula cardWidth
    useEffect(() => {
        const handleResize = () => {
            const newVisible = getVisibleCount();
            setVisibleCount(newVisible);

            const container = containerRef.current;
            if (!container) return;

            const containerWidth = container.offsetWidth;
            const newCardWidth = Math.max(
                80,
                (containerWidth - GAP * (newVisible - 1)) / newVisible
            );
            setCardWidth(Math.floor(newCardWidth));

            // corrige índice se necessário
            const maxIdx = Math.max(0, items.length - newVisible);
            setCurrentIndex(prev => Math.min(prev, maxIdx));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [items.length]);

    const maxIndex = Math.max(0, items.length - visibleCount);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < maxIndex;

    const nextSlide = () => {
        if (canGoNext) setCurrentIndex(i => Math.min(i + 1, maxIndex));
    };
    const prevSlide = () => {
        if (canGoPrev) setCurrentIndex(i => Math.max(i - 1, 0));
    };

    // Calcula offset em px; se visibleCount === 1, centraliza o card selecionado
    const getTransform = () => {
        const container = containerRef.current;
        if (!container || cardWidth === 0) return 'translateX(0px)';

        const containerWidth = container.offsetWidth;
        if (visibleCount === 1) {
            // posição do card i: i * (cardWidth + GAP)
            // offset desejado = posiçãoDoCard - margemParaCentralizar
            const pos = currentIndex * (cardWidth + GAP);
            const centerOffset = (containerWidth - cardWidth) / 2;
            return `translateX(-${pos - centerOffset}px)`;
        } else {
            const pos = currentIndex * (cardWidth + GAP);
            return `translateX(-${pos}px)`;
        }
    };

    return (
        <div className="carousel-cruises-wrapper">
            <div className="carousel-cruises-viewport" ref={containerRef}>
                {/* setas agora dentro do viewport — posicionadas relativamente ao viewport */}
                <button
                    className="carousel-cruises-nav carousel-cruises-nav-prev"
                    onClick={prevSlide}
                    disabled={!canGoPrev}
                    aria-label="Anterior"
                    data-role="prev"
                >
                    <ChevronLeft size={20} strokeWidth={2.2} />
                </button>

                <div
                    className="carousel-cruises-track"
                    style={{
                        transform: getTransform(),
                        gap: `${GAP}px`,
                    }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={item.id ?? idx}
                            className="carousel-cruises-card"
                            onClick={() => onCardClick?.(item)}
                            style={{
                                width: `${cardWidth}px`,
                                flex: `0 0 ${cardWidth}px`,
                            }}
                        >
                            <div className="carousel-cruises-card-inner">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="carousel-cruises-card-image"
                                    loading="lazy"
                                />
                                <div className="carousel-cruises-card-overlay">
                                    <h3 className="carousel-cruises-card-title">{item.title}</h3>
                                    {item.subtitle && (
                                        <p className="carousel-cruises-card-subtitle">{item.subtitle}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-cruises-nav carousel-cruises-nav-next"
                    onClick={nextSlide}
                    disabled={!canGoNext}
                    aria-label="Próximo"
                    data-role="next"
                >
                    <ChevronRight size={20} strokeWidth={2.2} />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
