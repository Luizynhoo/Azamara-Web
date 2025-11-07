import React from 'react';
import Navbar from "../../components/navbar";
import bannerDesk from "../../assets/Azamara-banner-desk.webp";
import bannerMobile from "../../assets/banner-Mobile-azamara.webp";
import CruiseForm from "../../components/motor";
import CruiseOffersSection from "../../components/promocoes";
import AzamaraSection from "../../components/infos";
import Footer from "../../components/Footer";
import StickyFooter from "../../components/StickyFooter";

// Importando os novos carrosséis
import ShipsSection from "../../components/Carousel/ShipsSection.jsx";
import DestinationsSection from "../../components/Carousel/DestinationSection.jsx";

import "./Home.css";

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
          {/* <button>Solicitar Orçamento</button> */}
        </div>

        <CruiseForm />
      </section>

      <CruiseOffersSection />
      
      <ShipsSection />
      
      <DestinationsSection />

      <AzamaraSection />

      <Footer />
      <StickyFooter />
    </>
  );
}