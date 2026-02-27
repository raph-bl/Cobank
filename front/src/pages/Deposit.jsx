import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const BASE_W = 740;
const BASE_H = 420;

export default function Deposit() {
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
        <Header balance={balance} username={username} fmt={fmt} url="deposit" />

        <div style={{
          flex: 1,
          background: '#d0d0d0',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#e8e8e8', border: '1px solid #aaa',
            width: 280, padding: '18px 24px 20px',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 'bold', color: '#7B1111',
              borderBottom: '2px solid #B01010', paddingBottom: 6,
              marginBottom: 14, letterSpacing: '0.05em',
            }}>
              DEPOSIT FUNDS
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#555', marginBottom: 3, letterSpacing: '0.05em' }}>
                AMOUNT ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                style={{
                  width: '100%', padding: '5px 8px',
                  border: '1px solid #bbb', background: '#fff',
                  fontSize: 12, color: '#222', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              style={{
                width: '100%', padding: '8px 0',
                background: '#B01010', color: '#fff',
                border: 'none', fontSize: 13, cursor: 'pointer',
                letterSpacing: '0.05em', marginBottom: 8,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#8B0000'}
              onMouseLeave={e => e.currentTarget.style.background = '#B01010'}
            >
              CONFIRM DEPOSIT
            </button>

            <div style={{ textAlign: 'center', fontSize: 11, color: '#555' }}>
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
