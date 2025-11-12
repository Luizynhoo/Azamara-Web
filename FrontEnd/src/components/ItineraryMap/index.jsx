import React, { useEffect, useRef, useState } from 'react';

export default function ItineraryMap({ offer, onClose }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [portsData, setPortsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MAPBOX_API_KEY = 'pk.eyJ1IjoiZ2FicmllbG1hcnF1ZXMxIiwiYSI6ImNtaHdlZzJ0MjA1eWkyaW9vdHF5MG55em0ifQ.Cyrkjglus9X1mSGFgNoz3A';

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.async = true;
    script.onload = () => {
      loadPortsAndInitMap();
    };
    document.head.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const loadPortsAndInitMap = async () => {
    try {
      setLoading(true);

      // Busca coordenadas para cada porto
      const portsPromises = offer.itinerary?.map(async (port) => {
        try {
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(port.PortName)}.json?` +
            `country=${encodeURIComponent(port.CountryCode)}` +
            `&types=locality,place,poi,address,region` +
            `&limit=1` +
            `&access_token=${MAPBOX_API_KEY}`);

          if (!response.ok) throw new Error('Erro ao buscar porto');

          const data = await response.json();


          if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            return {
              ...port,
              lat,
              lng,
              coordinates: [lng, lat]
            };
          }
          return null;
        } catch (err) {
          console.error(`Erro ao buscar ${port.PortName}:`, err);
          return null;
        }
      });

      const ports = await Promise.all(portsPromises);


      const validPorts = ports.filter(p => p !== null);

      setPortsData(validPorts);

      if (validPorts.length > 0) {
        initializeMap(validPorts);
      } else {
        setError('Não foi possível encontrar as coordenadas dos portos');
      }

      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar portos:', err);
      setError('Erro ao carregar o mapa');
      setLoading(false);
    }
  };

  const initializeMap = (ports) => {
    if (!window.mapboxgl || mapRef.current) return;

    window.mapboxgl.accessToken = MAPBOX_API_KEY;

    setTimeout(() => {
      if (!mapContainerRef.current) return;

      const map = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: ports[0].coordinates,
        zoom: 6
      });

      map.on('load', () => {
        // Adiciona fonte para a rota
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: ports.map(p => p.coordinates)
            }
          }
        });

        // Linha de contorno branca
        map.addLayer({
          id: 'route-outline',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ffffff',
            'line-width': 6
          }
        });

        // Linha principal azul tracejada
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 4,
            'line-dasharray': [2, 1]
          }
        });

        // Adiciona marcadores
        ports.forEach((port, index) => {
          const el = document.createElement('div');
          el.className = 'port-marker';
          el.textContent = index + 1;
          el.style.cssText = `
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3b82f6;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
        `;

          const popup = new window.mapboxgl.Popup({ offset: 25 })
            .setHTML(`
            <div style="padding: 8px;">
              <strong style="color: #333;">${port.PortName}</strong><br/>
              <span style="color: #666; font-size: 12px;">Dia ${port.DayOfCruise}</span><br/>
              <span style="color: #666; font-size: 11px;">Código: ${port.PortCode}</span><br/>
              ${port.ArrivalTime ? `<span style="color: #666; font-size: 11px;">Chegada: ${port.ArrivalTime}</span><br/>` : ''}
              ${port.DepartureTime ? `<span style="color: #666; font-size: 11px;">Saída: ${port.DepartureTime}</span>` : ''}
            </div>
          `);

          new window.mapboxgl.Marker(el)
            .setLngLat(port.coordinates)
            .setPopup(popup)
            .addTo(map);
        });

        // Ajusta o zoom para mostrar toda a rota
        const bounds = new window.mapboxgl.LngLatBounds();
        ports.forEach(port => bounds.extend(port.coordinates));
        map.fitBounds(bounds, { padding: 80, maxZoom: 10 });
      });

      mapRef.current = map;
    }, 100);
  };

  if (loading) {
    return (
      <div className="map-overlay">
        <style>{styles}</style>
        <div className="map-modal">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando mapa do itinerário...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-overlay">
        <style>{styles}</style>
        <div className="map-modal">
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={onClose} className="close-button">Fechar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-overlay">
      <style>{styles}</style>
      <div className="map-modal">
        <div className="map-header">
          <h2 className="map-title">Itinerário do Cruzeiro</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="map-content">
          <div className="map-sidebar">
            <h3 className="sidebar-title">Portos de Escala</h3>
            <div className="ports-list">
              {portsData.map((port, index) => (
                <div key={port.PortCode} className="port-item">
                  <div className="port-number">{index + 1}</div>
                  <div className="port-info">
                    <div className="port-name">{port.PortName}</div>
                    <div className="port-details">
                      <span className="port-day">Dia {port.DayOfCruise}</span>
                      <span className="port-code">{port.PortCode}</span>
                    </div>
                    {port.ArrivalTime && (
                      <div className="port-times">
                        Chegada: {port.ArrivalTime}
                        {port.DepartureTime && ` • Saída: ${port.DepartureTime}`}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={mapContainerRef} className="map-container"></div>
        </div>
      </div>
    </div>
  );
}

const styles = `
  .map-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  }

  .map-modal {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 1400px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .map-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .map-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 28px;
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: #f3f4f6;
    color: #333;
  }

  .map-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .map-sidebar {
    width: 320px;
    background: #f9fafb;
    border-right: 1px solid #e5e7eb;
    overflow-y: auto;
    padding: 20px;
  }

  .sidebar-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
  }

  .ports-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .port-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .port-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
    flex-shrink: 0;
  }

  .port-info {
    flex: 1;
    min-width: 0;
  }

  .port-name {
    font-weight: 600;
    color: #333;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .port-details {
    display: flex;
    gap: 8px;
    margin-bottom: 2px;
  }

  .port-day {
    font-size: 12px;
    color: #666;
  }

  .port-code {
    font-size: 11px;
    color: #3b82f6;
    font-family: monospace;
    font-weight: 600;
  }

  .port-times {
    font-size: 11px;
    color: #999;
    margin-top: 4px;
  }

  .map-container {
    flex: 1;
    position: relative;
  }

  .loading-container,
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f4f6;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-container p {
    color: #666;
    font-size: 16px;
  }

  .error-message {
    color: #ef4444;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .close-button {
    padding: 10px 24px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }

  .close-button:hover {
    background: #2563eb;
  }
`;