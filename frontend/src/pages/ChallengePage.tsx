import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import { mockQRChallenges } from '../data/mockData';
import './ChallengePage.css';

export function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const challenge = mockQRChallenges.find(c => c.id === id) || {
    id: id || 'unknown',
    title: 'Wyzwanie odkryte!',
    description: 'Gratulacje! Znalazłeś sekretny kod QR. Zdobywasz dodatkowe punkty!',
    points: 50,
    location: 'Łódź',
    expiresAt: '2025-12-31',
  };

  const handleClaim = () => {
    // Here you would typically send a request to the backend
    alert(`Gratulacje! Zdobyłeś ${challenge.points} punktów!`);
    navigate('/');
  };

  return (
    <div className="challenge-page">
      <header className="challenge-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Wyzwanie</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="challenge-card">
        <div className="challenge-icon">
          <Star size={48} />
          <div className="challenge-glow"></div>
        </div>

        <h2 className="challenge-title">{challenge.title}</h2>
        <p className="challenge-description">{challenge.description}</p>

        <div className="challenge-details">
          <div className="detail-item">
            <Star size={18} className="detail-icon gold" />
            <span className="detail-value">+{challenge.points}</span>
            <span className="detail-label">punktów</span>
          </div>
          <div className="detail-item">
            <MapPin size={18} className="detail-icon blue" />
            <span className="detail-value">{challenge.location}</span>
          </div>
          <div className="detail-item">
            <Clock size={18} className="detail-icon" />
            <span className="detail-value">
              do {new Date(challenge.expiresAt).toLocaleDateString('pl')}
            </span>
          </div>
        </div>

        <button className="claim-btn" onClick={handleClaim}>
          <CheckCircle size={20} />
          Odbierz nagrodę
        </button>
      </div>

      <div className="challenge-info">
        <h3>Jak to działa?</h3>
        <ol>
          <li>Znajdź kod QR w wyznaczonej lokalizacji</li>
          <li>Zeskanuj kod za pomocą aplikacji</li>
          <li>Odbierz punkty i wspieraj swoje osiedle!</li>
        </ol>
      </div>
    </div>
  );
}
