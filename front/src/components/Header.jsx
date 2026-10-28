import { useNavigate } from 'react-router-dom';

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="grid grid-cols-4 gap-0.5 w-10 h-10">
      {[
        1,1,1,1,
        1,0,0,1,
        1,0,0,1,
        1,1,1,1,
      ].map((on, i) => (
        <div
          key={i}
          className="w-full h-full"
          style={{ backgroundColor: on ? '#8B1A1A' : 'transparent' }}
        />
      ))}
    </div>
    <div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '0.08em', lineHeight: 1 }}>
        COBANK
      </div>
      <div style={{ fontSize: '0.6rem', color: '#555', letterSpacing: '0.25em', marginTop: '1px' }}>
        OF LOS SANTOS
      </div>
    </div>
  </div>
);

export default function Header({ balance, username, fmt, url }) {
  const navigate = useNavigate();

  // Les pages authentifiées n'ont rien à passer : on lit la session.
  // Login/Register passent explicitement "" pour garder le bandeau vide.
  const display = username ?? [
    localStorage.getItem('firstName'),
    localStorage.getItem('lastName'),
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Chrome navigateur */}
      <div style={{ background: '#9e9e9e', padding: '4px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {['◀', '▶', '⌂', '↻'].map((icon, i) => (
            <button key={i} onClick={i === 2 ? () => navigate('/') : undefined} style={{
              width: 22, height: 22, background: '#7a7a7a', border: '1px solid #666',
              color: '#eee', fontSize: 11, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>{icon}</button>
          ))}
        </div>
        <div style={{
          flex: 1, background: '#fff', border: '1px solid #555', padding: '2px 8px',
          fontSize: 13, color: '#333', margin: '0 4px', display: 'flex', alignItems: 'center', gap: 4
        }}>
          <span style={{ color: '#aaa', fontSize: 11 }}>🌐</span>
          www.cobank.com/{url}
          <span style={{ marginLeft: 'auto', color: '#http://localhost:3000/mainmenuaaa', fontSize: 11, cursor: 'pointer' }}>✕</span>
        </div>
        <div style={{ color: '#c8b400', fontWeight: 'bold', fontSize: 13, marginLeft: 4 }}>
          ${fmt(balance).replace(/,/g, '')}
        </div>
      </div>

      {/* Header Cobank */}
      <div style={{
        background: '#f0f0f0', borderBottom: '2px solid #ccc',
        padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Logo />
        <div style={{ color: '#333', fontSize: 13 }}>
          Account balance&nbsp;&nbsp;<strong>${fmt(balance)}</strong>
        </div>
      </div>

      <div style={{ background: '#7B1111', color: '#fff', padding: '7px 16px', fontSize: 14, fontWeight: '500' }}>
        {display}
      </div>

      <div style={{ background: '#B01010', color: '#fff', textAlign: 'center', padding: '8px', fontSize: 14 }}>
        Choose a service.
      </div>
    </>
  );
}
