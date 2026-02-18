import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="hero">
      <h1>Добро пожаловать в систему тестирования</h1>
      <p>Проверь свои знания в программировании прямо сейчас.</p>
      <div className="hero-buttons">
        <Link to="/tests" className="btn btn-primary">Начать тестирование</Link>
        <Link to="/register" className="btn btn-secondary">Создать аккаунт</Link>
      </div>
    </div>
  );
};