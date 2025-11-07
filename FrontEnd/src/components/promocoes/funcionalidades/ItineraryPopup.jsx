// src/components/cruise/ItineraryPopup.jsx
import { Calendar, Ship, MapPin, X } from "lucide-react";
import "../promo.css";

export default function ItineraryPopup({ offer, onClose, onBudget }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          <X />
        </button>

        <h3>Itinerário</h3>

        <div className="itinerary-item">
          <Calendar size={18} /> <span>{offer.departure}</span>
        </div>
        <div className="itinerary-item">
          <Ship size={18} /> <span>{offer.ship}</span>
        </div>
        <div className="itinerary-item">
          <span>{offer.ports}</span>
        </div>

        <button className="orcamento-btn full" onClick={() => onBudget(offer)}>
          SOLICITAR ORÇAMENTO
        </button>
      </div>
    </div>
  );
}