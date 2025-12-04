import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Calendar, Star, Users } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import './EventDetailsPage.css';

declare global {
  interface Window {
    google: any;
  }
}

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  
  const event = mockEvents.find(e => e.id === id);

  const eventLocations: { [key: string]: { lat: number; lng: number } } = {
    'Manufaktura': { lat: 51.7753, lng: 19.4577 },
    'Piotrkowska 104': { lat: 51.7592, lng: 19.4560 },
    'Park Poniatowskiego': { lat: 51.7676, lng: 19.4738 },
    'Filharmonia Łódzka': { lat: 51.7594, lng: 19.4558 },
  };

  useEffect(() => {
    if (event && mapRef.current && window.google) {
      const location = eventLocations[event.location] || { lat: 51.7592, lng: 19.4560 };
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: true,
      });

      const marker = document.createElement('div');
      marker.innerHTML = '📍';
      marker.style.fontSize = '32px';
      
      new window.google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: map,
        title: event.location,
        content: marker,
      });
    }
  }, [event]);

  if (!event) {
    return (
      <div className="event-details-page">
        <header className="event-details-header">
          <button className="back-btn" onClick={() => navigate('/events')}>
            <ArrowLeft size={24} />
          </button>
          <h1>Wydarzenie nie znalezione</h1>
        </header>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="event-details-page">
      <header className="event-details-header">
        <button className="back-btn" onClick={() => navigate('/events')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Szczegóły wydarzenia</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="event-details-content">
        <div className="event-main-info">
          <h2>{event.title}</h2>
          
          <div className="event-meta">
            <div className="meta-item">
              <Calendar size={18} />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="meta-item">
              <MapPin size={18} />
              <span>{event.location}</span>
            </div>
            <div className="meta-item">
              <Star size={18} fill="#FFC107" />
              <span>+{event.points} punktów</span>
            </div>
          </div>

          <div className="event-description">
            <h3>Opis wydarzenia</h3>
            <p>{event.description}</p>
          </div>

          <div className="event-additional-info">
            <div className="info-card">
              <Users size={20} />
              <div>
                <h4>Dla kogo?</h4>
                <p>Wydarzenie otwarte dla wszystkich mieszkańców Łodzi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="event-map-section">
          <h3>Lokalizacja</h3>
          <div className="event-map" ref={mapRef}></div>
          <div className="map-address">
            <MapPin size={16} />
            <span>{event.location}, Łódź</span>
          </div>
        </div>

        <div className="event-actions">
          <button className="participate-btn">
            <Star size={20} />
            Wezmę udział
          </button>
          <button className="share-btn">
            Udostępnij
          </button>
        </div>
      </div>
    </div>
  );
}
