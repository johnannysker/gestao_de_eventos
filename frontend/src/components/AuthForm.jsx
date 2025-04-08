import { useState } from 'react';

function AuthForm({ isLogin, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = isLogin ? { email, password } : { name, email, password };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {!isLogin && <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
      <button type="submit">{isLogin ? 'Login' : 'Registrar'}</button>
    </form>
  );
}

export default AuthForm;