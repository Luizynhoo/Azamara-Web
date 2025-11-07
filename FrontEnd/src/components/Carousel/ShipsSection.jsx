import React from 'react';
import Carousel from '../Carousel/carousel.jsx';
import './CruiseSection.css';
import logo from '../../assets/Azamara-White.png';

const ShipsSection = () => {
    const ships = [
        {
            id: 'pursuit',
            title: 'Azamara Pursuit',
            image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/star-of-the-seas-aft-sailing-night-time-up-copiar.webp?id=38319',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/star-of-the-seas/',
        },
        {
            id: 'journey',
            title: 'Azamara Journey',
            image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/icon-of-the-seas-aerial-aft-night-copiar.webp?id=38318',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/icon-of-the-seas/',
        },
        {
            id: 'onward',
            title: 'Azamara Onward',
            image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/utopia-of-the-seas-sunseet-sailing-portrait-new-copiar.webp?id=38316',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/',
        },
        {
            id: 'quest',
            title: 'Azamara Quest',
            image: 'https://www.shoppingdecruzeiros.com.br/wp-content/uploads/2024/09/utopia-of-the-seas-sunseet-sailing-portrait-new-copiar.webp?id=38316',
            url: 'https://shoppingdecruzeiros.com.br/cruise_ships/utopia-of-the-seas/',
        },
    ];

    const handleCardClick = (ship) => {
        window.open(ship.url, '_blank');
    };

    return (
        <section className="cruise-cruises-section ships-section">
            <div className="cruise-cruises-section-bg"></div>

            <div className="cruise-cruises-container">
                <div className="cruise-cruises-logo">
                    <img className="logo-aza" src={logo} alt="Logo Azamara" />
                </div>

                <div className="cruise-content-cruises-layout left-text">
                    <div className="cruise-text-cruises-block">
                        <h1 className="cruise-cruises-title">Seu lar no mar</h1>
                        <p className="cruise-cruises-description">
                            Em toda a nossa frota, você descobrirá que superamos as expectativas
                            até mesmo dos cruzeiristas mais experientes, com nossa tripulação de
                            alto nível, serviço de primeira classe e comodidades de padrão internacional.
                        </p>
                    </div>

                    <div className="cruise-carousel-cruises-block">
                        <Carousel items={ships} onCardClick={handleCardClick} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShipsSection;
