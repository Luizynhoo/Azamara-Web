import React from 'react';
import Carousel from '../Carousel/carousel.jsx';
import './CruiseSection.css';

const DestinationsSection = () => {
    const destinations = [
        {
            id: 'Caribe',
            title: 'Caribe',
            image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Caribe.webp',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/star-of-the-seas/',
        },
        {
            id: 'Asia',
            title: 'Ásia',
            image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Asia.webp',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/icon-of-the-seas/',
        },
        {
            id: 'Atlantico',
            title: 'Atlântico',
            image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Atlantic.webp',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/',
        },
        {
            id: 'Europa',
            title: 'Europa',
            image: 'https://manualdoagente.com.br/wp-content/uploads/2025/07/Atlantic.webp',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/',
        },
    ];

    const handleCardClick = (destination) => {
        if (destination.url) window.open(destination.url, '_blank');
    };

    return (
        <section className="cruise-section destinations-cruises-section">
            <div className="cruise-section-bg destination-cruises-bg"></div>

            <div className="cruise-container">
                <div className="cruise-content-layout right-text">
                    <div className="cruise-carousel-block">
                        <Carousel items={destinations} onCardClick={handleCardClick} />
                    </div>

                    <div className="cruise-text-block">
                        <h1 className="cruise-title">Explore<br />nossos<br />destinos</h1>
                        <p className="cruise-description">
                            Dos mares do Caribe às paisagens da Europa, descubra destinos
                            inesquecíveis com a Azamara Cruises.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinationsSection;
