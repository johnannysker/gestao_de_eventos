import { useState } from 'react';
import AuthForm from '../components/AuthForm.jsx';
import { register, login } from '../api.jsx';

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (data) => {
    try {
      const response = isLogin ? await login(data) : await register(data);
      if (isLogin) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setMessage('Login bem-sucedido!');
      } else {
        setMessage('Registrado com sucesso! Faça login.');
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao processar');
    }
  };

  return (
    <div className="container">
      <h1>Gestão de Eventos</h1>
      <AuthForm isLogin={isLogin} onSubmit={handleSubmit} />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Ir para Registro' : 'Ir para Login'}
      </button>
      <p className={message.includes('Erro') ? 'error' : 'success'}>{message}</p>
    </div>
  );
}

export default Auth;