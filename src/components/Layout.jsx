import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">ProTester</div>
        <nav>
          <Link to="/">Главная</Link>
          {user ? (
            <>
              <Link to="/tests">Тесты</Link>
              <Link to="/profile">Профиль ({user.username})</Link>
              <button onClick={logout} className="btn-logout">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">Вход</Link>
              <Link to="/register">Регистрация</Link>
            </>
          )}
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2026 Online Testing System. Individual Project.</p>
      </footer>
    </div>
  );
};