import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(!form.username || !form.email || !form.password) throw new Error("Заполните все поля");
      register(form);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Имя" 
          onChange={e => setForm({...form, username: e.target.value})} 
        />
        <input 
          type="email" placeholder="Email" 
          onChange={e => setForm({...form, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Пароль" 
          onChange={e => setForm({...form, password: e.target.value})} 
        />
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
    </div>
  );
};