import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, User, Bell, Calendar } from 'lucide-react';
import './Layout.css';

const navItems = [
  { path: '/announcements', icon: Bell, label: 'Ogłoszenia' },
  { path: '/events', icon: Calendar, label: 'Wydarzenia' },
  { path: '/', icon: Home, label: 'Zadania' },
  { path: '/ranking', icon: Trophy, label: 'Ranking' },
  { path: '/profile', icon: User, label: 'Profil' },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-container">


      <main className="main-content">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={24} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
