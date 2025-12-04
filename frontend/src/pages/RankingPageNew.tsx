import { useState } from 'react';
import { Users, TrendingUp, Medal } from 'lucide-react';
import { mockRanking, neighborhoodRanking } from '../data/mockData';
import './RankingPageNew.css';

type TabType = 'district' | 'city';

export function RankingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('district');
  
  // Filtrujemy użytkowników tylko z osiedla Widzew (gdzie mieszka Jan Kowalski)
  const districtUsers = mockRanking.filter(user => user.neighborhood === 'Teofilów')
    .map((user, index) => ({ ...user, rank: index + 1 }));

  return (
    <div className="ranking-page-new">
      <header className="ranking-header-new">
        <div className="header-content">
          <div className="header-icon">
            <Medal size={28} />
          </div>
          <div>
            <h1>Ranking</h1>
            <p className="header-subtitle">Sprawdź swoją pozycję w osiedlu i całym mieście</p>
          </div>
        </div>
      </header>

      <div className="tab-switcher-new">
        <button
          className={`tab-btn-new ${activeTab === 'district' ? 'active' : ''}`}
          onClick={() => setActiveTab('district')}
        >
          <Users size={18} />
          Moje osiedle (Widzew)
        </button>
        <button
          className={`tab-btn-new ${activeTab === 'city' ? 'active' : ''}`}
          onClick={() => setActiveTab('city')}
        >
          <TrendingUp size={18} />
          Osiedla Łodzi
        </button>
      </div>

      {activeTab === 'district' && (
        <div className="ranking-list-new">
          {/* Top 3 w osiedlu */}
          <div className="top-three-new">
            {districtUsers.slice(0, Math.min(3, districtUsers.length)).map((user, index) => (
              <div key={user.id} className={`top-user-new rank-${index + 1}`}>
                <div className="top-avatar-new">
                  <span>{user.firstName[0]}{user.lastName[0]}</span>
                  <div className="medal-badge-new">
                    <Medal size={14} fill="currentColor" />
                  </div>
                </div>
                <span className="top-name-new">{user.firstName}</span>
                <span className="top-points-new">{user.points} pkt</span>
              </div>
            ))}
          </div>

          {/* Pozostali w osiedlu */}
          <div className="ranking-cards-new">
            {districtUsers.slice(3).map((user) => (
              <div 
                key={user.id} 
                className={`ranking-card-new ${user.id === '4' ? 'current-user' : ''}`}
              >
                <span className="rank-position-new">#{user.rank}</span>
                <div className="user-avatar-small-new">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <div className="user-info-ranking-new">
                  <span className="user-name-ranking-new">{user.firstName} {user.lastName}</span>
                  <span className="user-neighborhood-new">{user.neighborhood}</span>
                </div>
                <span className="user-points-ranking-new">{user.points} pkt</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'city' && (
        <div className="neighborhood-ranking-new">
          {neighborhoodRanking.map((neighborhood, index) => (
            <div key={neighborhood.name} className="neighborhood-card-new">
              <div className={`neighborhood-rank-new rank-${index + 1}`}>
                {index < 3 ? <Medal size={20} fill="currentColor" /> : `#${neighborhood.rank}`}
              </div>
              <div className="neighborhood-info-new">
                <span className="neighborhood-name-new">{neighborhood.name}</span>
                <div className="progress-bar-new">
                  <div 
                    className="progress-fill-new"
                    style={{ width: `${(neighborhood.points / 50000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="neighborhood-points-new">{neighborhood.points.toLocaleString()} pkt</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
