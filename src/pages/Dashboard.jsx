import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="user-info">
        <h2>Привет, {user.username}!</h2>
        <p>Email: {user.email}</p>
      </div>

      <div className="history-block">
        <h3>История прохождений</h3>
        {user.results && user.results.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Тест</th>
                <th>Результат</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {user.results.map((res, idx) => (
                <tr key={idx}>
                  <td>{res.title}</td>
                  <td>{res.score} / {res.total}</td>
                  <td>{res.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Вы пока не прошли ни одного теста.</p>
        )}
      </div>
    </div>
  );
};