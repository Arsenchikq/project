import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Используем контекст

export const TestsList = () => {
  const [filter, setFilter] = useState('All');
  const { tests } = useAuth(); // Берем тесты из памяти

  const filteredTests = filter === 'All' 
    ? tests 
    : tests.filter(t => t.difficulty === filter);

  return (
    <div className="tests-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>Банк заданий</h2>
        <Link to="/create" className="btn btn-primary" style={{fontSize: '0.9rem'}}>+ Создать свой тест</Link>
      </div>
      
      <div className="filter-block" style={{marginTop: '1rem'}}>
        <label style={{marginRight: '10px'}}>Фильтр сложности: </label>
        <select 
            onChange={(e) => setFilter(e.target.value)}
            style={{padding: '5px', borderRadius: '5px', background: '#333', color: 'white', border: '1px solid #555'}}
        >
          <option value="All">Все уровни</option>
          <option value="Легкий">Легкий</option>
          <option value="Сложный">Сложный</option>
          <option value="Хардкор">Хардкор</option>
        </select>
      </div>

      <div className="tests-grid">
        {filteredTests.map(test => (
          <div key={test.id} className="test-card">
            <h3>{test.title}</h3>
            <span className={`badge ${test.difficulty}`}>{test.difficulty}</span>
            <p>{test.description}</p>
            <p style={{fontSize: '0.8rem', color: '#666'}}>{test.questions.length} вопросов</p>
            <Link to={`/room/${test.id}`} className="btn btn-outline" style={{marginTop: '10px'}}>Начать</Link>
          </div>
        ))}
      </div>
    </div>
  );
};