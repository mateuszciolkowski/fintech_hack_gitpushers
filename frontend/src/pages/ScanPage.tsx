import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { ArrowLeft, Camera, X, Zap } from 'lucide-react';
import './ScanPage.css';

export function ScanPage() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    try {
      setError(null);
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScanResult(decodedText);
          stopScanner();
          // Navigate to the scanned challenge
          if (decodedText.includes('/challenge/')) {
            navigate(decodedText.replace(window.location.origin, ''));
          }
        },
        () => {} // Ignore QR not found errors
      );
      setIsScanning(true);
    } catch (err) {
      console.error('Scanner error:', err);
      setError('Nie można uruchomić kamery. Sprawdź uprawnienia.');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="scan-page">
      <header className="scan-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Skanuj kod QR</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="scan-container">
        {!isScanning && !scanResult && (
          <div className="scan-placeholder">
            <div className="scan-icon-wrapper">
              <Camera size={64} />
              <div className="scan-pulse"></div>
            </div>
            <h2>Gotowy do skanowania</h2>
            <p>Skieruj kamerę na kod QR, aby zdobyć punkty i rywalizować z innymi osiedlami!</p>
            <button className="start-scan-btn" onClick={startScanner}>
              <Zap size={20} />
              Rozpocznij skanowanie
            </button>
          </div>
        )}

        {isScanning && (
          <div className="scanner-wrapper">
            <div id="qr-reader" className="qr-reader"></div>
            <div className="scanner-overlay">
              <div className="scanner-frame">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
                <div className="scan-line"></div>
              </div>
            </div>
            <button className="stop-scan-btn" onClick={stopScanner}>
              <X size={20} />
              Anuluj
            </button>
          </div>
        )}

        {scanResult && (
          <div className="scan-result">
            <div className="result-icon success">
              <Zap size={32} />
            </div>
            <h2>Kod zeskanowany!</h2>
            <p className="result-text">{scanResult}</p>
            <div className="result-actions">
              <button className="scan-again-btn" onClick={() => {
                setScanResult(null);
                startScanner();
              }}>
                Skanuj ponownie
              </button>
              <button className="go-home-btn" onClick={() => navigate('/')}>
                Wróć do strony głównej
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="scan-error">
            <p>{error}</p>
            <button onClick={startScanner}>Spróbuj ponownie</button>
          </div>
        )}
      </div>

      <div className="scan-tips">
        <h3>Wskazówki</h3>
        <ul>
          <li>Upewnij się, że kod QR jest dobrze oświetlony</li>
          <li>Trzymaj telefon stabilnie</li>
          <li>Kod QR powinien być w całości widoczny w ramce</li>
        </ul>
      </div>
    </div>
  );
}
