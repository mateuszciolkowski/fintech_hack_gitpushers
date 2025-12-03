import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Newspaper, Calendar, User, ShoppingCart, Menu } from 'lucide-react';
import './Layout.css';

const navItems = [
  { path: '/', icon: Newspaper, label: 'NEWSY' },
  { path: '/events', icon: Calendar, label: 'WYDARZENIA' },
  { path: '/profile', icon: User, label: 'PROFIL', highlight: true },
  { path: '/ranking', icon: ShoppingCart, label: 'KOSZYK' },
  { path: '#', icon: Menu, label: 'MENU' },
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
              className={`nav-item ${isActive ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
              onClick={() => item.path !== '#' && navigate(item.path)}
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
