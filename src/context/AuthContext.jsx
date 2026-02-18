import { createContext, useState, useEffect, useContext } from 'react';
import { initialTests } from '../data/testsData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Загрузка юзера
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) setUser(savedUser);

    // Загрузка тестов
    const savedTests = JSON.parse(localStorage.getItem('siteTests'));
    if (savedTests && savedTests.length > 0) {
      setTests(savedTests);
    } else {
      setTests(initialTests);
      localStorage.setItem('siteTests', JSON.stringify(initialTests));
    }
  }, []);

  // Внутренняя функция обновления данных
  const _updateUserData = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUsersList = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(newUsersList));
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === userData.email)) throw new Error("Email занят");
    
    const newUser = { 
      ...userData, 
      avatar: `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${userData.username}`,
      bio: 'Новый пользователь',
      fullname: userData.username,
      results: [] 
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    login(userData.email, userData.password);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error("Неверные данные");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (data) => {
    const updatedUser = { ...user, ...data };
    _updateUserData(updatedUser);
  };

  const updateSecurity = (newPassword) => {
    const updatedUser = { ...user, password: newPassword };
    _updateUserData(updatedUser);
  };

  const saveTestResult = (testTitle, score, total) => {
    const newResult = { date: new Date().toLocaleDateString(), title: testTitle, score, total };
    const updatedUser = { ...user, results: [newResult, ...(user.results || [])] };
    _updateUserData(updatedUser);
  };

  const addNewTest = (newTest) => {
    const testWithAuthor = { ...newTest, authorEmail: user.email };
    const updatedTests = [testWithAuthor, ...tests];
    setTests(updatedTests);
    localStorage.setItem('siteTests', JSON.stringify(updatedTests));
  };

  return (
    <AuthContext.Provider value={{ user, tests, login, register, logout, saveTestResult, addNewTest, updateProfile, updateSecurity }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);