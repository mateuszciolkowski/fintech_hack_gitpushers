import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePageNew';
import { ScanPage } from './pages/ScanPage';
import { RankingPage } from './pages/RankingPageNew';
import { ProfilePage } from './pages/ProfilePageNew';
import { ChallengePage } from './pages/ChallengePage';
import { GenerateQRPage } from './pages/GenerateQRPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="generate" element={<GenerateQRPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
        </Route>
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/challenge/:id" element={<ChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
