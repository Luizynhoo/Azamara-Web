import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCruiseOffers } from "../../../hooks/useCruiseOffers";
import OfferCard from "../funcionalidades/OfferCard";
import ItineraryPopup from "../funcionalidades/ItineraryPopup";
import SidebarForm from "../funcionalidades/Sidebarform";
import { useCarousel } from "../funcionalidades/useCarousel";
import "../promo.css";

export default function EuropeOffers() {
  const { allOffers = [], loading, error } = useCruiseOffers();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const europeOffers = allOffers.filter((o) =>
    o.category.toLowerCase().includes("europe")
  );

  const [limitedOffers, setLimitedOffers] = useState([]);

useEffect(() => {
  if (europeOffers.length > 0) {
    const slice = europeOffers.slice(0, 6);
    setLimitedOffers((prev) => {
      const same =
        prev.length === slice.length &&
        prev.every((item, i) => item.id === slice[i].id);
      return same ? prev : slice;
    });
  }
}, [allOffers]);

  const {
    currentIndex,
    maxIndex,
    nextSlide,
    prevSlide,
    trackRef,
    setCurrentIndex,
  } = useCarousel(limitedOffers);

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

  if (loading || error || limitedOffers.length === 0) return null;

  return (
    <section className="offers-section europe-section">
      <div className="offers-container">
        <div className="section-header">
          <h2>Melhores Ofertas Europa</h2>
        </div>

        <div className="carousel-wrapper">
          <button
            className={`carousel-btn prev ${currentIndex === 0 ? "disabled" : ""}`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="carousel-container">
            <div ref={trackRef} className="carousel-track">
              {limitedOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onDetails={() => openDetails(offer)}
                  onBudget={() => openBudget(offer)}
                />
              ))}
            </div>
          </div>

          <button
            className={`carousel-btn next ${currentIndex >= maxIndex ? "disabled" : ""}`}
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
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
    </section>
  );
}
