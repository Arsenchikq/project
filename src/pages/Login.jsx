import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(form.email, form.password);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Вход в систему</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" placeholder="Email" 
          onChange={e => setForm({...form, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Пароль" 
          onChange={e => setForm({...form, password: e.target.value})} 
        />
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    </div>
  );
};