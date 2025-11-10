import { useState } from 'react';
import { Ship, Anchor, Calendar, Users, MapPin } from 'lucide-react';
import ItineraryPopup from '../../components/Promocoes/funcionalidades/ItineraryPopup';
import SidebarForm from '../../components/Promocoes/funcionalidades/Sidebarform';
import './search.css';

import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { useCruiseOffers } from './../../hooks/useCruiseOffers';


export default function CruiseBooking() {


    const { offers,setPage  } = useCruiseOffers();
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [filters, setFilters] = useState({
        destination: 'Todos os Destinos',
        port: 'Todos os Portos',
        dateRange: 'Jan 2026 - Jan 2026',
        ships: 'Todos os Navios',
        guests: '2',
        sortBy: 'Menor Preço'
    });


    const openBudget = (offer) => {
        setSelectedOffer(offer);
        setSidebarOpen(true);
        setPopupOpen(false);
    };

    const openDetails = (offer) => {
        setSelectedOffer(offer);
        setPopupOpen(true);
        setSidebarOpen(false);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setSelectedOffer(null);
    };

    const seeMore = () => {
        setPage((prevPage) => prevPage + 1);
    }

    return (
        <>
            <main className='search-main'>
                <Navbar customClass="navbar-cruise" />
                <div className="cruise-container">
                    {/* Filtros */}
                    <div className="filters-card">
                        <div className="filters-grid">
                            <div className="filter-item">
                                <MapPin className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Destinos</div>
                                    <div className="filter-value">{filters.destination}</div>
                                </div>
                            </div>

                            <div className="filter-item">
                                <Anchor className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Portos</div>
                                    <div className="filter-value">{filters.port}</div>
                                </div>
                            </div>

                            <div className="filter-item">
                                <Calendar className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Data</div>
                                    <div className="filter-value">{filters.dateRange}</div>
                                </div>
                            </div>

                            <div className="filter-item">
                                <Ship className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Navios</div>
                                    <div className="filter-value">{filters.ships}</div>
                                </div>
                            </div>

                            <div className="filter-item">
                                <Users className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Hóspedes</div>
                                    <div className="filter-value">{filters.guests}</div>
                                </div>
                            </div>
                        </div>

                        <div className="sort-section">
                            <label className="sort-label">ORDENAR POR:</label>
                            <select
                                className="sort-select"
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            >
                                <option>Menor Preço</option>
                                <option>Maior Preço</option>
                                <option>Duração</option>
                                <option>Data de Partida</option>
                            </select>
                        </div>
                    </div>

                    {offers.map((offer, index) => (
                        <div className="cruise-card" key={index}>
                            <div className="cruise-grid">
                                <div className="cruise-image-container">
                                    <img
                                        src={offer.image}
                                        alt="Destino do Cruzeiro"
                                        className="cruise-image"
                                    />
                                </div>

                                <div className="cruise-info">
                                    <div className="cruise-content">
                                        <div className="cruise-details">
                                            <h2 className="cruise-title">{offer.title}</h2>

                                            <div className="cruise-metadata">
                                                <div className="metadata-item">
                                                    <span className="metadata-label">Partindo De:</span>
                                                    <span className="metadata-value">{offer.EmbarkPortName}</span>
                                                </div>
                                                <div className="metadata-item">
                                                    <span className="metadata-label">A bordo do:</span>
                                                    <span className="metadata-value">Azamara {offer.ship}</span>
                                                </div>
                                            </div>

                                            <div className="itinerary-box">
                                                <div className="itinerary-content">
                                                    <MapPin className="itinerary-icon" />
                                                    <div>
                                                        <div className="itinerary-title">Itinerário</div>
                                                        <div className="itinerary-text">
                                                            {offer.ports}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="explore-button" onClick={() => openDetails(offer)}>
                                                Explore este itinerário
                                            </button>
                                        </div>

                                        <div className="price-section">
                                            <div className="price-label">A partir de*</div>
                                            <div className="price-value">
                                                {offer.price}
                                            </div>
                                            <div className="price-description">Tarifa p/ Hóspede</div>
                                            <div className="price-installments">{offer.installments}</div>

                                            <button className="booking-button" onClick={() => openBudget(offer)}>Solicitar Orçamento</button>

                                            <div className="booking-details">
                                                <div className="booking-date">
                                                {offer.departure}
                                                    
                                                </div>
                                                <div className="booking-duration">
                                                    Duração: {offer.nights} noites
                                                </div>
                                                <div className="booking-taxes">
                                                    *+ Impostos, taxas e despesas portuárias
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    
                    <div className="see-more-container">
                        <button className="see-more-button" onClick={seeMore}>
                            Ver Mais Ofertas
                        </button>
                    </div>

                    {selectedOffer && popupOpen && (
                        <ItineraryPopup
                            offer={selectedOffer}
                            onClose={closePopup}
                            onBudget={openBudget}
                        />
                    )}

                    <SidebarForm
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={(v) => {
                            setSidebarOpen(v);
                            if (!v) setPopupOpen(false);
                        }}
                        offer={selectedOffer}
                    />
                    

                </div>
                <Footer />
            </main>
        </>

    );
}