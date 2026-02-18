export const testsData = [
  {
    id: 1,
    title: "Основы React",
    difficulty: "Легкий",
    description: "Проверь свои знания компонентов, пропсов и хуков.",
    questions: [
      {
        id: 'q1',
        text: "Что возвращает useState?",
        options: ["Объект", "Массив из двух элементов", "Число", "Promise"],
        correct: 1 
      },
      {
        id: 'q2',
        text: "Какой хук используется для побочных эффектов?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 0
      },
      {
        id: 'q3',
        text: "Как передать данные от родителя к ребенку?",
        options: ["State", "Context", "Props", "LocalStorage"],
        correct: 2
      }
    ]
  },
  {
    id: 2,
    title: "JavaScript Advanced",
    difficulty: "Сложный",
    description: "Вопросы про замыкания, асинхронность и прототипы.",
    questions: [
      {
        id: 'q1',
        text: "Чему равно '2' + 2 в JS?",
        options: ["4", "22", "NaN", "Error"],
        correct: 1
      },
      {
        id: 'q2',
        text: "Какой метод создает новый массив?",
        options: ["forEach", "map", "pop", "push"],
        correct: 1
      },
      {
        id: 'q3',
        text: "Что такое Promise?",
        options: ["Функция", "Объект", "Массив", "Строка"],
        correct: 1
      }
    ]
  }
];