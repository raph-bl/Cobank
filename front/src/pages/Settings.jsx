import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const BASE_W = 740;
const BASE_H = 420;

// Pour ajouter une entrée : une ligne ici.
// `path` pour naviguer, ou `action: (navigate) => ...` pour un comportement libre.
const settingsItems = [
  { label: 'ACCOUNT' },
  { label: 'DOCUMENTS' },
  { label: 'LOG OUT', path: '/logout' },
  { label: 'DELETE ACCOUNT'}
];

const itemStyle = {
  width: '50%', padding: '8px 0',
  background: '#B01010', color: '#fff',
  border: 'none', fontSize: 13, cursor: 'pointer',
  letterSpacing: '0.05em',
};

export default function Settings() {
  const [balance] = useState(100.00);
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / BASE_W;
      const scaleY = window.innerHeight / BASE_H;
      setScale(Math.min(scaleX, scaleY));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#888'
    }}>
      <div style={{
        width: BASE_W, height: BASE_H,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        flexShrink: 0,
      }}>
        <Header balance={balance} fmt={fmt} url="settings" />

        <div style={{
          flex: 1,
          background: '#d0d0d0',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px)',
          padding: '16px 24px', overflowY: 'auto',
        }}>
          <div style={{
            background: '#e8e8e8', border: '1px solid #aaa',
            padding: '12px 16px',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 'bold', color: '#7B1111',
              borderBottom: '2px solid #B01010', paddingBottom: 6,
              marginBottom: 12, letterSpacing: '0.05em',
            }}>
              SETTINGS
            </div>
            
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 10, padding: '4px 0 8px',
            }}>
              {settingsItems.map(({ label, path, action }) => (
                <button
                  key={label}
                  onClick={() => (action ? action(navigate) : navigate(path))}
                  style={itemStyle}
                  onMouseEnter={e => e.currentTarget.style.background = '#8B0000'}
                  onMouseLeave={e => e.currentTarget.style.background = '#B01010'}
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={{ textAlign: 'center', fontSize: 11, color: '#555', marginTop: 8 }}>
              <span
                style={{ color: '#B01010', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('/dashboard')}
              >
                Back to menu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
