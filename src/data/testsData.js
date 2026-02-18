export const initialTests = [
  {
    id: 1708202601,
    title: "Основы React",
    difficulty: "Легкий",
    description: "База для новичков: компоненты, пропсы, хуки.",
    questions: [
      { id: 'q1', text: "Что возвращает useState?", options: ["Объект", "Массив [state, setState]", "Число", "Promise"], correct: 1 },
      { id: 'q2', text: "Куда монтируется React приложение?", options: ["В <head>", "В <body>", "В div с id='root'", "В footer"], correct: 2 },
      { id: 'q3', text: "Как передать данные ребенку?", options: ["State", "Context", "Props", "Redux"], correct: 2 },
      { id: 'q4', text: "Зачем нужен key в списках?", options: ["Для красоты", "Для оптимизации рендеринга", "Это ошибка", "Для сортировки"], correct: 1 },
      { id: 'q5', text: "Что такое JSX?", options: ["HTML в JS", "Java Syntax Extension", "JSON X", "Библиотека CSS"], correct: 0 }
    ]
  },
  {
    id: 1708202602,
    title: "Python Junior",
    difficulty: "Легкий",
    description: "Проверка знаний синтаксиса Python.",
    questions: [
      { id: 'p1', text: "Как вывести текст в консоль?", options: ["console.log()", "echo", "print()", "write()"], correct: 2 },
      { id: 'p2', text: "Какой тип данных неизменяемый?", options: ["List", "Dictionary", "Set", "Tuple"], correct: 3 },
      { id: 'p3', text: "Как создать функцию?", options: ["func name()", "def name():", "function name {}", "create name"], correct: 1 },
      { id: 'p4', text: "Результат 2 ** 3?", options: ["6", "5", "8", "9"], correct: 2 },
      { id: 'p5', text: "Что делает len()?", options: ["Удаляет", "Считает длину", "Округляет", "Меняет тип"], correct: 1 }
    ]
  },
  {
    id: 1708202603,
    title: "SQL & Databases",
    difficulty: "Сложный",
    description: "Запросы, джойны и ключи.",
    questions: [
      { id: 's1', text: "Команда для получения данных?", options: ["GET", "FETCH", "SELECT", "PULL"], correct: 2 },
      { id: 's2', text: "Удалить таблицу полностью?", options: ["DELETE", "DROP", "REMOVE", "CLEAR"], correct: 1 },
      { id: 's3', text: "Что такое Primary Key?", options: ["Уникальный ID", "Внешний ключ", "Пароль", "Главный запрос"], correct: 0 },
      { id: 's4', text: "Какой JOIN вернет все строки слева?", options: ["INNER", "RIGHT", "LEFT", "CROSS"], correct: 2 },
      { id: 's5', text: "Агрегатная функция для суммы?", options: ["COUNT", "AVG", "SUM", "TOTAL"], correct: 2 }
    ]
  },
  {
    id: 1708202604,
    title: "JavaScript Pro",
    difficulty: "Сложный",
    description: "Асинхронность, замыкания, Event Loop.",
    questions: [
      { id: 'j1', text: "Что выведет typeof null?", options: ["null", "undefined", "object", "number"], correct: 2 },
      { id: 'j2', text: "Какой метод добавляет в конец массива?", options: ["pop", "push", "shift", "unshift"], correct: 1 },
      { id: 'j3', text: "Что такое Promise?", options: ["Функция", "Объект ожидания операции", "Массив", "Строка"], correct: 1 },
      { id: 'j4', text: "Чему равно '2' + 2?", options: ["4", "22", "NaN", "Error"], correct: 1 },
      { id: 'j5', text: "Как остановить всплытие события?", options: ["stopPropagation()", "preventDefault()", "stop()", "break"], correct: 0 }
    ]
  }
];