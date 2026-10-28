import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import TransactionLog from './pages/TransactionLog';
import Logout from './pages/Logout';
import Settings from './pages/Settings';
import Transfer from './pages/Transfer';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={localStorage.getItem('isLoggedIn') ? '/dashboard' : '/register'} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/transaction-log" element={<TransactionLog />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}
