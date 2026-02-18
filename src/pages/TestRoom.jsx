import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const TestRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveTestResult, tests } = useAuth(); // Берем тесты из контекста
  
  // Ищем тест в массиве из LocalStorage
  const test = tests.find(t => t.id === Number(id));
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!test) return <div style={{textAlign:'center', marginTop:'50px'}}>Тест не найден или удален</div>;

  const handleAnswer = (optionIndex) => {
    if (optionIndex === test.questions[currentQ].correct) {
      setScore(prev => prev + 1);
    }

    const nextQ = currentQ + 1;
    if (nextQ < test.questions.length) {
      setCurrentQ(nextQ);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    saveTestResult(test.title, score, test.questions.length);
    navigate('/profile');
  };

  if (isFinished) {
    return (
      <div className="result-card" style={{textAlign:'center', marginTop:'3rem'}}>
        <h2 style={{fontSize: '3rem', color: '#fff'}}>Mission Complete</h2>
        <p style={{fontSize: '1.5rem'}}>Результат: <span style={{color: '#ff4b1f'}}>{score}</span> из {test.questions.length}</p>
        <button onClick={handleFinish} className="btn btn-primary">Сохранить прогресс</button>
      </div>
    );
  }

  return (
    <div className="test-room">
      <div className="progress-bar">
        Вопрос {currentQ + 1} из {test.questions.length} :: {test.title}
      </div>
      <h2>{test.questions[currentQ].text}</h2>
      <div className="options-grid">
        {test.questions[currentQ].options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswer(index)}
            className="option-btn"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};