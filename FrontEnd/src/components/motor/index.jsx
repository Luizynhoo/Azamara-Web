import { useState } from "react";
import { MapPin, Anchor, Clock, Calendar, Users } from "lucide-react";
import "./motor.css";

export default function CruiseForm() {
    const [formData, setFormData] = useState({
        destino: "",
        porto: "",
        duracao: "",
        data: "",
        passageiros: 1,
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log("Dados:", formData);
        alert("Orçamento solicitado!");
    };

    return (
        <div className="motor-wrapper">
            <div className="motor">

                {/* DESTINO */}
                <div className="motor-item">
                    <MapPin className="motor-icon" />
                    <div className="motor-field">
                        <label className="motor-label">VIAJANDO PARA</label>
                        <select
                            value={formData.destino}
                            onChange={(e) => handleChange("destino", e.target.value)}
                            className="motor-select"
                        >
                            <option value="">Qualquer Destino</option>
                            <option value="caribe">Caribe</option>
                            <option value="europa">Europa</option>
                            <option value="alaska">Alaska</option>
                            <option value="bahamas">Bahamas</option>
                        </select>
                    </div>
                </div>

                {/* NAVIOS */}
                <div className="motor-item">
                    <Anchor className="motor-icon" />
                    <div className="motor-field">
                        <label className="motor-label">NAVIO</label>
                        <select
                            value={formData.duracao}
                            onChange={(e) => handleChange("duracao", e.target.value)}
                            className="motor-select"
                        >
                            <option value="">Selecione o seu Navio</option>
                            <option value="Pursuit">Azamara Pursuit</option>
                            <option value="Journey">Azamara Journey</option>
                            <option value="Onward">Azamara Onward</option>
                            <option value="Quest">Azamara Quest</option>
                        </select>
                    </div>
                </div>

                {/* DATA */}
                <div className="motor-item">
                    <Calendar className="motor-icon" />
                    <div className="motor-field">
                        <label className="motor-label">SAÍDA EM</label>
                        <input
                            type="text"
                            placeholder="dd/mm/aaaa"
                            value={formData.data}
                            onChange={(e) => handleChange("data", e.target.value)}
                            className="motor-input"
                        />
                    </div>
                </div>


                {/* BOTÃO */}
                <button className="motor-button" onClick={handleSubmit}>
                    Solicitar Orçamento
                </button>

            </div>
        </div>
    );
}
