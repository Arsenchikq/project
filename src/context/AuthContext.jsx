import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const userExists = users.find(u => u.email === userData.email);
    if (userExists) {
      throw new Error("Пользователь с таким email уже существует");
    }

    const newUser = { ...userData, results: [] };
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
      return true;
    } else {
      throw new Error("Неверный email или пароль");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const saveTestResult = (testTitle, score, total) => {
    const newResult = {
      date: new Date().toLocaleDateString(),
      title: testTitle,
      score: score,
      total: total
    };
    
    const updatedUser = { ...user, results: [...(user.results || []), newResult] };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, saveTestResult }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);