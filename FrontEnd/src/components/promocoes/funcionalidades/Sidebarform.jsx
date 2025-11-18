import { X } from "lucide-react";
import "../promo.css";

export default function SidebarForm({ sidebarOpen, setSidebarOpen, offer }) {

  if (!sidebarOpen) return null;

  const hasOffer = offer && offer.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log("Orçamento solicitado:", {
      cliente: data,
      oferta: hasOffer
        ? {
          id: offer.id,
          title: offer.title,
          ship: `Azamara ${offer.ship}`,
          departure: offer.departure,
          price: offer.price,
          ports: offer.ports,
        }
        : "Nenhuma oferta selecionada",
    });

    alert("Orçamento solicitado com sucesso!");
    setSidebarOpen(false);
  };


  return (
    <>
      <div
        className="sidebar-backdrop"
        onClick={() => setSidebarOpen(false)}
      />

      <div className="sidebar open">
        <div className="sidebar-header">
          <h3>Solicitar Orçamento</h3>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <form className="sidebar-form" onSubmit={handleSubmit}>
          {hasOffer && (
            <div className="offer-info">
              <h4>Oferta Selecionada</h4>

              <input
                type="text"
                value={offer.title}
                readOnly
                className="readonly"
              />

              <div className="offer-grid">
                <input
                  type="text"
                  value={`Azamara ${offer.ship}`}
                  readOnly
                  className="readonly"
                  placeholder="Navio"
                />
                <input
                  type="text"
                  value={offer.departure}
                  readOnly
                  className="readonly"
                  placeholder="Embarque"
                />
              </div>
              <input
                type="text"
                value={`A partir de ${offer.price}`}
                readOnly
                className="readonly"
                placeholder="Embarque"
              />
            </div>
          )}

          {/* === DADOS DO CLIENTE === */}
          <div className="client-info">
            <h4>Seus Dados</h4>

            <input
              type="text"
              name="name"
              placeholder="Nome completo *"
              required
            />

            <select name="tipoCliente" required>
              <option value="" disabled selected>
                Tipo de Cliente*
              </option>
              <option value="particular">Sou Hóspede</option>
              <option value="agencia">Sou Agência de Viagens</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="E-mail *"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone com DDD *"
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Número de hóspedes*"
              max={4}
              min={0}
              minLength={0}
              maxLength={4}
              required
            />
            <textarea
              name="message"
              placeholder="Informe os dados para reserva (opcional)"
              rows="3"
            />
          </div>

          <button type="submit" className="orcamento-btn full">
            ENVIAR ORÇAMENTO
          </button>
        </form>
      </div>
    </>
  );
}
