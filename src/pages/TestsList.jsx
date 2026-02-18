import { useState } from 'react';
import { Link } from 'react-router-dom';
import { testsData } from '../data/testsData';

export const TestsList = () => {
  const [filter, setFilter] = useState('All');

  const filteredTests = filter === 'All' 
    ? testsData 
    : testsData.filter(t => t.difficulty === filter);

  return (
    <div className="tests-page">
      <h2>Доступные тесты</h2>
      
      <div className="filter-block">
        <label>Сложность: </label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">Все</option>
          <option value="Легкий">Легкий</option>
          <option value="Сложный">Сложный</option>
        </select>
      </div>

      <div className="tests-grid">
        {filteredTests.map(test => (
          <div key={test.id} className="test-card">
            <h3>{test.title}</h3>
            <span className={`badge ${test.difficulty}`}>{test.difficulty}</span>
            <p>{test.description}</p>
            <Link to={`/room/${test.id}`} className="btn btn-outline">Начать</Link>
          </div>
        ))}
      </div>
    </div>
  );
};