import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="hero">
      <h1>СИСТЕМА ОЦЕНКИ ЗНАНИЙ</h1>
      <p>
        Профессиональная платформа для тестирования. 
        Прокачивай навыки, создавай свои задания и следи за прогрессом 
        в реальном времени.
      </p>
      
      <div className="hero-buttons">
        {user ? (
          /* Если пользователь ВОШЕЛ в аккаунт */
          <>
            <Link to="/tests" className="btn btn-primary">
              КАТАЛОГ ТЕСТОВ
            </Link>
            <Link to="/profile" className="btn btn-secondary">
              МОЙ ПРОФИЛЬ
            </Link>
          </>
        ) : (
          /* Если пользователь ГОСТЬ */
          <>
            <Link to="/login" className="btn btn-secondary">
              ВОЙТИ
            </Link>
            <Link to="/register" className="btn btn-primary">
              СОЗДАТЬ АККАУНТ
            </Link>
          </>
        )}
      </div>

      {/* Декоративные иконки (для красоты) */}
      <div style={{
        marginTop: '60px', 
        display: 'flex', 
        gap: '40px', 
        justifyContent: 'center', 
        opacity: 0.4,
        filter: 'grayscale(100%)'
      }}>
         <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🚀</div>
            <small style={{fontWeight: '700', letterSpacing: '1px'}}>SPEED</small>
         </div>
         <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🛡️</div>
            <small style={{fontWeight: '700', letterSpacing: '1px'}}>SECURE</small>
         </div>
         <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>💡</div>
            <small style={{fontWeight: '700', letterSpacing: '1px'}}>SMART</small>
         </div>
      </div>
    </div>
  );
};