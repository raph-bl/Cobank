import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const BASE_W = 740;
const BASE_H = 420;

const menuItems = [
  { label: 'Deposit', path: '/deposit' },
  { label: 'Withdraw', path: '/withdraw' },
  { label: 'Transaction Log', path: '/transaction-log' },
];

export default function Dashboard() {
  const [balance] = useState(100.00);
  const username = "Username";
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
        <Header balance={balance} username={username} fmt={fmt} url="mainmenu" />

        <div style={{
          flex: 1,
          background: '#d0d0d0',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '36px 0 48px' }}>
            {menuItems.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                style={{
                  width: 200, padding: '12px 0',
                  background: '#B01010', color: '#fff',
                  border: 'none', fontSize: 15, cursor: 'pointer',
                  letterSpacing: '0.02em', transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#8B0000'}
                onMouseLeave={e => e.currentTarget.style.background = '#B01010'}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
