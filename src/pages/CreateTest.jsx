import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const CreateTest = () => {
  const { addNewTest } = useAuth();
  const navigate = useNavigate();

  // Состояние заголовка теста
  const [meta, setMeta] = useState({ title: '', description: '', difficulty: 'Легкий' });
  
  // Состояние для списка вопросов
  const [questions, setQuestions] = useState([
    { id: Date.now(), text: '', options: ['', '', '', ''], correct: 0 }
  ]);

  // Добавить новый пустой вопрос
  const addQuestionBlock = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', options: ['', '', '', ''], correct: 0 }
    ]);
  };

  // Удалить вопрос
  const removeQuestionBlock = (index) => {
    if(questions.length === 1) return; // Нельзя удалить последний
    const newQ = [...questions];
    newQ.splice(index, 1);
    setQuestions(newQ);
  };

  // Изменение текста вопроса
  const handleQuestionText = (index, value) => {
    const newQ = [...questions];
    newQ[index].text = value;
    setQuestions(newQ);
  };

  // Изменение вариантов ответа
  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQ = [...questions];
    newQ[qIndex].options[oIndex] = value;
    setQuestions(newQ);
  };

  // Выбор правильного ответа
  const handleCorrectChange = (qIndex, value) => {
    const newQ = [...questions];
    newQ[qIndex].correct = Number(value);
    setQuestions(newQ);
  };

  const handleSave = () => {
    if (!meta.title || !meta.description) return alert("Заполните название и описание!");
    
    // Валидация
    for (let q of questions) {
      if (!q.text) return alert("Заполните текст всех вопросов!");
      if (q.options.some(opt => !opt)) return alert("Заполните все варианты ответов!");
    }

    const newTest = {
      id: Date.now(),
      title: meta.title,
      description: meta.description,
      difficulty: meta.difficulty,
      questions: questions
    };

    addNewTest(newTest);
    navigate('/tests');
  };

  return (
    <div className="create-page" style={{maxWidth: '800px', margin: '0 auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '2rem'}}>
        <h2>Конструктор теста</h2>
        <button onClick={handleSave} className="btn btn-primary">Сохранить тест</button>
      </div>
      
      {/* Блок мета-данных */}
      <div className="auth-form" style={{maxWidth: '100%', margin: '0 0 2rem 0', boxShadow: 'var(--shadow-sm)'}}>
        <div style={{display:'grid', gap:'1rem'}}>
            <label style={{fontWeight:'600'}}>Настройки теста</label>
            <input 
              placeholder="Название теста (например: React Basics)" 
              value={meta.title}
              onChange={e => setMeta({...meta, title: e.target.value})}
            />
            <input 
              placeholder="Краткое описание" 
              value={meta.description}
              onChange={e => setMeta({...meta, description: e.target.value})}
            />
            <select 
              value={meta.difficulty}
              onChange={e => setMeta({...meta, difficulty: e.target.value})}
            >
              <option value="Легкий">Легкий уровень</option>
              <option value="Сложный">Сложный уровень</option>
              <option value="Хардкор">Хардкор</option>
            </select>
        </div>
      </div>

      {/* Список вопросов */}
      {questions.map((q, qIndex) => (
        <div key={q.id} className="test-card" style={{marginBottom: '1.5rem'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
            <h3 style={{fontSize:'1.1rem', margin:0}}>Вопрос №{qIndex + 1}</h3>
            {questions.length > 1 && (
              <button onClick={() => removeQuestionBlock(qIndex)} className="btn-logout" style={{padding:'4px 8px', fontSize:'0.8rem'}}>Удалить</button>
            )}
          </div>
          
          <input 
            placeholder="Введите текст вопроса..." 
            value={q.text}
            onChange={(e) => handleQuestionText(qIndex, e.target.value)}
            style={{marginBottom: '1rem', fontWeight: '500'}}
          />

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <input 
                  type="radio" 
                  name={`correct-${q.id}`} 
                  checked={q.correct === oIndex}
                  onChange={() => handleCorrectChange(qIndex, oIndex)}
                  style={{width: '20px', height: '20px', margin:0}}
                />
                <input 
                  placeholder={`Ответ ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  style={{margin:0}}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{textAlign: 'center', marginTop: '2rem'}}>
        <button onClick={addQuestionBlock} className="btn btn-secondary" style={{width: '100%', padding: '15px'}}>+ Добавить еще вопрос</button>
      </div>
    </div>
  );
};