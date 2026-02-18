import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Security = () => {
  const { user, updateSecurity } = useAuth();
  const [passwords, setPasswords] = useState({ newPass: '', confirmPass: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (passwords.newPass.length < 4) return setMessage({ type: 'error', text: 'Пароль слишком короткий' });
    if (passwords.newPass !== passwords.confirmPass) return setMessage({ type: 'error', text: 'Пароли не совпадают' });

    updateSecurity(passwords.newPass);
    setMessage({ type: 'success', text: 'Пароль успешно обновлен!' });
    setPasswords({ newPass: '', confirmPass: '' });
  };

  return (
    <div style={{paddingTop: '2rem'}}>
      <div className="security-card">
        <h2 style={{borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>Безопасность</h2>
        
        <div style={{marginBottom: '2rem'}}>
          <label style={{display: 'block', fontWeight: 'bold'}}>Ваш Email</label>
          <input disabled value={user.email} style={{background: '#f3f4f6', cursor: 'not-allowed'}} />
        </div>

        <form onSubmit={handleUpdate}>
          <h3>Смена пароля</h3>
          {message.text && (
            <div style={{
                color: message.type === 'success' ? 'green' : 'red', 
                background: message.type === 'success' ? '#dcfce7' : '#fee2e2', 
                padding: '10px', borderRadius: '6px', marginBottom: '1rem'
            }}>
              {message.text}
            </div>
          )}
          <input type="password" placeholder="Новый пароль" value={passwords.newPass} onChange={e => setPasswords({...passwords, newPass: e.target.value})} />
          <input type="password" placeholder="Повторите пароль" value={passwords.confirmPass} onChange={e => setPasswords({...passwords, confirmPass: e.target.value})} />
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Обновить</button>
        </form>
      </div>
    </div>
  );
};