import { useState } from "react";
import ItineraryPopup from '../../promocoes/funcionalidades/ItineraryPopup';
import SidebarForm from '../../Promocoes/funcionalidades/Sidebarform';
import './resultItems.css';

export default function ResultItems({ offer, index }) {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

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
    return (
        <div className="cruise-card" key={`${offer.code}-${index}`}>
            <div className="cruise-grid">
                <div className="cruise-image-container">
                    <img
                        src={offer.image}
                        alt="Destino do Cruzeiro"
                        className="cruise-image"
                    />
                    <div className="booking-duration">
                        Duração: {offer.nights} noites
                    </div>
                </div>

                <div className="cruise-info">
                    <div className="cruise-content">
                        <div className="cruise-details">
                            <h2 className="cruise-title">{offer.title}</h2>

                            <div className="cruise-metadata">
                                <div className="metadata-item">
                                    <span className="metadata-label">Data:</span>
                                    <span className="metadata-value">{offer.departure}</span>
                                </div>
                                <div className="metadata-item">
                                    <span className="metadata-label">A bordo do </span>
                                    <span className="metadata-value">
                                        Azamara {offer.ship.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </span>
                                </div>
                                <div className="metadata-item">
                                    <span className="metadata-label">Porto de Embarque:</span>
                                    <span className="metadata-value">{offer.EmbarkPortName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}</span>
                                </div>
                            </div>

                            <button className="explore-button" onClick={() => openDetails(offer)}>
                                Explore este itinerário
                            </button>
                        </div>

                        <div className="price-section">
                            <div className="infos-price">

                                <div className="price-label">A partir de</div>
                                <div className="price-value">
                                    {offer.price}
                                </div>
                                <div className="price-description">Tarifa p/ Hóspede*</div>
                                <div className="price-installments">{offer.installments} {offer.priceX}</div>
                            </div>
                            <div className="price-button">

                                <button className="booking-button" onClick={() => openBudget(offer)}>
                                    Solicitar Orçamento
                                </button>

                                <div className="booking-details">
                                    <div className="booking-taxes">
                                        *Impostos, taxas e despesas portuárias inclusas
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

    )


}