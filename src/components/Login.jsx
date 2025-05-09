import {  useState } from 'react';
import { useNavigate } from 'react-router';

function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'super' && pass === '12345678') {
      onLogin();
      navigate('/tasks')
    } else {
      setError('Credenciais inválidas');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h4 className="text-center mb-3">Login</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <input type="text" className="form-control mb-3" placeholder="Usuário - super"
            value={user} onChange={(e) => setUser(e.target.value)} required />
          <input type="password" className="form-control mb-3" placeholder="Senha - 12345678"
            value={pass} onChange={(e) => setPass(e.target.value)} required />
          <button className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
