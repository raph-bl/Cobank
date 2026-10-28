import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const BASE_W = 740;
const BASE_H = 420;

export default function Login() {
  const [scale, setScale] = useState(1);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
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

  const fmt = (n) => typeof n === 'number'
    ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || `Error ${res.status}`);
        return;
      }

      const data = await res.json();

      if (data.status === 'error') {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('firstName', data.firstName ?? '');
      localStorage.setItem('lastName', data.lastName ?? '');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Could not reach the server.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '5px 8px',
    border: '1px solid #bbb',
    background: '#fff',
    fontSize: 12,
    color: '#222',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    color: '#555',
    marginBottom: 3,
    letterSpacing: '0.05em',
  };

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

        <Header balance={0} username="" fmt={fmt} url="login" />

        <div style={{
          flex: 1,
          background: '#d0d0d0',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>

          <div style={{
            background: '#e8e8e8',
            border: '1px solid #aaa',
            width: 280,
            padding: '18px 24px 20px',
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: '#7B1111',
              borderBottom: '2px solid #B01010',
              paddingBottom: 6,
              marginBottom: 14,
              letterSpacing: '0.05em',
            }}>
              ACCOUNT LOGIN
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>EMAIL</label>
                <input
                  style={inputStyle}
                  type="text"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>PASSWORD</label>
                <input
                  style={inputStyle}
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {error && (
                <div style={{ fontSize: 11, color: '#B01010', marginBottom: 8, textAlign: 'center' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: '100%', padding: '8px 0',
                  background: '#B01010', color: '#fff',
                  border: 'none', fontSize: 13, cursor: 'pointer',
                  letterSpacing: '0.05em', marginBottom: 8,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#8B0000'}
                onMouseLeave={e => e.currentTarget.style.background = '#B01010'}
              >
                LOGIN
              </button>

              <div style={{ textAlign: 'center', fontSize: 11, color: '#555' }}>
                No account?{' '}
                <span
                  style={{ color: '#B01010', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate('/register')}
                >
                  Create one
                </span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
