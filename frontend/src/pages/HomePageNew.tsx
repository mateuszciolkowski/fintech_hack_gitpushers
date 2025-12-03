import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, X, Bike, Bus, Sparkles, CheckCircle, QrCode, RefreshCw, User } from 'lucide-react';
import { mockUser, mockRanking } from '../data/mockData';
import { generateDailyTask } from '../services/openai';
import type { GeneratedTask } from '../services/openai';
import './HomePageNew.css';

export function HomePage() {
  const navigate = useNavigate();
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

  return (
    <div className="home-page-new">
      {/* Header */}
      <header className="home-header-new">
        <div className="header-content">
          <div className="header-icon">
            <User size={28} />
          </div>
          <div>
            <p className="header-subtitle">Dzień dobry,</p>
            <h1>{mockUser.firstName}</h1>
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
