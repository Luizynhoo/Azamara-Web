import { Calendar, Ship, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./promo.css";

const cruiseOffers = [  {
    id: 1,
    image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
    category: "CARIBE",
    title: "7 NIGHT EASTERN CARIBBEAN & PERFECT DAY",
    departure: "Sáb., 10 Outubro 2026",
    ship: "Icon of the Seas",
    itinerary: "Miami, Charlotte Amalie, San Juan, Perfect Day At CocoCay",
    installments: "Em até 10x de",
    price: "R$ 914,12",
    oldPrice: "R$ 1.234,56",
    discount: "SEM ENTRADA",
    taxes: "Sem entrada e em até 10x sem juros"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
    category: "CARIBE",
    title: "4 NIGHT EASTERN CARIBBEAN CRUISE",
    departure: "Qui., 28 Janeiro 2027",
    ship: "Freedom of the Seas",
    itinerary: "Miami, Labadee, Miami",
    installments: "Em até 10x de",
    price: "R$ 234,84",
    oldPrice: "R$ 456,78",
    discount: "SEM ENTRADA",
    taxes: "Sem entrada e em até 10x sem juros"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
    category: "CARIBE",
    title: "3 NIGHT PERFECT DAY GETAWAY CRUISE",
    departure: "Sex., 20 Novembro 2026",
    ship: "Wonder of the Seas",
    itinerary: "Miami, Perfect Day At CocoCay, Miami",
    installments: "Em até 10x de",
    price: "R$ 301,45",
    oldPrice: "R$ 589,90",
    discount: "SEM ENTRADA",
    taxes: "Sem entrada e em até 10x sem juros"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
    category: "SHORT CARIBE",
    title: "3 Night Bahamas & Perfect Day Cruise",
    departure: "Sex., 6 Março 2026",
    ship: "Wonder of the Seas",
    itinerary: "Miami, Estados Unidos; Perfect Day At Cococay, Bahamas; Nassau, Bahamas; Miami, Estados Unidos",
    installments: "Em até 10x de",
    price: "R$ 286,78",
    oldPrice: "R$ 523,45",
    discount: "SEM ENTRADA",
    taxes: "Sem entrada e em até 10x sem juros"
  }];

export default function CruiseOffersSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // calcula quantas cards aparecem por vez baseado na largura
  function getVisibleCount() {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 768) return 1;    
    if (w < 1024) return 2;     
    return 3;                   
  }

  // atualiza visibleCount no resize
  useEffect(() => {
    const onResize = () => {
      const newVisible = getVisibleCount();
      setVisibleCount((prev) => {
        if (prev === newVisible) return prev;
        return newVisible;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // recalcula páginas e ajusta currentPage se necessário
  const totalPages = Math.max(1, Math.ceil(cruiseOffers.length / visibleCount));

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(totalPages - 1);
    }
  }, [visibleCount, totalPages, currentPage]);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="offers-section">
      <div className="promo-banner">
        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176376.png" alt="Sem juros" className="promo-icon" />
        <span>Sem entrada e em até 10x sem juros</span>
      </div>

      <div className="offers-container">
        <div className="section-header">
          <span className="section-label">MELHOR PREÇO GARANTIDO</span>
          <h2>NOSSAS MELHORES OFERTAS</h2>
        </div>

        <div className="carousel-wrapper">
          <button
            className={`carousel-btn prev ${currentPage === 0 ? "disabled" : ""}`}
            onClick={prevSlide}
            disabled={currentPage === 0}
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>

          <div className="carousel-container">
            {/* track: cada "page" equivale a 100% da área visível */}
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
                /* para suavizar um pouco: */
                transition: "transform 0.5s ease"
              }}
            >
              {cruiseOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="offer-card"
                  style={{ flex: `0 0 ${100 / visibleCount}%` }} // cada card ocupa 1/visibleCount
                >
                  <div className="card-image">
                    <img src={offer.image} alt={offer.title} />
                    <span className="category-badge">{offer.category}</span>
                  </div>

                  <div className="card-content">
                    <h3>{offer.title}</h3>

                    <div className="info-item">
                      <Calendar size={18} />
                      <div>
                        <span className="info-label">Data de Embarque:</span>
                        <span className="info-value">{offer.departure}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <Ship size={18} />
                      <div>
                        <span className="info-label">A bordo do:</span>
                        <span className="info-value">{offer.ship}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <MapPin size={18} />
                      <div>
                        <span className="info-label">Itinerário:</span>
                        <span className="info-value">{offer.itinerary}</span>
                      </div>
                    </div>

                    <div className="pricing">
                      <div className="price-info">
                        <span className="installments">{offer.installments}</span>
                        <div className="price-row">
                          <span className="price">{offer.price}</span>
                          <div className="discount-badge">
                            <span className="discount-label">MELHOR PREÇO</span>
                            <span className="discount-value">{offer.discount}</span>
                          </div>
                        </div>
                        <span className="per-person">MÉDIA POR PESSOA</span>
                      </div>
                    </div>

                    <button className="details-btn">MAIS DETALHES</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`carousel-btn next ${currentPage === totalPages - 1 ? "disabled" : ""}`}
            onClick={nextSlide}
            disabled={currentPage === totalPages - 1}
            aria-label="Próximo"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Ir para página ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
