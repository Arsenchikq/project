import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { TestsList } from './pages/TestsList';
import { TestRoom } from './pages/TestRoom';
import { CreateTest } from './pages/CreateTest';
import { Profile } from './pages/Profile';
import { Security } from './pages/Security';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="security" element={<PrivateRoute><Security /></PrivateRoute>} />
          <Route path="tests" element={<PrivateRoute><TestsList /></PrivateRoute>} />
          <Route path="create" element={<PrivateRoute><CreateTest /></PrivateRoute>} />
          <Route path="room/:id" element={<PrivateRoute><TestRoom /></PrivateRoute>} />
          
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;