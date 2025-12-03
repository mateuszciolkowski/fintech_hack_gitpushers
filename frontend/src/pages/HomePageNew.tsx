import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Maximize2, X, Bike, Bus, Sparkles, CheckCircle, QrCode, RefreshCw } from 'lucide-react';
import { mockUser, mockRanking } from '../data/mockData';
import { generateDailyTask } from '../services/openai';
import type { GeneratedTask } from '../services/openai';
import './HomePageNew.css';

declare global {
  interface Window {
    google: any;
  }
}

export function HomePage() {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const fullMapRef = useRef<HTMLDivElement>(null);
  const [showFullMap, setShowFullMap] = useState(false);
  const [showBikeScanner, setShowBikeScanner] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isGeneratingTask, setIsGeneratingTask] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Zadanie generowane przez AI - sprawdzamy localStorage
  const [dailyTask, setDailyTask] = useState<GeneratedTask>(() => {
    const saved = localStorage.getItem('dailyTask');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      id: 'task-1',
      title: 'Wybierz dziś komunikację miejską',
      description: 'Zamiast samochodu skorzystaj z MPK i zdobądź dodatkowe punkty dla swojego osiedla',
      points: 50,
      completed: false,
      icon: '🚌',
    };
  });

  // Zapisz zadanie do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('dailyTask', JSON.stringify(dailyTask));
  }, [dailyTask]);

  // Funkcja generowania zadania z OpenAI
  const handleGenerateTask = async () => {
    setIsGeneratingTask(true);
    try {
      const newTask = await generateDailyTask();
      setDailyTask(newTask);
    } catch (error) {
      console.error('Failed to generate task:', error);
    } finally {
      setIsGeneratingTask(false);
    }
  };

  // Funkcja weryfikacji zadania przez zdjęcie
  const handleCompleteTask = () => {
    if (dailyTask.completed) return;
    setShowVerificationModal(true);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Sprawdź czy to obraz
    if (!file.type.startsWith('image/')) {
      setVerificationResult({
        success: false,
        message: 'Proszę wybrać plik graficzny (JPG, PNG, etc.)',
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const { verifyTaskCompletion } = await import('../services/openai');
      const result = await verifyTaskCompletion(
        dailyTask.title,
        dailyTask.description,
        file
      );

      setVerificationResult({
        success: result.verified,
        message: result.message,
      });

      if (result.verified) {
        // Oznacz zadanie jako wykonane
        setDailyTask(prev => ({ ...prev, completed: true }));
        
        // Zamknij modal po 2 sekundach
        setTimeout(() => {
          setShowVerificationModal(false);
          setVerificationResult(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationResult({
        success: false,
        message: 'Wystąpił błąd podczas weryfikacji. Spróbuj ponownie.',
      });
    } finally {
      setIsVerifying(false);
      // Wyczyść input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
            <button onclick="window.location.href='/events/${event.id}'" style="background: #0066B3; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; width: 100%;">Zobacz szczegóły</button>
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
    <div className="home-page-new">
      {/* Header */}
      <header className="home-header-new">
        <div className="user-info-new">
          <div className="avatar-new">
            {mockUser.firstName[0]}{mockUser.lastName[0]}
          </div>
          <div className="user-text-new">
            <p className="greeting-new">Dzień dobry,</p>
            <h1 className="user-name-new">{mockUser.firstName}</h1>
          </div>
        </div>
        <div className="points-badge-new">
          <Star className="points-icon-new" size={18} fill="#FFC107" />
          <span className="points-value-new">{mockUser.points}</span>
          <span className="points-label-new">pkt</span>
        </div>
      </header>

      {/* AI Generated Daily Task */}
      <section className="daily-task-section">
        <div className="task-header">
          <div className="task-icon-badge">
            <Sparkles size={18} />
          </div>
          <div>
            <h3>Dzisiejsze wyzwanie</h3>
            <p className="task-subtitle">Wygenerowane specjalnie dla Ciebie</p>
          </div>
          <button 
            className="generate-task-btn" 
            onClick={handleGenerateTask}
            disabled={isGeneratingTask}
            title="Wygeneruj nowe zadanie"
          >
            <RefreshCw size={16} className={isGeneratingTask ? 'spinning' : ''} />
          </button>
        </div>
        <div className="task-card">
          <div className="task-emoji">{dailyTask.icon}</div>
          <div className="task-content">
            <h4>{dailyTask.title}</h4>
            <p>{dailyTask.description}</p>
            <div className="task-reward">
              <Star size={16} fill="#FFC107" />
              <span>+{dailyTask.points} punktów</span>
            </div>
          </div>
          <button 
            className={`complete-task-btn ${dailyTask.completed ? 'completed' : ''}`}
            onClick={handleCompleteTask}
            disabled={dailyTask.completed}
            title={dailyTask.completed ? 'Zadanie wykonane!' : 'Zweryfikuj wykonanie zadania'}
          >
            <CheckCircle size={20} />
          </button>
        </div>
      </section>

      {/* Services - Bike & Ticket */}
      <section className="services-section">
        <h2>Usługi miejskie</h2>
        <div className="services-grid-large">
          <div className="service-card-large bike-service" onClick={() => setShowBikeScanner(true)}>
            <div className="service-card-icon">
              <Bike size={32} />
            </div>
            <h3>Wypożycz rower</h3>
            <p>Zeskanuj kod na rowerze miejskim</p>
          </div>
          <div className="service-card-large ticket-service" onClick={() => setShowTicketModal(true)}>
            <div className="service-card-icon">
              <Bus size={32} />
            </div>
            <h3>Kup bilet MPK</h3>
            <p>Bilety jednorazowe i okresowe</p>
          </div>
        </div>
      </section>

      {/* QR Code Bar */}
      <section className="qr-bar-section" onClick={() => navigate('/generate')}>
        <div className="qr-bar-icon">
          <QrCode size={28} />
        </div>
        <div className="qr-bar-content">
          <h3>Mój kod QR</h3>
          <p>Pokaż swój kod do skanowania</p>
        </div>
        <div className="qr-bar-arrow">→</div>
      </section>

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
        <div id="map" ref={mapRef}></div>
      </section>

      {/* Ranking Preview */}
      <section className="ranking-preview">
        <div className="section-header">
          <h2>Twój ranking</h2>
          <button className="see-all-btn" onClick={() => navigate('/ranking')}>
            Zobacz wszystkie
          </button>
        </div>
        <div className="ranking-items">
          {mockRanking.slice(0, 3).map((user) => (
            <div key={user.id} className="ranking-item">
              <span className="rank-number">#{user.rank}</span>
              <div className="avatar-new">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="ranking-item-info">
                <span className="ranking-item-name">
                  {user.firstName} {user.lastName}
                </span>
                <span className="ranking-item-neighborhood">{user.neighborhood}</span>
              </div>
              <span className="ranking-item-points">{user.points} pkt</span>
            </div>
          ))}
        </div>
      </section>

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
            <div className="full-map" id="full-map" ref={fullMapRef}></div>
          </div>
        </div>
      )}

      {/* Bike Scanner Modal */}
      {showBikeScanner && (
        <div className="map-modal">
          <div className="scanner-modal-content">
            <div className="map-modal-header">
              <h2>Skanuj kod na rowerze</h2>
              <button className="close-modal-btn" onClick={() => setShowBikeScanner(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="scanner-placeholder">
              <div className="scanner-frame-preview"></div>
              <Bike size={64} />
              <p>Skieruj kamerę na kod QR na rowerze miejskim</p>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="map-modal">
          <div className="ticket-modal-content">
            <div className="map-modal-header">
              <h2>Kup bilet MPK</h2>
              <button className="close-modal-btn" onClick={() => setShowTicketModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="ticket-options">
              <div className="ticket-type">
                <h3>Bilety jednorazowe</h3>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Normalny 20 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">4.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Ulgowy 20 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">2.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Normalny 40 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">6.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Ulgowy 40 min</p>
                    <p className="ticket-btn-desc">Łódź strefa A</p>
                  </div>
                  <span className="ticket-btn-price">3.00 zł</span>
                </button>
              </div>
              <div className="ticket-type">
                <h3>Bilety okresowe</h3>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Normalny 30 dni</p>
                    <p className="ticket-btn-desc">Łódź wszystkie strefy</p>
                  </div>
                  <span className="ticket-btn-price">120.00 zł</span>
                </button>
                <button className="ticket-btn">
                  <div className="ticket-btn-content">
                    <p className="ticket-btn-title">Ulgowy 30 dni</p>
                    <p className="ticket-btn-desc">Łódź wszystkie strefy</p>
                  </div>
                  <span className="ticket-btn-price">60.00 zł</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Verification Modal */}
      {showVerificationModal && (
        <div className="map-modal">
          <div className="verification-modal-content">
            <div className="map-modal-header">
              <h2>Zweryfikuj zadanie</h2>
              <button 
                className="close-modal-btn" 
                onClick={() => {
                  setShowVerificationModal(false);
                  setVerificationResult(null);
                }}
              >
                <X size={24} />
              </button>
            </div>
            <div className="verification-content">
              {isVerifying ? (
                <div className="verifying-state">
                  <div className="verification-loader">
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                  </div>
                  <p className="verification-loading-text">Analizuję zdjęcie...</p>
                  <p className="verification-loading-subtext">AI sprawdza wykonanie zadania</p>
                </div>
              ) : !verificationResult ? (
                <>
                  <div className="verification-task-card">
                    <div className="verification-task-emoji">{dailyTask.icon}</div>
                    <div>
                      <h4 className="verification-task-title">{dailyTask.title}</h4>
                      <p className="verification-task-desc">{dailyTask.description}</p>
                    </div>
                  </div>
                  <p className="verification-instruction">
                    Wyślij zdjęcie potwierdzające wykonanie tego zadania
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="upload-photo-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span>Wybierz zdjęcie z galerii</span>
                  </button>
                </>
              ) : (
                <div className={`verification-result ${verificationResult.success ? 'success' : 'failure'}`}>
                  <h3 className="verification-title">
                    {verificationResult.success ? 'Gratulacje!' : 'Ups...'}
                  </h3>
                  <p className="verification-message">{verificationResult.message}</p>
                  {!verificationResult.success && (
                    <button
                      className="try-again-btn"
                      onClick={() => {
                        setVerificationResult(null);
                      }}
                    >
                      Spróbuj ponownie
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
