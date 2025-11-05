import { ChevronLeft, ChevronRight } from "lucide-react";
import "./CruiseSections.css" 

const ships = [
  {
    name: "STAR OF THE SEAS",
    port: "PORT CANAVERAL",
    img: "https://i.imgur.com/7zY5c0K.jpg",
  },
  {
    name: "ICON OF THE SEAS",
    port: "MIAMI",
    img: "https://i.imgur.com/9pV2tXb.jpg",
  },
  {
    name: "UTOPIA OF THE SEAS",
    port: "MIAMI",
    img: "https://i.imgur.com/3kL9mWs.jpg",
  },
];

export default function CruiseSections() {
  const scrollLeft = () => {
    const track = document.getElementById("carousel-track-1");
    track?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    const track = document.getElementById("carousel-track-1");
    track?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft2 = () => {
    const track = document.getElementById("carousel-track-2");
    track?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight2 = () => {
    const track = document.getElementById("carousel-track-2");
    track?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>

      {/* ===== SEÇÃO 1: TEXTO À ESQUERDA ===== */}
      <section className="cruise-section">
        <div className="cruise-content">
          <h2 className="cruise-title">
            MAIS NOVO <br />
            MAIS OUSADO <br />
            O MELHOR
          </h2>
          <p className="cruise-text">
            Viva novas aventuras em alto-mar! Explore os incríveis navios da Royal
            Caribbean e escolha o estilo de viagem que combina com você.
          </p>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={scrollLeft}>
            <ChevronLeft size={28} />
          </button>
          <div id="carousel-track-1" className="carousel-track">
            {ships.map((ship, i) => (
              <div key={i} className="carousel-card">
                <img src={ship.img} alt={ship.name} className="card-img" />
                <div className="card-body">
                  <h3 className="card-name">{ship.name}</h3>
                  <p className="card-port">{ship.port}</p>
                  <button className="card-btn">MAIS DETALHES</button>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={scrollRight}>
            <ChevronRight size={28} />
          </button>
        </div>
      </section>

      {/* ===== SEÇÃO 2: TEXTO À DIREITA (ESPELHADA) ===== */}
      <section className="cruise-section cruise-section--reverse">
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={scrollLeft2}>
            <ChevronLeft size={28} />
          </button>
          <div id="carousel-track-2" className="carousel-track">
            {ships.map((ship, i) => (
              <div key={i} className="carousel-card">
                <img src={ship.img} alt={ship.name} className="card-img" />
                <div className="card-body">
                  <h3 className="card-name">{ship.name}</h3>
                  <p className="card-port">{ship.port}</p>
                  <button className="card-btn">MAIS DETALHES</button>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={scrollRight2}>
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="cruise-content">
          <h2 className="cruise-title">
            EXPERIÊNCIAS <br />
            INESQUECÍVEIS <br />
            A BORDO
          </h2>
          <p className="cruise-text">
            Dos restaurantes premiados às atrações radicais, cada navio foi
            pensado para proporcionar momentos únicos para toda a família.
          </p>
        </div>
      </section>
    </>
  );
}