import Navbar from "../../components/navbar";
import bannerDesk from "../../assets/Azamara-banner-desk.webp";
import bannerMobile from "../../assets/banner-Mobile-azamara.webp";
import "./Home.css";
import CruiseForm from "../../components/motor"
import CruiseOffersSection from "../../components/promocoes"
import CruiseSections from "../../components/sections/sections"

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <picture>
          <source media="(max-width: 768px)" srcSet={bannerMobile} />
          <img src={bannerDesk} alt="Banner principal" />
        </picture>

        <div className="hero-content">
          {/* <h1>Cruzeiros Royal Caribbean</h1>
          <p>Momentos inesquecíveis a bordo dos maiores navios do mundo</p> */}
          <button>Solicitar Orçamento</button>
        </div>

        <CruiseForm />
      </section>
      <section>
        <CruiseOffersSection />
      </section>
      <section>
        <CruiseSections />
      </section>
    </>
  );
}
