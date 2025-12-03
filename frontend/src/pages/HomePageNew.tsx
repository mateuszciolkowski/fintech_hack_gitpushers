import { useState } from 'react';
import './HomePageNew.css';


export function HomePage() {
  const [activeTab, setActiveTab] = useState('MICHAŁ');

  const user = {
    firstName: 'MICHAŁ',
    lastName: 'KAŹMIERCZAK',
    id: '9900000994461',
  };

  const tickets = [
    {
      id: 1,
      title: 'ŚWIĘTA',
      subtitle: '01-24 GRUDNIA',
      type: 'KARTA ŁODZIANINA',
    },
    {
      id: 2,
      title: 'Lo!Moto',
      subtitle: 'BILETY -24h',
      type: 'MŁAD W ŁOMACH',
    }
  ];

  return (
    <div className="home-page-redesigned">
      {/* Status Bar */}
      <div className="status-bar">
       
      </div>

      {/* Header Icons */}
      <div className="header-icons">
        <div className="icon-item">🌐</div>
        <div className="icon-item bell">
          🔔
          <span className="notification-dot"></span>
        </div>
        <div className="icon-item">💰 0,00 PLN</div>
        <div className="icon-item">📍 W POBLIŻU</div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'MICHAŁ' ? 'active' : ''}`}
          onClick={() => setActiveTab('MICHAŁ')}
        >
          MATEUSZ
        </button>
        <button 
          className={`tab ${activeTab === 'DODAJ' ? 'active' : ''}`}
          onClick={() => setActiveTab('DODAJ')}
        >
          DODAJ NOWĄ OSOBĘ
        </button>
      </div>

      {/* Profile Card */}
      {activeTab === 'MICHAŁ' && (
        <div className="profile-card-container">
            <div className="profile-card">
              <img src="/profile_card.png" alt="Profile Card" className="profile-card-image" />
              </div>
        </div>
      )}

      {/* Tickets Section */}
      <div className="tickets-section">
        <h2>POSIADANE BILETY</h2>
        <div className="tickets-grid">
          {tickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-content">
                <h4>{ticket.title}</h4>
                <p className="ticket-subtitle">{ticket.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <button className="btn btn-pink">
            🛒 KUP BILET
          </button>
          <button className="btn btn-blue">
            📍 ZAPARKUJ
          </button>
        </div>

        {/* Empty state message */}
        <div className="empty-state">
          <p>Nie posiadasz jeszcze biletów. Kliknij w przycisk aby dokonać!</p>
        </div>
      </div>
    </div>
  );
}
