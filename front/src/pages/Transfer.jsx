import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const BASE_W = 740;
const BASE_H = 420;

export default function Transfer() {
  const [balance, setBalance] = useState(100.00);
  const [scale, setScale] = useState(1);
  const [form, setForm] = useState({ 
    ibanDest: '', 
    amount: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sending, setSending] = useState(false);
  // Généré une fois par formulaire : rejouer la requête ne doit pas créer un 2e virement.
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());
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
    setSuccess('');

    const sourceIban = localStorage.getItem('iban');

    if (!sourceIban) {
      setError('No account linked to this session. Please log in again.');
      return;
    }

    if (form.ibanDest.trim() === '') {
      setError('IBAN cannot be empty.');
      return;
    }

    const amount = Number(form.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }

    setSending(true);

    try {
      const res = await fetch('http://localhost:8080/transaction/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceIban,
          destIban: form.ibanDest.trim(),
          amount,
          idempotencyKey,
        }),
      });

      const data = await res.json().catch(() => ({}));

      // Le backend répond 200 même sur rejet : c'est `status` qui tranche.
      if (!res.ok || data.status !== 'success') {
        setError(data.message ?? 'Transfer rejected.');
        return;
      }

      setSuccess(data.message);

      if (typeof data.balance === 'number') {
        setBalance(data.balance);
      }

      setForm({ ibanDest: '', amount: '' });
      setIdempotencyKey(crypto.randomUUID());
    } catch (err) {
      console.error('Transfer failed:', err);
      setError('Transfer failed. Please try again later.');
    } finally {
      setSending(false);
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

        <Header balance={balance} fmt={fmt} url="mainmenu" />

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
              TRANSFER FUNDS
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>IBAN</label>
                <input
                  style={inputStyle}
                  type="text"
                  value={form.ibanDest}
                  onChange={e => setForm({ ...form, ibanDest: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>AMOUNT</label>
                <input
                  style={inputStyle}
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00 €"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                />
              </div>

              {error && (
                <div style={{ fontSize: 11, color: '#B01010', marginBottom: 8, textAlign: 'center' }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{ fontSize: 11, color: '#1A6B1A', marginBottom: 8, textAlign: 'center' }}>
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  width: '100%', padding: '8px 0',
                  background: sending ? '#999' : '#B01010', color: '#fff',
                  border: 'none', fontSize: 13,
                  cursor: sending ? 'default' : 'pointer',
                  letterSpacing: '0.05em', marginBottom: 8,
                }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#8B0000'; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = '#B01010'; }}
              >
                {sending ? 'SENDING...' : 'SEND'}
              </button>

              <div style={{ textAlign: 'center', fontSize: 11, color: '#555', marginTop: 8 }}>
                <span
                  style={{ color: '#B01010', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => navigate('/dashboard')}
                >
                  Back to menu
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
