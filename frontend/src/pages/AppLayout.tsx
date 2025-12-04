// src/components/AppLayout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AppLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('MICHAŁ');

  // Funkcja do otwierania strony "Moje Osiedle"
  const goToOsiedle = () => {
    navigate('/osiedle');
  };

  return (
    <div className="app-layout">
      {/* Navbar Image */}
      <div className="navbar-container">
        <img src="/navbar.png" alt="Navbar" className="navbar-image" />
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'MICHAŁ' ? 'active' : ''}`}
          onClick={() => setActiveTab('MICHAŁ')}
        >
          MICHAŁ
        </button>
        <button 
          className={`tab ${activeTab === 'DODAJ' ? 'active' : ''}`}
          onClick={() => setActiveTab('DODAJ')}
        >
          DODAJ NOWĄ OSOBĘ
        </button>
      </div>

      {/* Profile Card (przykład kontentu dla MICHAŁ) */}
      {activeTab === 'MICHAŁ' && (
        <div className="profile-card-container">
          <div className="profile-card">
            <img src="/profile_card.png" alt="Profile Card" className="profile-card-image" />
          </div>
        </div>
      )}

      {/* Przycisk Moje Osiedle */}
      <button className="btn-moje-osiedle" onClick={goToOsiedle}>MOJE OSIEDLE</button>

      {/* Tickets Section */}
      <div className="tickets-section">
        <div className="tickets-grid">
          <div className="ticket-card image-ticket">
            <img 
              src="/swieta.png" 
              alt="Święta" 
              className="ticket-image"
            />
          </div>
          <div className="ticket-card image-ticket">
            <img 
              src="/lomot.png" 
              alt="Lo!Moto" 
              className="ticket-image"
            />
          </div>
        </div>
        <h2>POSIADANE BILETY</h2>
        <div className="cta-buttons">
          <button className="btn btn-pink">
            <img src="/rozowy.png" alt="Kup Bilet" className="btn-icon-img" />
            <span className="btn-text">KUP BILET</span>
          </button>
          <button className="btn btn-blue">
            <img src="/niebieski.png" alt="Zaparkuj" className="btn-icon-img" />
            <span className="btn-text">ZAPARKUJ</span>
          </button>
        </div>
        <div className="empty-state">
          <p>Nie posiadasz jeszcze biletów. Kliknij w przycisk aby dokonać!</p>
        </div>
      </div>

      {/* Posiadane Pakiety Section */}
      <div className="pakiety-section">
        <h2>POSIADANE PAKIETY</h2>
        <div className="pakiety-container">
          <img src="/pakiety.png" alt="Posiadane Pakiety" className="pakiety-image" />
        </div>
      </div>
    </div>
  );
}
