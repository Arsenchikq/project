import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testsData } from '../data/testsData';
import { useAuth } from '../context/AuthContext';

export const TestRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveTestResult } = useAuth();
  
  const test = testsData.find(t => t.id === Number(id));
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!test) return <div>Тест не найден</div>;

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
      <div className="result-card">
        <h2>Тест завершен!</h2>
        <p>Ваш результат: {score} из {test.questions.length}</p>
        <button onClick={handleFinish} className="btn btn-primary">Сохранить и выйти</button>
      </div>
    );
  }

  return (
    <div className="test-room">
      <div className="progress-bar">
        Вопрос {currentQ + 1} из {test.questions.length}
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