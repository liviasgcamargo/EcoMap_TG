import React, { useEffect, useRef } from "react";
import { googleMapsApiKey } from "./ChaveAPIGoogleMaps";

const GoogleMap = ({ points }) => {
  const mapContainerRef = useRef(null);
  const scriptRef = useRef(false); // Ref para controlar o carregamento do script

  useEffect(() => {
    // Garantir que o script do Google Maps seja carregado apenas uma vez
    if (!scriptRef.current) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap&v=weekly&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      scriptRef.current = true; // Marcar que o script foi carregado
    }

    // Função de inicialização do mapa
    window.initMap = () => {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: -23.48047, lng: -47.42596 }, // Posição inicial do mapa
        zoom: 12,
      });

      points.forEach((point) => {
        new window.google.maps.Marker({
          position: { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) },
          map: map,
          title: point.endereco,
        });
      });
    };

    // Limpeza do script após a desmontagem
    return () => {
      if (scriptRef.current) {
        const scripts = document.head.getElementsByTagName("script");
        for (let script of scripts) {
          if (script.src.includes("maps.googleapis.com")) {
            document.head.removeChild(script); // Remover o script se ele existir
          }
        }
        scriptRef.current = false; // Reverter a referência
      }
    };
  }, [points]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />;
};

export default GoogleMap;
