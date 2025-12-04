import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';
import './AnnouncementsPage.css';

const mockAnnouncements = [
  {
    id: 1,
    type: 'alert', // Zmieniono z info na alert, bo to pilne
    icon: AlertCircle,
    title: 'Awaria ogrzewania (C.O.)',
    description: 'W związku z awarią sieci ciepłowniczej, kaloryfery w bloku nr 4 będą zimne do godziny 20:00.',
    date: '2025-12-10',
    category: 'Awarie',
  },
  {
    id: 2,
    type: 'success',
    icon: CheckCircle,
    title: 'Winda (w końcu) naprawiona',
    description: 'Serwis usunął usterkę w klatce C. Dziękujemy za cierpliwość i chodzenie po schodach przez 3 tygodnie.',
    date: '2025-12-08',
    category: 'Naprawy',
  },
  {
    id: 3,
    type: 'alert',
    icon: AlertCircle,
    title: 'Nocne wiercenie w betonie',
    description: 'Przypominamy o ciszy nocnej. Remonty w lokalu nr 12 prosimy przeprowadzać w godzinach 8:00–20:00.',
    date: '2025-12-08',
    category: 'Skargi',
  },
  {
    id: 4,
    type: 'info',
    icon: Info,
    title: 'Harmonogram: Gabaryty',
    description: 'Wystawianie starych mebli pod śmietnik dozwolone tylko w czwartek wieczorem. Prosimy nie blokować chodnika.',
    date: '2025-12-05',
    category: 'Administracja',
  },
  {
    id: 5,
    type: 'info', // Zmieniono typ, bo to ogłoszenie
    icon: Info,
    title: 'Znaleziono klucze',
    description: 'Na ławce przy placu zabaw znaleziono pęk kluczy z breloczkiem "Najlepszy Tata". Do odbioru u dozorcy.',
    date: '2025-12-03',
    category: 'Biuro Rzeczy Znalezionych',
  },
];


export function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<'admin' | 'matters'>('admin');

  return (
    <div className="announcements-page">
      {/* Header */}
      <header className="announcements-header">
        <div className="header-content">
          <div className="header-icon">
            <Bell size={28} />
          </div>
          <div>
            <h1>Tablica osiedla</h1>
            <p className="header-subtitle">Ważne wiadomości dla Ciebie</p>
          </div>
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="tab-switcher">
        <button
          className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          Kontakty administracyjne
        </button>
        <button
          className={`tab-button ${activeTab === 'matters' ? 'active' : ''}`}
          onClick={() => setActiveTab('matters')}
        >
          Sprawy bieżące
        </button>
      </div>

      {/* Administration Info */}
      {activeTab === 'admin' && (
        <div className="admin-info-card">
          <div className="admin-info-section">
            <div className="admin-grid">
              <div className="admin-item">
                <span className="admin-label">Nazwa Firmy</span>
                <span className="admin-value">Widzewskie Nieruchomości Sp. z o.o.</span>
              </div>
              <div className="admin-item">
                <span className="admin-label">Adres Biura</span>
                <span className="admin-value">ul. Przykładowa 5/1, 92-400 Łódź</span>
              </div>
              <div className="admin-item">
                <span className="admin-label">Osoba do Kontaktu</span>
                <span className="admin-value">Piotr Zaradny<br /><small>(Licencjonowany Zarządca Nieruchomości)</small></span>
              </div>
              <div className="admin-item">
                <span className="admin-label">Telefon do Administracji</span>
                <span className="admin-value">(42) 678 90 12</span>
              </div>
              <div className="admin-item">
                <span className="admin-label">E-mail do Administracji</span>
                <span className="admin-value">biuro@widzewskienieruchomosci.pl</span>
              </div>
              <div className="admin-item">
                <span className="admin-label">Godziny Otwarcia Biura</span>
                <span className="admin-value">Pon. - Pt., 8:00 - 16:00</span>
              </div>
            </div>

            <div className="admin-emergency">
              <h3 className="admin-subtitle">Pogotowie Awarii</h3>
              <div className="emergency-grid">
                <div className="emergency-item">
                  <span className="emergency-label">Awarie (Ogólne)</span>
                  <span className="emergency-value">500 900 800</span>
                </div>
                <div className="emergency-item">
                  <span className="emergency-label">Hydraulika, elektryka, CO</span>
                  <span className="emergency-value">500 900 800</span>
                </div>
                <div className="emergency-item">
                  <span className="emergency-label">Awarie Gazowe</span>
                  <span className="emergency-value">992</span>
                </div>
                <div className="emergency-item">
                  <span className="emergency-label">Awarie Energetyczne</span>
                  <span className="emergency-value">991</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Matters */}
      {activeTab === 'matters' && (
        <div className="admin-info-card">
          <div className="admin-info-section">
            <div className="matters-grid">
              <div className="matters-item">
                <span className="matters-label">Konserwacja dachów</span>
                <span className="matters-value">Planowana na styczeń 2026</span>
              </div>
              <div className="matters-item">
                <span className="matters-label">Wymiana okien klatki A</span>
                <span className="matters-value">Realizacja: grudzień 2025 - luty 2026</span>
              </div>
              <div className="matters-item">
                <span className="matters-label">Remont elewacji</span>
                <span className="matters-value">Przygotowanie dokumentacji</span>
              </div>
              <div className="matters-item">
                <span className="matters-label">Modernizacja oświetlenia</span>
                <span className="matters-value">Przetarg w toku</span>
              </div>
              <div className="matters-item">
                <span className="matters-label">Zmiana sprzątaczki</span>
                <span className="matters-value">Nowa pracownica od 1 grudnia</span>
              </div>
              <div className="matters-item">
                <span className="matters-label">Przegląd instalacji gazowej</span>
                <span className="matters-value">Harmonogram dostępny u dozorcy</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="announcements-list">
        {mockAnnouncements.map((announcement) => {
          const IconComponent = announcement.icon;
          return (
            <div
              key={announcement.id}
              className={`announcement-card announcement-${announcement.type}`}
            >
              <div className="announcement-icon-wrapper">
                <IconComponent size={24} />
              </div>
              <div className="announcement-content">
                <div className="announcement-header-row">
                  <h3>{announcement.title}</h3>
                  <span className="announcement-category">{announcement.category}</span>
                </div>
                <p className="announcement-description">{announcement.description}</p>
                <span className="announcement-date">
                  {new Date(announcement.date).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
