import { Settings, Bell, Shield, HelpCircle, ChevronRight, LogOut, Star, MapPin, CreditCard } from 'lucide-react';
import QRCode from 'react-qr-code';
import { mockUser } from '../data/mockData';
import './ProfilePageNew.css';

export function ProfilePage() {
  const menuItems = [
    { icon: Bell, label: 'Powiadomienia', badge: '3' },
    { icon: Shield, label: 'Prywatność i bezpieczeństwo' },
    { icon: HelpCircle, label: 'Pomoc i wsparcie' },
    { icon: Settings, label: 'Ustawienia' },
  ];

  return (
    <div className="profile-page-new">
      {/* User Card */}
      <div className="user-card-new">
        <div className="card-header-new">
          <div className="card-logo-new">ŁÓDŹ.pl</div>
          <div className="card-badge-new">KARTA ŁODZIANINA</div>
        </div>
        
        <div className="card-content-new">
          <div className="qr-section-new">
            <div className="qr-wrapper-new">
              <QRCode 
                value={`${window.location.origin}/user/${mockUser.id}`}
                size={80}
                bgColor="#ffffff"
                fgColor="#ee9342"
                level="M"
              />
            </div>
          </div>
          
          <div className="user-section-new">
            <div className="user-name-card-new">
              {mockUser.firstName} {mockUser.lastName}
            </div>
            <div className="card-number-new">{mockUser.cardNumber}</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid-new">
        <div className="stat-card-new">
          <Star className="stat-icon-new gold" size={24} fill="#FFC107" />
          <span className="stat-value-new">{mockUser.points}</span>
          <span className="stat-label-new">Punktów</span>
        </div>
        <div className="stat-card-new">
          <MapPin className="stat-icon-new" size={24} />
          <span className="stat-value-new">Teofilów</span>
          <span className="stat-label-new">Osiedle</span>
        </div>
        <div className="stat-card-new">
          <CreditCard className="stat-icon-new" size={24} />
          <span className="stat-value-new">#4</span>
          <span className="stat-label-new">Pozycja</span>
        </div>
      </div>

      {/* Menu */}
      <div className="profile-menu-new">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={index} className="menu-item-new">
              <div className="menu-icon-new">
                <Icon size={20} />
              </div>
              <span className="menu-label-new">{item.label}</span>
              {item.badge && <span className="menu-badge-new">{item.badge}</span>}
              <ChevronRight size={18} className="menu-arrow-new" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button className="logout-btn-new">
        <LogOut size={20} />
        <span>Wyloguj się</span>
      </button>
    </div>
  );
}
