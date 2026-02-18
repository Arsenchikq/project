import { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showMenu, setShowMenu] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const menuRef = useRef(null);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowExitModal(false);
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">
          <span style={{color: '#2563eb', fontSize: '1.5rem'}}>●</span> 
          SmartTest
        </div>
        
        <nav>
          <Link to="/" className={isActive('/')}>Главная</Link>
          
          {user ? (
            <>
              <Link to="/tests" className={isActive('/tests')}>Каталог</Link>
              
              <div className="menu-container" ref={menuRef}>
                <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
                  <span>{user.username}</span>
                  <div style={{width:'32px', height:'32px', borderRadius:'50%', overflow:'hidden', border: '1px solid #ccc'}}>
                     <img src={user.avatar} alt="ava" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                  </div>
                  <span>☰</span>
                </button>

                {showMenu && (
                  <div className="dropdown">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowMenu(false)}>
                      👤 Аккаунт
                    </Link>
                    <Link to="/security" className="dropdown-item" onClick={() => setShowMenu(false)}>
                      🔒 Безопасность
                    </Link>
                    <div className="dropdown-item danger" onClick={() => { setShowMenu(false); setShowExitModal(true); }}>
                      🚪 Выход
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive('/login')}>Вход</Link>
              <Link to="/register" className={isActive('/register')}>Регистрация</Link>
            </>
          )}
        </nav>
      </header>
      
      {showExitModal && (
        <div className="modal-overlay">
          <div className="modal-window">
            <h3>Вы уверены, что хотите выйти?</h3>
            <p style={{color: '#666'}}>Для входа потребуется снова ввести пароль.</p>
            <div className="modal-actions">
              <button onClick={handleLogout} className="btn btn-logout">Да, выйти</button>
              <button onClick={() => setShowExitModal(false)} className="btn btn-secondary">Отмена</button>
            </div>
          </div>
        </div>
      )}

      <main className="content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>© 2026 SmartTest Education Platform.</p>
      </footer>
    </div>
  );
};