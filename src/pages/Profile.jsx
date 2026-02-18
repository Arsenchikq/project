import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user, tests, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    fullname: user.fullname || '',
    bio: user.bio || '',
    avatar: user.avatar || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const myTests = tests.filter(t => t.authorEmail === user.email);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <h2>Личный кабинет</h2>

      <div className="profile-header">
        <img src={user.avatar} alt="Avatar" className="avatar-large" />
        <div style={{flex: 1}}>
          {isEditing ? (
            <div style={{display:'grid', gap:'10px', maxWidth: '400px'}}>
              <input value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} placeholder="Имя и Фамилия" />
              <input value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="О себе" />
              <input value={formData.avatar} onChange={e => setFormData({...formData, avatar: e.target.value})} placeholder="URL аватарки" />
              <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={handleSave} className="btn btn-primary">Сохранить</button>
                <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Отмена</button>
              </div>
            </div>
          ) : (
            <>
              <h3 style={{fontSize: '1.5rem', margin: '0 0 5px 0'}}>{user.fullname || user.username}</h3>
              <p style={{color: '#666', margin: '0 0 15px 0'}}>{user.bio || "Описание не задано"}</p>
              <button onClick={() => setIsEditing(true)} className="btn btn-secondary" style={{fontSize: '0.9rem'}}>✏️ Редактировать</button>
              <div style={{display:'flex', gap:'20px', marginTop:'15px'}}>
                 <div><strong>{user.results?.length || 0}</strong> пройдено</div>
                 <div><strong>{myTests.length}</strong> создано</div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div>
          <h3 className="section-title">Мои тесты</h3>
          {myTests.length > 0 ? (
            <div style={{display: 'grid', gap: '1rem'}}>
              {myTests.map(test => (
                 <div key={test.id} className="test-card" style={{padding: '1rem'}}>
                    <div style={{fontWeight: 'bold'}}>{test.title}</div>
                    <Link to={`/room/${test.id}`} style={{fontSize: '0.9rem', color: 'var(--primary)'}}>Открыть</Link>
                 </div>
              ))}
            </div>
          ) : (
            <div>
              <p>Нет созданных тестов.</p>
              <Link to="/create" className="btn btn-primary">Создать тест</Link>
            </div>
          )}
        </div>

        <div>
          <h3 className="section-title">История</h3>
          {user.results && user.results.length > 0 ? (
            <table className="results-table">
              <thead><tr><th>Тест</th><th>Счет</th><th>Дата</th></tr></thead>
              <tbody>
                {user.results.slice(0, 5).map((res, idx) => (
                  <tr key={idx}>
                    <td>{res.title}</td>
                    <td>{res.score} / {res.total}</td>
                    <td>{res.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>История пуста.</p>
          )}
        </div>
      </div>
    </div>
  );
};