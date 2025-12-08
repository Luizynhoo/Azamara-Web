import { useState, useEffect } from "react";
import { getCruises } from "../services/getCruises";
import { formatCurrency, formatDate } from '../utils/FormarterFields';

export function useCruiseOffers() {
  const [allOffers, setAllOffers] = useState([]); // Todos os dados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const data = await getCruises();

        console.log(data);

        const now = new Date();
        const valid = data.value
          .filter((o) => new Date(o.embarkDate) > now)
          .sort((a, b) => a.cruiseFare - b.cruiseFare);

        const mapped = valid.map((o) => ({
          id: o.id,
          code: o.productId,
          category: o.destination.toUpperCase(),
          ship: o.shipName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
          title: o.productName,
          departure: formatDate(o.embarkDate),
          departureRaw: o.embarkDate, // Mantém data raw para filtros
          EmbarkDate: o.embarkDate.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
          price: `R$ ${formatCurrency(o.cruiseFare)}`,
          priceValue: o.cruiseFare, // Para ordenação
          priceX: `R$ ${formatCurrency(o.cruiseFare / 10)}`,
          installments: "Em 10x de",
          discount: "SEM ENTRADA",
          taxes: "Sem entrada e em até 10x sem juros",
          nights: o.duration,

          // image: o.ImageBackground,
          // EmbarkPortName: o.EmbarkPortName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()) || "N/A",
          // ports: o.ItineraryPortNames,
          // itinerary: o.Itinerary
        }));

        setAllOffers(mapped);
      } catch (err) {
        console.error("Erro ao carregar ofertas:", err);
        setError("Não foi possível carregar as ofertas.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { allOffers, loading, error };
}