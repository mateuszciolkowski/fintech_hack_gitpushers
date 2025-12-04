import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { mockUser } from '../data/mockData';
import './GenerateQRPage.css';

export function GenerateQRPage() {
  const navigate = useNavigate();
  const [showShareMessage, setShowShareMessage] = useState(false);
  
  const userQRData = JSON.stringify({
    userId: mockUser.id,
    name: `${mockUser.firstName} ${mockUser.lastName}`,
    cardNumber: mockUser.cardNumber,
  });

  const handleDownloadQR = () => {
    const svg = document.getElementById('user-qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `karta-lodzianina-${mockUser.cardNumber}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mój kod QR - Karta Łodzianina',
        text: `Zeskanuj mój kod QR! ${mockUser.firstName} ${mockUser.lastName}`,
      });
    } else {
      setShowShareMessage(true);
      setTimeout(() => setShowShareMessage(false), 2000);
    }
  };

  return (
    <div className="generate-qr-page">
      <header className="generate-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Twój kod QR</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="user-qr-card">
        <div className="user-info-header">
          <div className="avatar-generate">
            {mockUser.firstName[0]}{mockUser.lastName[0]}
          </div>
          <div>
            <h2>{mockUser.firstName} {mockUser.lastName}</h2>
            <p className="card-number-text">Karta: {mockUser.cardNumber}</p>
          </div>
        </div>

        <div className="qr-code-display">
          <QRCode
            id="user-qr-code"
            value={userQRData}
            size={240}
            bgColor="#ffffff"
            fgColor="#ee9342"
            level="H"
          />
        </div>

        <div className="qr-actions-main">
          <button className="download-btn" onClick={handleDownloadQR}>
            <Download size={20} />
            Pobierz kod QR
          </button>
          <button className="share-btn" onClick={handleShare}>
            <Share2 size={20} />
            Udostępnij
          </button>
        </div>
        
        {showShareMessage && (
          <div className="share-message">Funkcja udostępniania dostępna na urządzeniach mobilnych</div>
        )}
      </div>

      <div className="instructions">
        <h3>Jak to działa?</h3>
        <ol>
          <li>Pokaż swój kod QR kasjerowi lub pracownikowi</li>
          <li>Po zeskanowaniu otrzymasz punkty za transakcję</li>
          <li>Wspieraj swoje osiedle zdobywając punkty!</li>
        </ol>
        <p className="instructions-note">
          💡 Możesz zapisać kod QR jako zdjęcie lub pokazywać go bezpośrednio z aplikacji.
        </p>
      </div>
    </div>
  );
}
