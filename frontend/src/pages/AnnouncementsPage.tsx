import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';
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
  return (
    <div className="announcements-page">
      {/* Header */}
      <header className="announcements-header">
        <div className="header-content">
          <div className="header-icon">
            <Bell size={28} />
          </div>
          <div>
            <h1>Ogłoszenia</h1>
            <p className="header-subtitle">Ważne wiadomości dla Ciebie</p>
          </div>
        </div>
      </header>

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
