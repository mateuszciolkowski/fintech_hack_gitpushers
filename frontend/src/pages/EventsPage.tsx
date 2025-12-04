import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Star, Maximize2, X } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import './EventsPage.css';

declare global {
  interface Window {
    google: any;
  }
}

export function EventsPage() {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const fullMapRef = useRef<HTMLDivElement>(null);
  const [showFullMap, setShowFullMap] = useState(false);
  const [sortedEvents] = useState(
    [...mockEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const initializeMap = (mapElement: HTMLDivElement, zoom: number = 13) => {
    if (!window.google) return null;
    
    const lodz = { lat: 51.7592, lng: 19.4560 };
    const map = new window.google.maps.Map(mapElement, {
      center: lodz,
      zoom: zoom,
      mapId: 'DEMO_MAP_ID',
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // Wydarzenia na mapie z klikalnymi markerami
    const events = [
      { id: '1', lat: 51.7753, lng: 19.4577, title: 'Jarmark Bożonarodzeniowy', location: 'Manufaktura', date: '2025-12-15' },
      { id: '4', lat: 51.7592, lng: 19.4560, title: 'Koncert na Piotrkowskiej', location: 'Piotrkowska 104', date: '2025-12-20' },
      { id: '2', lat: 51.7676, lng: 19.4738, title: 'Bieg Niepodległości', location: 'Park Poniatowskiego', date: '2025-12-08' },
    ];

    const infoWindow = new window.google.maps.InfoWindow();

    events.forEach(event => {
      const marker = document.createElement('div');
      marker.className = 'map-marker';
      marker.innerHTML = '📍';
      marker.style.fontSize = '28px';
      marker.style.cursor = 'pointer';
      
      const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
        position: { lat: event.lat, lng: event.lng },
        map: map,
        title: event.title,
        content: marker,
      });

      advancedMarker.addListener('click', () => {
        const eventDate = new Date(event.date).toLocaleDateString('pl-PL');
        infoWindow.setContent(`
          <div style="padding: 12px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">${event.title}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">📍 ${event.location}</p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">📅 ${eventDate}</p>
            <button onclick="window.location.href='/events/${event.id}'" style="background: #ee9342; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; width: 100%;">Zobacz szczegóły</button>
          </div>
        `);
        infoWindow.open(map, advancedMarker);
      });
    });

    return map;
  };

  useEffect(() => {
    if (mapRef.current && window.google) {
      initializeMap(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (showFullMap && fullMapRef.current && window.google) {
      initializeMap(fullMapRef.current, 14);
    }
  }, [showFullMap]);

  return (
    <div className="events-page">
      <header className="events-header">
        <div className="header-content">
          <div className="header-icon">
            <Calendar size={28} />
          </div>
          <div>
            <h1>Wydarzenia</h1>
            <p className="header-subtitle">Ważne wiadomości dla Ciebie</p>
          </div>
        </div>
      </header>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-header">
          <h2>
            <MapPin size={20} />
            Mapa wydarzeń w okolicy
          </h2>
          <button className="expand-map-btn" onClick={() => setShowFullMap(true)}>
            <Maximize2 size={16} />
            Rozwiń
          </button>
        </div>
        <div id="events-map" ref={mapRef}></div>
      </section>

      <div className="events-list">
        {sortedEvents.map((event) => (
          <div key={event.id} className="event-card-full">
            <div className="event-date-badge">
              <Calendar size={16} />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <h3>{event.title}</h3>
            
            <div className="event-location-row">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
            
            <p className="event-description">{event.description}</p>
            
            <div className="event-footer">
              <div className="event-points-badge">
                <Star size={14} fill="#FFC107" />
                <span>+{event.points} pkt</span>
              </div>
              <button 
                className="event-details-btn"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                Szczegóły
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Map Modal */}
      {showFullMap && (
        <div className="map-modal">
          <div className="map-modal-content">
            <div className="map-modal-header">
              <h2>Mapa wydarzeń</h2>
              <button className="close-modal-btn" onClick={() => setShowFullMap(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="full-map" id="full-events-map" ref={fullMapRef}></div>
          </div>
        </div>
      )}
    </div>
  );
}
